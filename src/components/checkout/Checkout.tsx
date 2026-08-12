import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ChevronRight, Info } from "lucide-react";
import Container from "@/components/common/Container";
import { useCart, type CartItem } from "@/context/CartContext";
import { toast } from "@/components/ui/sonner";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { ShippingInfoSection } from "./ShippingInfoSection";
import { OrderSummarySection } from "./OrderSummarySection";
import { OrderSuccessModal } from "./OrderSuccessModal";

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

// Default sample items matching design if cart is currently empty
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
    const { cartItems, removeFromCart, clearCart } = useCart();
    const [overrideItems, setOverrideItems] = useState<CartItem[] | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

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

    const handleSubmitOrder = async (
        _values: {
            fullName: string;
            phoneNumber: string;
            emailAddress: string;
            country: string;
            state: string;
            city: string;
            address: string;
        },
        { resetForm: _resetForm }: { resetForm: () => void },
    ) => {
        try {
            // Simulate payment processing delay
            await new Promise((resolve) => setTimeout(resolve, 800));
            toast.success(
                "Order placed successfully! Thank you for your purchase.",
            );
            clearCart();
            // resetForm();
            setShowSuccessModal(true);
        } catch {
            toast.error("Failed to process payment. Please try again.");
        }
    };

    return (
        <div className="w-full bg-black-900 min-h-screen text-white pt-28 md:pt-36 pb-24 ">
            <Container className="">
                {/* Header & Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase  font-hanken mb-2">
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
                    <span className="text-gold-500 font-medium">CHECKOUT</span>
                </div>

                {/* Page Title */}
                <h1 className="text-3xl md:text-hg-b2 font-playfair font-bold text-white tracking-tight uppercase mb-3">
                    CHECKOUT
                </h1>

                {/* Guest Checkout Banner */}
                <div className="flex items-center gap-2.5 text-gold-500 text-sm font-medium mb-8 sm:mb-10">
                    <Info className="size-4 shrink-0" />
                    <span className="text-neutral-300">
                        You are currently checking out as a guest
                    </span>
                </div>

                {/* Formik Form Container */}
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
                    onSubmit={handleSubmitOrder}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                {/* Left Column: Personal Info & Shipping Info Sections */}
                                <div className="lg:col-span-7 flex flex-col gap-8">
                                    <PersonalInfoSection />
                                    <ShippingInfoSection
                                        totalAmount={total}
                                        isSubmitting={isSubmitting}
                                    />
                                </div>

                                {/* Right Column: Order Summary Sidebar Section */}
                                <div className="lg:col-span-5">
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
