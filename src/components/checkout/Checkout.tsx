import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronRight, Info } from "lucide-react";
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
import {
    INITIAL_ADDRESSES,
    type AddressItem,
    type AddressFormData,
} from "@/components/dashboard/addresses/types";

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

// Default sample items matching design if cart is empty
const SAMPLE_CHECKOUT_ITEMS: CartItem[] = [
    {
        id: "sample-glenfiddich-1",
        name: "Glenfiddich Single Scotch",
        price: 210000,
        category: "CHAMPAGNE",
        volume: "75cl",
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784400550/glenfiddich_18_mzkc2u.png",
        quantity: 1,
        casesQty: 1,
        piecesQty: 2,
    },
    {
        id: "sample-glenfiddich-2",
        name: "Glenfiddich Single Scotch",
        price: 210000,
        category: "CHAMPAGNE",
        volume: "75cl",
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784400550/glenfiddich_18_mzkc2u.png",
        quantity: 1,
        casesQty: 1,
        piecesQty: 2,
    },
    {
        id: "sample-glenfiddich-3",
        name: "Glenfiddich Single Scotch",
        price: 210000,
        category: "CHAMPAGNE",
        volume: "75cl",
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784400550/glenfiddich_18_mzkc2u.png",
        quantity: 1,
        casesQty: 1,
        piecesQty: 2,
    },
];

export const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { cartItems, removeFromCart, clearCart } = useCart();

    const [overrideItems, setOverrideItems] = useState<CartItem[] | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    // Logged-in Personal Information State (derived from user with custom edit override)
    const [customPersonalInfo, setCustomPersonalInfo] =
        useState<PersonalInfoData | null>(null);

    const personalInfo: PersonalInfoData = useMemo(() => {
        if (customPersonalInfo) return customPersonalInfo;
        return {
            firstName: user?.firstName || "Bola",
            lastName: user?.lastName || "Roseiy",
            phoneNumber: "090 123 456 7890",
            emailAddress: user?.email || "Rosebola@gmail.com",
        };
    }, [user, customPersonalInfo]);

    // Saved Addresses State
    const [addresses, setAddresses] = useState<AddressItem[]>(() => {
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

    const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
        const defaultAddr = addresses.find((a) => a.isDefault);
        return defaultAddr ? defaultAddr.id : addresses[0]?.id || "addr-1";
    });

    // Persist addresses updates
    useEffect(() => {
        localStorage.setItem(
            "roseiy_user_addresses",
            JSON.stringify(addresses),
        );
    }, [addresses]);

    // Use cart items from context if available, otherwise fallback to sample items
    const displayItems = useMemo(() => {
        if (overrideItems !== null) return overrideItems;
        return cartItems.length > 0 ? cartItems : SAMPLE_CHECKOUT_ITEMS;
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
        setAddresses((prev) =>
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

    const handleAddNewAddress = (formData: AddressFormData) => {
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

        setAddresses((prev) => [...prev, newAddress]);
        setSelectedAddressId(newAddress.id);
        toast.success("New address added and selected!");
    };

    const handleEditAddress = (formData: AddressFormData, editId?: string) => {
        if (!editId) return;
        setAddresses((prev) =>
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
        toast.success("Address updated successfully!");
    };

    // Logged-in direct payment handler
    const handlePayOrder = async () => {
        if (displayItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        setIsProcessing(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            toast.success("Payment successful! Your order has been placed.");
            clearCart();
            setShowSuccessModal(true);
        } catch {
            toast.error("Failed to process payment. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    // Guest checkout submission handler
    const handleSubmitGuestOrder = async () => {
        if (displayItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            toast.success(
                "Order placed successfully! Thank you for your purchase.",
            );
            clearCart();
            setShowSuccessModal(true);
        } catch {
            toast.error("Failed to process payment. Please try again.");
        }
    };

    return (
        <div className="w-full bg-black-900 min-h-screen text-white pt-28 md:pt-36 pb-24">
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
                                onSave={setCustomPersonalInfo}
                            />

                            {/* Shipping Information Card */}
                            <LoggedInShippingInfo
                                addresses={addresses}
                                selectedAddressId={selectedAddressId}
                                onSelectAddress={handleSelectAddress}
                                onAddNewAddress={handleAddNewAddress}
                                onEditAddress={handleEditAddress}
                            />

                            {/* Bottom Full-Width Pay Button */}
                            <button
                                type="button"
                                onClick={handlePayOrder}
                                disabled={
                                    isProcessing || displayItems.length === 0
                                }
                                className="w-full mt-2 bg-gold-gradient text-black-900 font-bold font-hanken text-sm sm:text-base py-3.5 sm:py-4 px-6 rounded-sm sm:rounded-md shadow-xl hover:opacity-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-center"
                            >
                                {isProcessing
                                    ? "Processing Payment..."
                                    : `Pay ₦${total.toLocaleString()}`}
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
                            />
                        </div>
                    </div>
                ) : (
                    /* 2. Guest User Checkout Flow */
                    <div className="w-full">
                        {/* Guest Checkout Banner */}
                        <div className="flex items-center gap-2.5 text-gold-400 text-sm font-medium mb-8">
                            <Info className="size-4 shrink-0" />
                            <span className="text-neutral-300">
                                You are currently checking out as a guest
                            </span>
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
                                                isSubmitting={isSubmitting}
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
                    onTrackOrder={() => {
                        setShowSuccessModal(false);
                        navigate("/track-order");
                    }}
                />
            </Container>
        </div>
    );
};

export default Checkout;
