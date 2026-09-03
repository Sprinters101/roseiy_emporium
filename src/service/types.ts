export interface AuthApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponseData {
    email: string;
}

export interface VerifyEmailPayload {
    email: string;
    otp: string;
}

export interface VerifyEmailResponseData {
    email: string;
}

export interface ResendOtpPayload {
    email: string;
}

export interface ResendOtpResponseData {
    email: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface CustomerUser {
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role?: string;
}

export interface LoginResponseData {
    customer: CustomerUser;
    token: string;
}

export interface ApiErrorResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
}
