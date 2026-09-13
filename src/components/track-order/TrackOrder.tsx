import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import { ChevronRight } from "lucide-react";
import Container from "@/components/common/Container";
import { toast } from "@/components/ui/sonner";
import { TrackOrderForm, type TrackOrderFormValues } from "./TrackOrderForm";
import { DeliveryProgress } from "./DeliveryProgress";
import { useTrackOrder } from "@/service/mutation";
import { useAuth } from "@/context/AuthContext";

const getStepIndexFromStatus = (status?: string): number => {
    switch (status?.toLowerCase()) {
        case "placed":
        case "pending":
            return 0;
        case "processing":
        case "confirmed":
            return 1;
        case "shipped":
        case "in_transit":
        case "in transit":
            return 2;
        case "delivered":
        case "completed":
            return 3;
        default:
            return 1;
    }
};

export const TrackOrder: React.FC = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { user } = useAuth();
    const trackOrderMutation = useTrackOrder();

    const paramOrderId =
        location.state?.orderNumber ||
        location.state?.orderId ||
        searchParams.get("id") ||
        "";
    const paramEmail =
        location.state?.email ||
        searchParams.get("email") ||
        user?.email ||
        "";

    const [formValues, setFormValues] = useState<TrackOrderFormValues>({
        orderId: paramOrderId || "RE-2026-7890",
        emailAddress: paramEmail || "customer@roseiyemporium.com",
    });

    const [trackedOrder, setTrackedOrder] = useState<{
        orderId: string;
        emailAddress: string;
        placedDate: string;
        stepIndex: number;
    }>({
        orderId: paramOrderId || "RE-2026-7890",
        emailAddress: paramEmail || "customer@roseiyemporium.com",
        placedDate: "January 15 2026",
        stepIndex: 1, // Order Confirmed
    });

    // Auto-track if navigated with real orderNumber & email
    useEffect(() => {
        if (paramOrderId && paramEmail) {
            trackOrderMutation
                .mutateAsync({
                    orderNumber: paramOrderId,
                    email: paramEmail,
                })
                .then((res) => {
                    if (res?.data) {
                        const data = res.data;
                        const dateStr = data.placedAt
                            ? new Date(data.placedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                  },
                              )
                            : "Recent";

                        setTrackedOrder({
                            orderId: data.orderNumber || paramOrderId,
                            emailAddress: paramEmail,
                            placedDate: dateStr,
                            stepIndex: getStepIndexFromStatus(data.status),
                        });
                        setFormValues({
                            orderId: data.orderNumber || paramOrderId,
                            emailAddress: paramEmail,
                        });
                    }
                })
                .catch(() => {
                    // Fallback to local params
                });
        }
    }, [paramOrderId, paramEmail]);

    const handleTrackOrder = async (values: TrackOrderFormValues) => {
        setFormValues(values);
        try {
            const res = await trackOrderMutation.mutateAsync({
                orderNumber: values.orderId.trim(),
                email: values.emailAddress.trim(),
            });

            if (res?.data) {
                const data = res.data;
                const dateStr = data.placedAt
                    ? new Date(data.placedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                      })
                    : "Recent";

                setTrackedOrder({
                    orderId: data.orderNumber || values.orderId,
                    emailAddress: values.emailAddress,
                    placedDate: dateStr,
                    stepIndex: getStepIndexFromStatus(data.status),
                });
                toast.success(`Tracking order status for ${values.orderId}`);
            } else {
                setTrackedOrder({
                    orderId: values.orderId.toUpperCase().startsWith("RE-")
                        ? values.orderId.toUpperCase()
                        : `RE-${values.orderId.toUpperCase()}`,
                    emailAddress: values.emailAddress,
                    placedDate: new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }),
                    stepIndex: 1,
                });
                toast.success(`Tracking order status for ${values.orderId}`);
            }
        } catch {
            // Error toast handled by useTrackOrder mutation hook
        }
    };

    return (
        <div className="w-full bg-black-900 text-white pt-28 md:pt-36 pb-24">
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
                    initialValues={formValues}
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
