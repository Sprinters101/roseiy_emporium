import React, { useState } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import Container from "@/components/common/Container";
import { toast } from "@/components/ui/sonner";
import { TrackOrderForm, type TrackOrderFormValues } from "./TrackOrderForm";
import { DeliveryProgress } from "./DeliveryProgress";

export const TrackOrder: React.FC = () => {
    const [trackedOrder, setTrackedOrder] = useState<{
        orderId: string;
        emailAddress: string;
        placedDate: string;
        stepIndex: number;
    }>({
        orderId: "RE-2026-7890",
        emailAddress: "customer@example.com",
        placedDate: "January 15 2026",
        stepIndex: 1, // Order Confirmed
    });

    const handleTrackOrder = (values: TrackOrderFormValues) => {
        setTrackedOrder({
            orderId: values.orderId.toUpperCase().startsWith("RE-")
                ? values.orderId.toUpperCase()
                : `RE-${values.orderId.toUpperCase()}`,
            emailAddress: values.emailAddress,
            placedDate: "January 15 2026",
            stepIndex: 1,
        });
        toast.success(`Tracking order status for ${values.orderId}`);
    };

    return (
        <div className="w-full bg-black-900  text-white pt-28 md:pt-36 pb-24">
            <Container>
                {/* Header & Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase font-hanken mb-1">
                    <Link to="/" className="hover:text-white transition-colors">
                        HOME
                    </Link>
                    <ChevronRight className="size-3.5" />
                    <span className="text-gold-500 font-medium">
                        TRACK ORDER
                    </span>
                </div>

                {/* Page Title */}
                <h1 className="text-3xl md:text-hg-b2 font-playfair font-bold text-white tracking-tight uppercase mb-1">
                    TRACK ORDER
                </h1>

                {/* Description Subtitle */}
                <p className="text-sm md:text-base text-white font-hanken mb-8">
                    Enter your Email Address and Order ID to track your order
                </p>

                {/* Form Card Component */}
                <TrackOrderForm
                    initialValues={{
                        emailAddress: trackedOrder.emailAddress,
                        orderId: trackedOrder.orderId,
                    }}
                    onTrack={handleTrackOrder}
                />

                {/* Delivery Progress Stepper Card Component */}
                <DeliveryProgress
                    orderId={trackedOrder.orderId}
                    placedDate={trackedOrder.placedDate}
                    currentStepIndex={trackedOrder.stepIndex}
                />
            </Container>
        </div>
    );
};

export default TrackOrder;
