import { apiClient } from "@/config/apiClient";
import type {
    AuthApiResponse,
    RegisterPayload,
    RegisterResponseData,
    VerifyEmailPayload,
    VerifyEmailResponseData,
    ResendOtpPayload,
    ResendOtpResponseData,
    LoginPayload,
    LoginResponseData,
    CustomerUser,
} from "./types";

/**
 * 1. Register Customer
 * POST /auth/register
 */
export const registerCustomerFunc = async (
    payload: RegisterPayload,
): Promise<AuthApiResponse<RegisterResponseData>> => {
    const response = await apiClient.post<AuthApiResponse<RegisterResponseData>>(
        "/auth/register",
        payload,
    );
    return response.data;
};

/**
 * 2. Verify Email
 * POST /auth/verify-email
 */
export const verifyEmailFunc = async (
    payload: VerifyEmailPayload,
): Promise<AuthApiResponse<VerifyEmailResponseData>> => {
    const response = await apiClient.post<AuthApiResponse<VerifyEmailResponseData>>(
        "/auth/verify-email",
        payload,
    );
    return response.data;
};

/**
 * 3. Resend Verification OTP
 * POST /auth/resend-otp
 */
export const resendOtpFunc = async (
    payload: ResendOtpPayload,
): Promise<AuthApiResponse<ResendOtpResponseData>> => {
    const response = await apiClient.post<AuthApiResponse<ResendOtpResponseData>>(
        "/auth/resend-otp",
        payload,
    );
    return response.data;
};

/**
 * 4. Customer Login
 * POST /auth/login
 */
export const loginFunc = async (
    payload: LoginPayload,
): Promise<AuthApiResponse<LoginResponseData>> => {
    const response = await apiClient.post<AuthApiResponse<LoginResponseData>>(
        "/auth/login",
        payload,
    );
    return response.data;
};

/**
 * 5. Get User / Customer Profile
 * GET /customer/profile
 */
export const userProfileFunc = async (): Promise<
    AuthApiResponse<CustomerUser>
> => {
    const response = await apiClient.get<AuthApiResponse<CustomerUser>>(
        "/customer/profile",
    );
    return response.data;
};

// Backward-compatibility alias
export const getCustomerProfileFunc = userProfileFunc;
