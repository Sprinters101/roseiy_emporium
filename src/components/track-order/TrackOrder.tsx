import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import { ChevronRight } from "lucide-react";
import Container from "@/components/common/Container";
import { toast } from "@/components/ui/sonner";
import { TrackOrderForm, type TrackOrderFormValues } from "./TrackOrderForm";
import { DeliveryProgress, DeliveryProgressSkeleton } from "./DeliveryProgress";
import { TrackOrderEmptyState } from "./TrackOrderEmptyState";
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
        location.state?.email || searchParams.get("email") || user?.email || "";

    const [formValues, setFormValues] = useState<TrackOrderFormValues>({
        orderId: paramOrderId || "",
        emailAddress: paramEmail || "",
    });

    const [trackedOrder, setTrackedOrder] = useState<{
        orderId: string;
        emailAddress: string;
        placedDate: string;
        stepIndex: number;
    } | null>(null);

    const [trackingStatus, setTrackingStatus] = useState<
        "idle" | "success" | "error"
    >("idle");
    const [searchedOrderId, setSearchedOrderId] = useState<string>(
        paramOrderId || "",
    );

    // Auto-track if navigated with real orderNumber & email
    useEffect(() => {
        if (paramOrderId && paramEmail) {
            setSearchedOrderId(paramOrderId.trim());
            trackOrderMutation
                .mutateAsync({
                    orderNumber: paramOrderId.trim(),
                    email: paramEmail.trim(),
                })
                .then((res) => {
                    if (
                        res?.data &&
                        (res.data.order || res.data.orderNumber)
                    ) {
                        const orderData = res.data.order;
                        const progressData = res.data.progress;
                        const status =
                            progressData?.currentStatus ||
                            orderData?.status ||
                            res.data.status;
                        const rawDate =
                            orderData?.paidAt ||
                            orderData?.createdAt ||
                            orderData?.placedAt;
                        const dateStr = rawDate
                            ? new Date(rawDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                              })
                            : "Recent";

                        setTrackedOrder({
                            orderId:
                                orderData?.orderNumber ||
                                res.data.orderNumber ||
                                paramOrderId,
                            emailAddress: paramEmail,
                            placedDate: dateStr,
                            stepIndex: getStepIndexFromStatus(status),
                        });
                        setFormValues({
                            orderId:
                                orderData?.orderNumber ||
                                res.data.orderNumber ||
                                paramOrderId,
                            emailAddress: paramEmail,
                        });
                        setTrackingStatus("success");
                    } else {
                        setTrackedOrder(null);
                        setTrackingStatus("error");
                    }
                })
                .catch(() => {
                    setTrackedOrder(null);
                    setTrackingStatus("error");
                });
        }
    }, [paramOrderId, paramEmail]);

    const handleTrackOrder = async (values: TrackOrderFormValues) => {
        setFormValues(values);
        setSearchedOrderId(values.orderId.trim());
        try {
            const res = await trackOrderMutation.mutateAsync({
                orderNumber: values.orderId.trim(),
                email: values.emailAddress.trim(),
            });

            if (res?.data && (res.data.order || res.data.orderNumber)) {
                const orderData = res.data.order;
                const progressData = res.data.progress;
                const status =
                    progressData?.currentStatus ||
                    orderData?.status ||
                    res.data.status;
                const rawDate =
                    orderData?.paidAt ||
                    orderData?.createdAt ||
                    orderData?.placedAt;
                const dateStr = rawDate
                    ? new Date(rawDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                      })
                    : "Recent";

                setTrackedOrder({
                    orderId:
                        orderData?.orderNumber ||
                        res.data.orderNumber ||
                        values.orderId,
                    emailAddress: values.emailAddress,
                    placedDate: dateStr,
                    stepIndex: getStepIndexFromStatus(status),
                });
                setTrackingStatus("success");
                toast.success(
                    res.message || `Tracking order status for ${values.orderId}`,
                );
            } else {
                // No valid order found: clear previous data
                setTrackedOrder(null);
                setTrackingStatus("error");
            }
        } catch {
            // Invalid data / error: clear any past data so user knows it's not valid
            setTrackedOrder(null);
            setTrackingStatus("error");
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
                    isLoading={trackOrderMutation.isPending}
                />

                {/* Delivery Progress, Skeleton, or Empty State Component */}
                {trackOrderMutation.isPending ? (
                    <DeliveryProgressSkeleton />
                ) : trackedOrder ? (
                    <DeliveryProgress
                        orderId={trackedOrder.orderId}
                        placedDate={trackedOrder.placedDate}
                        currentStepIndex={trackedOrder.stepIndex}
                    />
                ) : (
                    <TrackOrderEmptyState
                        type={trackingStatus === "error" ? "error" : "idle"}
                        searchedOrderId={searchedOrderId}
                    />
                )}
            </Container>
        </div>
    );
};

export default TrackOrder;
