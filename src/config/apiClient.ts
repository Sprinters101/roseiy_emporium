import axios, {
    type InternalAxiosRequestConfig,
    type AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

// Create custom axios instance
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});

// Flag to track token generation lifecycle
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

// Drain the queue when refresh succeeds or fails
const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

/* Request Interceptor: Auto-inject access token into headers */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token =
            Cookies.get("accessToken") || localStorage.getItem("accessToken");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

/* Response Interceptor: Seamless 401 interception & request retry */
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        // Guard: Trigger refresh only on 401 errors and ensure we don't loop infinitely
        if (error.response?.status === 401 && !originalRequest._retry) {
            // If a refresh is already in progress, queue this request until it's done
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                // Call the silent refresh endpoint (using basic axios to bypass main interceptors)
                const response = await axios.post(
                    `${apiClient.defaults.baseURL}/auth/refresh`,
                    {
                        refreshToken,
                    },
                );

                const {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                } = response.data;

                localStorage.setItem("accessToken", newAccessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                // Clear queue and retry the initial failed request
                processQueue(null, newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh token failed/expired -> Log user out completely
                processQueue(refreshError, null);
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);
