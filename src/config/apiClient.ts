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

/* Request Interceptor: Auto-inject access token or guest cart token into headers */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token =
            Cookies.get("accessToken") || localStorage.getItem("accessToken");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        } else if (config.headers) {
            const guestCartToken =
                Cookies.get("roseiy_cart_token") ||
                localStorage.getItem("roseiy_cart_token") ||
                Cookies.get("guestCartToken") ||
                localStorage.getItem("guestCartToken");
            if (guestCartToken) {
                config.headers["x-cart-token"] = guestCartToken;
            }
        }
        return config;
    },
    (error) => Promise.reject(error),
);

/* Response Interceptor: Seamless 401 interception, guest token capture & request retry */
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Automatically capture and store guest cart token from responses in Cookies (30 days) & localStorage
        const guestToken =
            response.data?.data?.cart?.guestToken ||
            response.data?.data?.guestToken;
        if (guestToken) {
            Cookies.set("roseiy_cart_token", guestToken, {
                expires: 30,
                path: "/",
            });
            Cookies.set("guestCartToken", guestToken, {
                expires: 30,
                path: "/",
            });
            localStorage.setItem("roseiy_cart_token", guestToken);
            localStorage.setItem("guestCartToken", guestToken);
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Skip refresh / logout redirect for authentication endpoints
        const requestUrl = originalRequest?.url || "";
        const isAuthEndpoint =
            requestUrl.includes("/auth/login") ||
            requestUrl.includes("/auth/register") ||
            requestUrl.includes("/auth/verify-email") ||
            requestUrl.includes("/auth/resend-otp") ||
            requestUrl.includes("/auth/forgot-password") ||
            requestUrl.includes("/auth/reset-password") ||
            requestUrl.includes("/auth/refresh");

        // Handle 401 Unauthorized for non-auth endpoints
        if (error.response?.status === 401 && !isAuthEndpoint) {
            const refreshToken = localStorage.getItem("refreshToken");

            // Attempt silent token refresh if refreshToken is available and haven't retried yet
            if (refreshToken && !originalRequest._retry) {
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
                    const response = await axios.post(
                        `${apiClient.defaults.baseURL}/auth/refresh`,
                        { refreshToken },
                    );

                    const newAccessToken =
                        response.data?.data?.accessToken ||
                        response.data?.accessToken;
                    const newRefreshToken =
                        response.data?.data?.refreshToken ||
                        response.data?.refreshToken;

                    if (newAccessToken) {
                        localStorage.setItem("accessToken", newAccessToken);
                        Cookies.set("accessToken", newAccessToken, {
                            expires: 7,
                            path: "/",
                        });
                        if (newRefreshToken) {
                            localStorage.setItem(
                                "refreshToken",
                                newRefreshToken,
                            );
                        }

                        processQueue(null, newAccessToken);
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return apiClient(originalRequest);
                    }
                } catch (refreshError) {
                    processQueue(refreshError, null);
                } finally {
                    isRefreshing = false;
                }
            }

            // If refresh fails, or no refreshToken exists: Log user out completely & redirect to login
            Cookies.remove("accessToken", { path: "/" });
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userData");

            // Dispatch global event for AuthContext & state sync
            window.dispatchEvent(new Event("auth:logout"));

            const currentPath = window.location.pathname;
            const isAuthPage =
                currentPath === "/login" ||
                currentPath === "/register" ||
                currentPath === "/signup" ||
                currentPath === "/verify-otp" ||
                currentPath === "/forgot-password" ||
                currentPath === "/reset-password";

            if (!isAuthPage) {
                const currentSearch = window.location.search;
                const fullRedirect = encodeURIComponent(
                    currentPath + currentSearch,
                );
                window.location.href = `/login?redirect=${fullRedirect}`;
            }

            return Promise.reject(error);
        }

        return Promise.reject(error);
    },
);
