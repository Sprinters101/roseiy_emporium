import React, { useMemo, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import {
    ArrowLeft,
    ShoppingBag,
    Clock,
    CheckCircle2,
    Truck,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DeliveryProgress } from "@/components/track-order/DeliveryProgress";
import { useGetCustomerOrders, useGetSingleOrder } from "@/service/queries";
import type { OrderDetailsData, OrderSummaryItem } from "@/service/types";

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

const getStatusBadge = (status?: string) => {
    const s = status?.toLowerCase() || "processing";
    if (s === "delivered" || s === "completed") {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="size-3.5" />
                Delivered
            </span>
        );
    }
    if (s === "shipped" || s === "in_transit" || s === "in transit") {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                <Truck className="size-3.5" />
                In Transit
            </span>
        );
    }
    if (s === "cancelled") {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30">
                <AlertCircle className="size-3.5" />
                Cancelled
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-400/10 text-gold-400 border border-gold-400/30">
            <Clock className="size-3.5" />
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Processing"}
        </span>
    );
};

export const DashboardTrackOrder: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const paramOrderId = searchParams.get("id") || "";

    const { data: customerOrdersData, isLoading: isOrdersListLoading } =
        useGetCustomerOrders();

    const ordersList: OrderSummaryItem[] = useMemo(() => {
        if (!customerOrdersData?.data) return [];
        if (Array.isArray(customerOrdersData.data)) return customerOrdersData.data;
        if (
            Array.isArray(
                (customerOrdersData.data as { orders?: OrderSummaryItem[] }).orders,
            )
        ) {
            return (
                (customerOrdersData.data as { orders: OrderSummaryItem[] }).orders || []
            );
        }
        return [];
    }, [customerOrdersData]);

    const activeOrderNumber = useMemo(() => {
        if (paramOrderId) return paramOrderId;
        if (ordersList.length > 0) return ordersList[0].orderNumber;
        return "";
    }, [paramOrderId, ordersList]);

    // Update query params if defaulted
    useEffect(() => {
        if (!paramOrderId && activeOrderNumber) {
            setSearchParams({ id: activeOrderNumber }, { replace: true });
        }
    }, [paramOrderId, activeOrderNumber, setSearchParams]);

    const { data: orderDetailsData, isLoading: isOrderLoading } =
        useGetSingleOrder(activeOrderNumber, {
            enabled: Boolean(activeOrderNumber),
        });

    const rawData = orderDetailsData?.data;
    const order: OrderDetailsData | undefined =
        rawData && typeof rawData === "object" && "order" in rawData && rawData.order
            ? (rawData as { order: OrderDetailsData }).order
            : (rawData as OrderDetailsData | undefined);

    const handleOrderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newId = e.target.value;
        if (newId) {
            setSearchParams({ id: newId });
        }
    };

    if (isOrdersListLoading && !activeOrderNumber) {
        return (
            <div className="flex flex-col gap-6 w-full">
                <div className="flex items-center gap-3.5">
                    <Skeleton className="size-8 rounded-full bg-neutral-800" />
                    <Skeleton className="h-8 w-40 bg-neutral-800" />
                </div>
                <Skeleton className="h-64 w-full bg-neutral-800 rounded-xl" />
            </div>
        );
    }

    if (ordersList.length === 0 && !activeOrderNumber) {
        return (
            <div className="flex flex-col gap-6 w-full">
                <div className="flex items-center gap-3.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate("/dashboard/orders")}
                        className="size-8 rounded-full bg-black-700 border border-neutral-800 text-white hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer shrink-0"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="size-4" />
                    </Button>
                    <h2 className="font-playfair font-bold text-2xl text-white">
                        Track Order
                    </h2>
                </div>

                <div className="bg-black-700 rounded-xl p-8 border border-neutral-800/60 text-center flex flex-col items-center justify-center gap-4 py-16">
                    <ShoppingBag className="size-12 text-neutral-500" />
                    <h3 className="font-playfair font-bold text-xl text-white">
                        No Active Orders to Track
                    </h3>
                    <p className="text-neutral-400 text-sm max-w-sm font-hanken">
                        You have not placed any orders yet. Once you make a purchase, you can follow its live shipping progress here.
                    </p>
                    <Link
                        to="/shop"
                        className="mt-2 px-6 py-2.5 bg-gold-gradient text-black-900 font-semibold font-hanken text-sm rounded-sm hover:opacity-95 transition-opacity"
                    >
                        Browse Cellar
                    </Link>
                </div>
            </div>
        );
    }

    const orderNumber = order?.orderNumber || activeOrderNumber || "RE-Order";
    const rawDate = order?.paidAt || order?.createdAt || order?.placedAt;
    const placedDate = rawDate
        ? new Date(rawDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
          })
        : "Recent";

    const currentStepIndex = getStepIndexFromStatus(order?.status);

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Header: Back Button, Title & Order Switcher Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate("/dashboard/orders")}
                        className="size-7 sm:size-8 rounded-full bg-black-700 border border-neutral-800 text-white hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer shrink-0"
                        aria-label="Go back to orders"
                    >
                        <ArrowLeft className="size-3.5 sm:size-4" />
                    </Button>
                    <h2 className="font-playfair font-bold text-xl md:text-[1.5625rem] text-white">
                        Track Order
                    </h2>
                </div>

                {ordersList.length > 1 && (
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-xs text-neutral-400 font-hanken whitespace-nowrap">
                            Select Order:
                        </span>
                        <select
                            value={activeOrderNumber}
                            onChange={handleOrderSelect}
                            className="bg-black-700 text-white text-xs font-hanken border border-neutral-800 rounded-md px-3 py-1.5 focus:outline-none focus:border-gold-400 cursor-pointer"
                        >
                            {ordersList.map((o) => (
                                <option key={o.orderNumber} value={o.orderNumber}>
                                    {o.orderNumber} ({o.status})
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Live Delivery Progress Card */}
            {isOrderLoading ? (
                <Skeleton className="h-56 w-full bg-neutral-800 rounded-xl" />
            ) : (
                <div className="relative">
                    <DeliveryProgress
                        orderId={orderNumber}
                        placedDate={placedDate}
                        currentStepIndex={currentStepIndex}
                    />

                    {/* Status Floating Badge */}
                    <div className="absolute top-6 right-6 hidden sm:block">
                        {getStatusBadge(order?.status)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardTrackOrder;
