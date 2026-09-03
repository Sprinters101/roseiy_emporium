import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/sonner";
import {
    registerCustomerFunc,
    verifyEmailFunc,
    resendOtpFunc,
    loginFunc,
} from "./api";
import type {
    RegisterPayload,
    VerifyEmailPayload,
    ResendOtpPayload,
    LoginPayload,
    ApiErrorResponse,
} from "./types";

/**
 * 1. Register Customer Mutation
 */
export const useRegisterCustomer = () => {
    return useMutation({
        mutationFn: (payload: RegisterPayload) => registerCustomerFunc(payload),
        onSuccess: (data) => {
            toast.success(
                data?.message || "Registration successful. Please verify your email.",
            );
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                err?.response?.data?.message || "Registration failed. Please try again.",
            );
        },
    });
};

/**
 * 2. Verify Email Mutation with OTP
 */
export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: (payload: VerifyEmailPayload) => verifyEmailFunc(payload),
        onSuccess: (data) => {
            toast.success(data?.message || "Email verified successfully!");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                err?.response?.data?.message || "Invalid or expired OTP code.",
            );
        },
    });
};

/**
 * 3. Resend OTP Mutation
 */
export const useResendOtp = () => {
    return useMutation({
        mutationFn: (payload: ResendOtpPayload) => resendOtpFunc(payload),
        onSuccess: (data) => {
            toast.success(
                data?.message || "A new verification OTP has been sent to your email.",
            );
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                err?.response?.data?.message || "Failed to resend verification code.",
            );
        },
    });
};

/**
 * 4. Login Mutation
 */
export const useLogin = () => {
    return useMutation({
        mutationFn: (payload: LoginPayload) => loginFunc(payload),
        onSuccess: (data) => {
            if (data?.data?.token) {
                Cookies.set("accessToken", data.data.token, {
                    expires: 7,
                    path: "/",
                });
                localStorage.setItem("accessToken", data.data.token);
            }
            if (data?.data?.customer) {
                localStorage.setItem(
                    "userData",
                    JSON.stringify(data.data.customer),
                );
            }
            toast.success(data?.message || "Login successful!");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                err?.response?.data?.message || "Invalid email or password.",
            );
        },
    });
};
