import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/sonner";
import {
    registerCustomerFunc,
    verifyEmailFunc,
    resendOtpFunc,
    loginFunc,
    addToCartFunc,
    updateCartItemQuantityFunc,
    removeCartItemFunc,
    clearCartFunc,
    initializeCheckoutFunc,
    updateAccountProfileFunc,
    changePasswordFunc,
    createAddressFunc,
    updateAddressFunc,
    deleteAddressFunc,
    trackOrderFunc,
    reorderFunc,
} from "./api";
import { queryKeys } from "./queries";
import type {
    RegisterPayload,
    VerifyEmailPayload,
    ResendOtpPayload,
    LoginPayload,
    AddToCartPayload,
    UpdateCartItemPayload,
    CheckoutAddressPayload,
    UpdateProfilePayload,
    ChangePasswordPayload,
    CreateAddressPayload,
    UpdateAddressPayload,
    TrackOrderPayload,
    ApiErrorResponse,
} from "./types";

// Helper for extracting API error messages
const getErrorMessage = (
    err: AxiosError<ApiErrorResponse>,
    defaultMsg: string,
): string => {
    return err?.response?.data?.message || err?.message || defaultMsg;
};

// ==========================================
// 1. AUTHENTICATION MUTATIONS
// ==========================================

/**
 * Register Customer Mutation
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
                getErrorMessage(
                    err,
                    "Registration failed. Please check your details.",
                ),
            );
        },
    });
};

/**
 * Verify Email Mutation with OTP
 */
export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: (payload: VerifyEmailPayload) => verifyEmailFunc(payload),
        onSuccess: (data) => {
            toast.success(data?.message || "Email verified successfully!");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(err, "Invalid or expired OTP code."),
            );
        },
    });
};

/**
 * Resend OTP Mutation
 */
export const useResendOtp = () => {
    return useMutation({
        mutationFn: (payload: ResendOtpPayload) => resendOtpFunc(payload),
        onSuccess: (data) => {
            toast.success(
                data?.message ||
                    "A new verification OTP has been sent to your email.",
            );
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(err, "Failed to resend verification code."),
            );
        },
    });
};

/**
 * Customer Login Mutation
 */
export const useLogin = () => {
    const queryClient = useQueryClient();

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
            queryClient.invalidateQueries({
                queryKey: queryKeys.auth.accountProfile,
            });
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
            toast.success(data?.message || "Login successful!");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(err, "Invalid email or password."),
            );
        },
    });
};

// ==========================================
// 2. CART MUTATIONS
// ==========================================

/**
 * Add Item to Cart Mutation (with sellingUnitId)
 */
export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: AddToCartPayload) => addToCartFunc(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
            toast.success(data?.message || "Item added to cart");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(err, "Failed to add item to cart."),
            );
        },
    });
};

/**
 * Update Cart Item Quantity Mutation
 */
export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateCartItemPayload) =>
            updateCartItemQuantityFunc(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
            toast.success(data?.message || "Cart updated");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(err, "Failed to update quantity."),
            );
        },
    });
};

/**
 * Remove Single Item from Cart Mutation
 */
export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartItemId: string) => removeCartItemFunc(cartItemId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
            toast.info(data?.message || "Item removed from cart");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(err, "Failed to remove item from cart."),
            );
        },
    });
};

/**
 * Clear Entire Cart Mutation
 */
export const useClearCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => clearCartFunc(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
            toast.info("Cart cleared");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(getErrorMessage(err, "Failed to clear cart."));
        },
    });
};

// ==========================================
// 3. CHECKOUT MUTATIONS
// ==========================================

/**
 * Initialize Checkout Mutation
 */
export const useInitializeCheckout = () => {
    return useMutation({
        mutationFn: (payload: CheckoutAddressPayload) =>
            initializeCheckoutFunc(payload),
        onSuccess: (data) => {
            toast.success(
                data?.message || "Checkout initialized successfully",
            );
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(
                    err,
                    "Failed to initialize checkout. Please check your information.",
                ),
            );
        },
    });
};

// ==========================================
// 4. CUSTOMER ACCOUNT & ADDRESSES MUTATIONS
// ==========================================

/**
 * Update Customer Profile Mutation
 */
export const useUpdateAccountProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateProfilePayload) =>
            updateAccountProfileFunc(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.auth.accountProfile,
            });
            toast.success(data?.message || "Profile updated successfully!");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(err, "Failed to update profile."),
            );
        },
    });
};

/**
 * Change Customer Password Mutation
 */
export const useChangePassword = () => {
    return useMutation({
        mutationFn: (payload: ChangePasswordPayload) =>
            changePasswordFunc(payload),
        onSuccess: (data) => {
            toast.success(data?.message || "Password changed successfully!");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(
                    err,
                    "Failed to change password. Please check your current password.",
                ),
            );
        },
    });
};

/**
 * Create New Delivery Address Mutation
 */
export const useCreateAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateAddressPayload) =>
            createAddressFunc(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.addresses.all,
            });
            toast.success(data?.message || "New address added successfully!");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(err, "Failed to save new address."),
            );
        },
    });
};

/**
 * Update Saved Delivery Address Mutation
 */
export const useUpdateAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateAddressPayload) =>
            updateAddressFunc(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.addresses.all,
            });
            toast.success(data?.message || "Address updated successfully!");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(err, "Failed to update address."),
            );
        },
    });
};

/**
 * Delete Saved Delivery Address Mutation
 */
export const useDeleteAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (addressId: string) => deleteAddressFunc(addressId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.addresses.all,
            });
            toast.success(data?.message || "Address deleted successfully.");
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(err, "Failed to delete address."),
            );
        },
    });
};

// ==========================================
// 5. ORDERS, TRACKING & REORDER MUTATIONS
// ==========================================

/**
 * Track Order Mutation (by orderNumber + email)
 */
export const useTrackOrder = () => {
    return useMutation({
        mutationFn: (payload: TrackOrderPayload) => trackOrderFunc(payload),
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(
                    err,
                    "Order not found. Please verify your Order ID and Email.",
                ),
            );
        },
    });
};

/**
 * Reorder Previous Order Items Mutation
 */
export const useReorder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (orderNumber: string) => reorderFunc(orderNumber),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
            toast.success(
                data?.message ||
                    "Items from previous order added to your cart!",
            );
        },
        onError: (err: AxiosError<ApiErrorResponse>) => {
            toast.error(
                getErrorMessage(
                    err,
                    "Unable to reorder items. Some products may be out of stock.",
                ),
            );
        },
    });
};
