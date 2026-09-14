import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { ChevronRight, Info, Loader2 } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "@/components/common/Container";
import { useCart, type CartItem } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { ShippingInfoSection } from "./ShippingInfoSection";
import {
    LoggedInPersonalInfo,
    type PersonalInfoData,
} from "./LoggedInPersonalInfo";
import { LoggedInShippingInfo } from "./LoggedInShippingInfo";
import { OrderSummarySection } from "./OrderSummarySection";
import { OrderSuccessModal } from "./OrderSuccessModal";
import { CheckoutSkeleton } from "./CheckoutSkeleton";
import {
    INITIAL_ADDRESSES,
    type AddressItem,
    type AddressFormData,
} from "@/components/dashboard/addresses/types";
import {
    useInitializeCheckout,
    useCreateAddress,
    useUpdateAddress,
    useDeleteAddress,
    useUpdateAccountProfile,
} from "@/service/mutation";
import {
    useVerifyCheckout,
    useGetAddresses,
    useGetAccountProfile,
} from "@/service/queries";
import type {
    CheckoutAddressPayload,
    AddressResponseItem,
} from "@/service/types";

const CheckoutValidationSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, "Full name must be at least 2 characters")
        .required("Full name is required"),
    phoneNumber: Yup.string()
        .min(7, "Please enter a valid phone number")
        .required("Phone number is required"),
    emailAddress: Yup.string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string()
        .min(5, "Address must be at least 5 characters")
        .required("Address is required"),
});

export const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, isAuthenticated } = useAuth();
    const {
        cartItems,
        removeFromCart,
        clearCart,
        isLoading: isCartLoading,
    } = useCart();

    const [overrideItems, setOverrideItems] = useState<CartItem[] | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [verifiedOrderNumber, setVerifiedOrderNumber] = useState<string>("");
    const [verifiedCustomerEmail, setVerifiedCustomerEmail] =
        useState<string>("");
    const [hasProcessedRef, setHasProcessedRef] = useState<boolean>(false);

    // API Mutations & Queries
    const initializeCheckoutMutation = useInitializeCheckout();
    const createAddressMutation = useCreateAddress();
    const updateAddressMutation = useUpdateAddress();
    const deleteAddressMutation = useDeleteAddress();
    const updateProfileMutation = useUpdateAccountProfile();

    const { data: serverAddressesData, isLoading: isAddressesLoading } =
        useGetAddresses();

    const { data: profileData, isLoading: isProfileLoading } =
        useGetAccountProfile();

    // Payment Return Reference Verification
    const reference =
        searchParams.get("reference") || searchParams.get("trxref") || "";

    const {
        data: verifyData,
        isLoading: isVerifying,
        isError: isVerifyError,
    } = useVerifyCheckout(reference, {
        enabled: Boolean(reference && !hasProcessedRef),
    });

    // Handle payment verification result from query
    useEffect(() => {
        if (!reference || hasProcessedRef) return;

        if (isVerifyError) {
            toast.error(
                "Payment verification failed. Please check your bank transaction or contact support.",
            );
            setHasProcessedRef(true);
            navigate("/checkout", { replace: true });
            return;
        }

        if (verifyData) {
            setHasProcessedRef(true);
            if (verifyData.data?.paid || verifyData.success) {
                const orderNum =
                    verifyData.data?.order?.orderNumber ||
                    reference ||
                    `RE-${Date.now().toString().slice(-6)}`;

                setVerifiedOrderNumber(orderNum);
                setVerifiedCustomerEmail(
                    user?.email ||
                        profileData?.data?.email ||
                        verifyData.data?.order?.shippingAddress?.phoneNumber ||
                        "",
                );

                toast.success(
                    "Payment verified successfully! Your order has been placed.",
                );
                clearCart();
                setShowSuccessModal(true);
            } else {
                toast.error(
                    "Payment was not completed or was cancelled. Please try again.",
                );
            }
            navigate("/checkout", { replace: true });
        }
    }, [
        reference,
        verifyData,
        isVerifyError,
        hasProcessedRef,
        clearCart,
        navigate,
        user?.email,
        profileData?.data?.email,
    ]);

    // Logged-in Personal Information State (derived from server profile with custom edit override)
    const [customPersonalInfo, setCustomPersonalInfo] =
        useState<PersonalInfoData | null>(null);

    const personalInfo: PersonalInfoData = useMemo(() => {
        if (customPersonalInfo) return customPersonalInfo;
        const profile = profileData?.data || user;
        return {
            firstName: profile?.firstName || user?.firstName || "Customer",
            lastName: profile?.lastName || user?.lastName || "User",
            phoneNumber:
                profile?.phoneNumber || user?.phoneNumber || "090 123 456 7890",
            emailAddress:
                profile?.email || user?.email || "customer@roseiyemporium.com",
        };
    }, [profileData, user, customPersonalInfo]);

    const handleSavePersonalInfo = async (
        info: PersonalInfoData,
        successCallback?: () => void,
    ) => {
        setCustomPersonalInfo(info);
        if (isAuthenticated) {
            try {
                await updateProfileMutation.mutateAsync({
                    firstName: info.firstName,
                    lastName: info.lastName,
                    phoneNumber: info.phoneNumber,
                });
                successCallback?.();
            } catch {
                // local update preserved
            }
        }
    };

    // Saved Addresses State (server + local fallback)
    const [localAddresses, setLocalAddresses] = useState<AddressItem[]>(() => {
        const saved = localStorage.getItem("roseiy_user_addresses");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return INITIAL_ADDRESSES;
            }
        }
        return INITIAL_ADDRESSES;
    });

    // Combined server and local addresses
    const addresses: AddressItem[] = useMemo(() => {
        let rawList: AddressResponseItem[] = [];
        if (serverAddressesData?.data) {
            if (Array.isArray(serverAddressesData.data)) {
                rawList = serverAddressesData.data;
            } else if (
                Array.isArray(
                    (
                        serverAddressesData.data as {
                            addresses?: AddressResponseItem[];
                        }
                    ).addresses,
                )
            ) {
                rawList = (
                    serverAddressesData.data as {
                        addresses: AddressResponseItem[];
                    }
                ).addresses;
            }
        }

        if (isAuthenticated && rawList.length > 0) {
            return rawList.map((addr) => {
                const fullStreet = [addr.addressLine1, addr.addressLine2]
                    .filter(Boolean)
                    .join(", ");
                return {
                    id: addr.addressId,
                    title: addr.label || `${addr.city} Address`,
                    country: addr.country || "Nigeria",
                    state: addr.state || "Lagos",
                    city: addr.city || "Lagos",
                    address: fullStreet || addr.addressLine1 || "",
                    phone: addr.phoneNumber || personalInfo.phoneNumber,
                    isDefault: Boolean(addr.isDefault),
                };
            });
        }
        return localAddresses;
    }, [
        isAuthenticated,
        serverAddressesData,
        localAddresses,
        personalInfo.phoneNumber,
    ]);

    const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
        const defaultAddr = addresses.find((a) => a.isDefault);
        return defaultAddr ? defaultAddr.id : addresses[0]?.id || "addr-1";
    });

    // Keep selected address valid if addresses change
    useEffect(() => {
        if (
            addresses.length > 0 &&
            !addresses.some((a) => a.id === selectedAddressId)
        ) {
            const defaultAddr = addresses.find((a) => a.isDefault);
            setSelectedAddressId(
                defaultAddr ? defaultAddr.id : addresses[0].id,
            );
        }
    }, [addresses, selectedAddressId]);

    // Persist local addresses updates
    useEffect(() => {
        localStorage.setItem(
            "roseiy_user_addresses",
            JSON.stringify(localAddresses),
        );
    }, [localAddresses]);

    // Use cart items strictly from context
    const displayItems = useMemo(() => {
        if (overrideItems !== null) return overrideItems;
        return cartItems;
    }, [cartItems, overrideItems]);

    const handleRemoveItem = (id: string) => {
        if (cartItems.some((i) => i.id === id)) {
            removeFromCart(id);
        } else {
            setOverrideItems((prev) =>
                (prev || displayItems).filter((i) => i.id !== id),
            );
        }
    };

    // Calculate subtotal, delivery fee, and total
    const subtotal = useMemo(() => {
        return displayItems.reduce(
            (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
            0,
        );
    }, [displayItems]);

    const deliveryFee = useMemo(() => {
        if (subtotal === 0) return 0;
        return subtotal >= 1000000 ? 0 : 4000;
    }, [subtotal]);

    const total = subtotal + deliveryFee;

    const handleSelectAddress = (id: string) => {
        setSelectedAddressId(id);
        setLocalAddresses((prev) =>
            prev.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
            })),
        );
        const selected = addresses.find((a) => a.id === id);
        if (selected) {
            toast.success(`Shipping address set to ${selected.title}`);
        }
    };

    const handleAddNewAddress = async (
        formData: AddressFormData,
        successCallback?: () => void,
    ) => {
        const newIndex = addresses.length + 1;
        const newAddress: AddressItem = {
            id: `addr-${Date.now()}`,
            title: formData.title || `Shipping Address ${newIndex}`,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            address: formData.address,
            phone:
                formData.phone ||
                personalInfo.phoneNumber ||
                "+234 812 345 6789",
            isDefault: addresses.length === 0,
        };

        if (isAuthenticated) {
            try {
                const res = await createAddressMutation.mutateAsync({
                    label: newAddress.title,
                    firstName: personalInfo.firstName || "Customer",
                    lastName: personalInfo.lastName || "User",
                    phoneNumber: newAddress.phone,
                    addressLine1: newAddress.address,
                    city: newAddress.city,
                    state: newAddress.state,
                    country: newAddress.country,
                    isDefault: newAddress.isDefault,
                });
                if (res?.data?.addressId) {
                    setSelectedAddressId(res.data.addressId);
                } else {
                    setSelectedAddressId(newAddress.id);
                }
                successCallback?.();
            } catch {
                // local fallback preserved
                setLocalAddresses((prev) => [...prev, newAddress]);
                setSelectedAddressId(newAddress.id);
                successCallback?.();
            }
        } else {
            setLocalAddresses((prev) => [...prev, newAddress]);
            setSelectedAddressId(newAddress.id);
            toast.success("New address added and selected!");
            successCallback?.();
        }
    };

    const handleEditAddress = async (
        formData: AddressFormData,
        editId?: string,
        successCallback?: () => void,
    ) => {
        if (!editId) return;
        setLocalAddresses((prev) =>
            prev.map((addr) => {
                if (addr.id === editId) {
                    return {
                        ...addr,
                        country: formData.country,
                        state: formData.state,
                        city: formData.city,
                        address: formData.address,
                        phone: formData.phone || addr.phone,
                    };
                }
                return addr;
            }),
        );

        if (isAuthenticated) {
            if (!editId.startsWith("addr-")) {
                try {
                    await updateAddressMutation.mutateAsync({
                        addressId: editId,
                        data: {
                            label: formData.title,
                            phoneNumber: formData.phone,
                            addressLine1: formData.address,
                            city: formData.city,
                            state: formData.state,
                            country: formData.country,
                        },
                    });
                    successCallback?.();
                } catch {
                    // local fallback applied
                }
            } else {
                try {
                    const res = await createAddressMutation.mutateAsync({
                        label: formData.title || "Shipping Address",
                        firstName: personalInfo.firstName || "Customer",
                        lastName: personalInfo.lastName || "User",
                        phoneNumber: formData.phone || personalInfo.phoneNumber,
                        addressLine1: formData.address,
                        city: formData.city,
                        state: formData.state,
                        country: formData.country,
                    });
                    if (res?.data?.addressId) {
                        setSelectedAddressId(res.data.addressId);
                    }
                    successCallback?.();
                } catch {
                    // local fallback applied
                }
            }
        } else {
            toast.success("Address updated successfully!");
            successCallback?.();
        }
    };

    const handleDeleteAddress = async (
        id: string,
        successCallback?: () => void,
    ) => {
        if (isAuthenticated && !id.startsWith("addr-")) {
            try {
                await deleteAddressMutation.mutateAsync(id);
                if (selectedAddressId === id) {
                    const remaining = addresses.filter((a) => a.id !== id);
                    if (remaining.length > 0) {
                        setSelectedAddressId(remaining[0].id);
                    }
                }
                successCallback?.();
            } catch {
                // Handled by mutation onError toast
            }
        } else {
            setLocalAddresses((prev) => prev.filter((a) => a.id !== id));
            toast.success("Address deleted.");
            if (selectedAddressId === id) {
                const remaining = addresses.filter((a) => a.id !== id);
                if (remaining.length > 0) {
                    setSelectedAddressId(remaining[0].id);
                }
            }
            successCallback?.();
        }
    };

    // Logged-in direct payment handler
    const handlePayOrder = async () => {
        if (displayItems.length === 0) {
            toast.error(
                "Your cart is empty. Please add items before checking out.",
            );
            return;
        }

        const selectedAddr =
            addresses.find((a) => a.id === selectedAddressId) || addresses[0];

        const payload: CheckoutAddressPayload = {
            firstName: personalInfo.firstName || user?.firstName || "",
            lastName: personalInfo.lastName || user?.lastName || "",
            email: personalInfo.emailAddress || user?.email || "",
            phoneNumber:
                personalInfo.phoneNumber ||
                selectedAddr?.phone ||
                user?.phoneNumber ||
                "",
            addressLine1: selectedAddr?.address || "",
            addressLine2: null,
            city: selectedAddr?.city || "",
            state: selectedAddr?.state || "",
            country: selectedAddr?.country || "",
        };

        setIsProcessing(true);
        try {
            const res = await initializeCheckoutMutation.mutateAsync(payload);
            const authorizationUrl = res?.data?.checkout?.authorizationUrl;

            if (authorizationUrl) {
                toast.info("Redirecting to secure payment portal...");
                window.location.href = authorizationUrl;
            } else {
                toast.error(
                    "Unable to retrieve payment URL. Please try again.",
                );
            }
        } catch {
            // Handled by onError toast in mutation hook
        } finally {
            setIsProcessing(false);
        }
    };

    // Guest checkout submission handler
    const handleSubmitGuestOrder = async (values: {
        fullName: string;
        phoneNumber: string;
        emailAddress: string;
        country: string;
        state: string;
        city: string;
        address: string;
    }) => {
        if (displayItems.length === 0) {
            toast.error(
                "Your cart is empty. Please add items before checking out.",
            );
            return;
        }

        const nameParts = values.fullName.trim().split(" ");
        const firstName = nameParts[0] || "Guest";
        const lastName = nameParts.slice(1).join(" ") || "Customer";

        const payload: CheckoutAddressPayload = {
            firstName,
            lastName,
            email: values.emailAddress.trim(),
            phoneNumber: values.phoneNumber.trim(),
            addressLine1: values.address.trim(),
            addressLine2: null,
            city: values.city.trim(),
            state: values.state.trim(),
            country: values.country.trim() || "Nigeria",
        };

        setIsProcessing(true);
        try {
            const res = await initializeCheckoutMutation.mutateAsync(payload);
            const authorizationUrl = res?.data?.checkout?.authorizationUrl;

            if (authorizationUrl) {
                toast.info("Redirecting to secure payment portal...");
                window.location.href = authorizationUrl;
            } else {
                toast.error(
                    "Unable to retrieve payment URL. Please try again.",
                );
            }
        } catch {
            // Handled by onError toast in mutation hook
        } finally {
            setIsProcessing(false);
        }
    };

    // Show initial page skeleton if cart is loading and we have no items
    if (isCartLoading && displayItems.length === 0 && !reference) {
        return <CheckoutSkeleton />;
    }

    return (
        <div className="w-full bg-black-900 min-h-screen text-white pt-28 md:pt-36 pb-24 relative">
            {/* Payment Verification Spinner Overlay */}
            {isVerifying && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center px-4">
                    <Loader2 className="size-12 text-gold-400 animate-spin" />
                    <h3 className="font-playfair font-bold text-2xl md:text-3xl text-white">
                        Verifying Payment...
                    </h3>
                    <p className="text-neutral-400 text-sm max-w-sm font-hanken">
                        Please wait while we confirm your payment transaction
                        with the payment provider.
                    </p>
                </div>
            )}

            <Container>
                {/* Header & Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase font-hanken mb-3">
                    <Link to="/" className="hover:text-white transition-colors">
                        HOME
                    </Link>
                    <ChevronRight className="size-3.5" />
                    <Link
                        to="/shop"
                        className="hover:text-white transition-colors"
                    >
                        CART
                    </Link>
                    <ChevronRight className="size-3.5" />
                    <span className="text-gold-400 font-semibold">
                        CHECKOUT
                    </span>
                </div>

                {/* Page Title */}
                <h1 className="text-3xl md:text-hg-b2 font-playfair font-bold text-white tracking-tight uppercase mb-6 sm:mb-8">
                    CHECKOUT
                </h1>

                {/* 1. Logged-in User Checkout Flow */}
                {isAuthenticated ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                        {/* Left Column: Personal Info & Shipping Address Selection */}
                        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                            {/* Personal Information Card */}
                            <LoggedInPersonalInfo
                                personalInfo={personalInfo}
                                onSave={handleSavePersonalInfo}
                                isLoading={
                                    isProfileLoading && !customPersonalInfo
                                }
                            />

                            {/* Shipping Information Card */}
                            <LoggedInShippingInfo
                                addresses={addresses}
                                selectedAddressId={selectedAddressId}
                                onSelectAddress={handleSelectAddress}
                                onAddNewAddress={handleAddNewAddress}
                                onEditAddress={handleEditAddress}
                                onDeleteAddress={handleDeleteAddress}
                                isLoading={isAddressesLoading}
                            />

                            {/* Bottom Full-Width Pay Button */}
                            <button
                                type="button"
                                onClick={handlePayOrder}
                                disabled={
                                    isProcessing || displayItems.length === 0
                                }
                                className="w-full mt-2 bg-gold-gradient text-black-900 font-bold font-hanken text-sm sm:text-base py-3.5 sm:py-4 px-6 rounded-sm sm:rounded-md shadow-xl hover:opacity-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-center gap-2"
                            >
                                {isProcessing && (
                                    <Loader2 className="size-4 animate-spin" />
                                )}
                                <span>
                                    {isProcessing
                                        ? "Initializing Payment..."
                                        : `Pay ₦${total.toLocaleString()}`}
                                </span>
                            </button>
                        </div>

                        {/* Right Column: Sticky Order Summary Section */}
                        <div className="lg:col-span-5 w-full sticky top-28">
                            <OrderSummarySection
                                items={displayItems}
                                onRemoveItem={handleRemoveItem}
                                subtotal={subtotal}
                                deliveryFee={deliveryFee}
                                total={total}
                                isLoading={isCartLoading}
                            />
                        </div>
                    </div>
                ) : (
                    /* 2. Guest User Checkout Flow */
                    <div className="w-full">
                        {/* Guest Checkout Banner */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-900/70 border border-neutral-800 rounded-lg p-4 mb-8">
                            <div className="flex items-center gap-2.5 text-gold-400 text-sm font-medium">
                                <Info className="size-4 shrink-0" />
                                <span className="text-neutral-300">
                                    You are currently checking out as a guest
                                </span>
                            </div>
                            <Link
                                to="/login"
                                state={{ from: "/checkout" }}
                                className="text-xs sm:text-sm font-semibold text-gold-500 hover:text-gold-400 hover:underline shrink-0 font-hanken"
                            >
                                Already have an account? Log In &rarr;
                            </Link>
                        </div>

                        <Formik
                            initialValues={{
                                fullName: "",
                                phoneNumber: "",
                                emailAddress: "",
                                country: "Nigeria",
                                state: "",
                                city: "",
                                address: "",
                            }}
                            validationSchema={CheckoutValidationSchema}
                            onSubmit={handleSubmitGuestOrder}
                        >
                            {({ isSubmitting }) => (
                                <Form className="w-full">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                                        {/* Left Column: Guest Inputs */}
                                        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                                            <PersonalInfoSection />
                                            <ShippingInfoSection
                                                totalAmount={total}
                                                isSubmitting={
                                                    isSubmitting || isProcessing
                                                }
                                            />
                                        </div>

                                        {/* Right Column: Order Summary */}
                                        <div className="lg:col-span-5 w-full sticky top-28">
                                            <OrderSummarySection
                                                items={displayItems}
                                                onRemoveItem={handleRemoveItem}
                                                subtotal={subtotal}
                                                deliveryFee={deliveryFee}
                                                total={total}
                                                isLoading={isCartLoading}
                                            />
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}

                {/* Order Success & Rating Modal */}
                <OrderSuccessModal
                    open={showSuccessModal}
                    onOpenChange={setShowSuccessModal}
                    orderNumber={verifiedOrderNumber}
                    onTrackOrder={() => {
                        setShowSuccessModal(false);
                        navigate("/track-order", {
                            state: {
                                orderNumber: verifiedOrderNumber,
                                email: verifiedCustomerEmail,
                            },
                        });
                    }}
                />
            </Container>
        </div>
    );
};

export default Checkout;
