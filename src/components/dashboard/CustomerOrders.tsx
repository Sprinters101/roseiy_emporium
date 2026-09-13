import React, { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { CustomerOrdersSkeleton } from "./CustomerOrdersSkeleton";
import { OrdersTabs } from "./orders/OrdersTabs";
import { OrderItemRow } from "./orders/OrderItemRow";
import { OrdersEmptyState } from "./orders/OrdersEmptyState";
import { type OrderItemData, type OrderTabType } from "./orders/types";
import { useGetCustomerOrders } from "@/service/queries";
import { useReorder } from "@/service/mutation";
import type { OrderSummaryItem } from "@/service/types";
import { extractImageFromObject } from "@/context/CartContext";

export interface CustomerOrdersProps {
    isLoading?: boolean;
}

export const CustomerOrders: React.FC<CustomerOrdersProps> = ({
    isLoading: propIsLoading,
}) => {
    const [activeTab, setActiveTab] = useState<OrderTabType>("ongoing");
    const { data: ordersData, isLoading: queryIsLoading } =
        useGetCustomerOrders();
    const reorderMutation = useReorder();

    const loading =
        propIsLoading !== undefined ? propIsLoading : queryIsLoading;

    const rawOrders: OrderSummaryItem[] = React.useMemo(() => {
        if (!ordersData?.data) return [];
        if (Array.isArray(ordersData.data)) return ordersData.data;
        if (
            Array.isArray(
                (ordersData.data as { orders?: OrderSummaryItem[] }).orders,
            )
        ) {
            return (
                (ordersData.data as { orders: OrderSummaryItem[] }).orders || []
            );
        }
        return [];
    }, [ordersData]);

    const mappedOrders: OrderItemData[] = React.useMemo(() => {
        return rawOrders.map((order, idx) => {
            const isDelivered =
                order.status === "delivered" || order.status === "completed";

            const itemsCount =
                order.items?.reduce(
                    (sum, i) => sum + (i.quantity || 1),
                    0,
                ) ||
                order.itemsCount ||
                order.items?.length ||
                1;

            const dateString = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                  })
                : order.date || "Recent";

            const formattedTotal =
                typeof order.total === "number"
                    ? `₦${order.total.toLocaleString()}`
                    : typeof order.total === "string" &&
                        order.total.startsWith("₦")
                      ? order.total
                      : `₦${Number(order.total || 0).toLocaleString()}`;

            const thumbnails: string[] = (
                order.thumbnails ||
                order.items?.map((item) => extractImageFromObject(item)) ||
                []
            ).filter(Boolean);

            return {
                id: order.orderId || `order-${idx}`,
                orderNumber: order.orderNumber,
                itemsCount,
                date: dateString,
                totalAmount: formattedTotal,
                status: (isDelivered ? "delivered" : "ongoing") as
                    | "ongoing"
                    | "delivered",
                thumbnails,
            };
        });
    }, [rawOrders]);

    if (loading) {
        return <CustomerOrdersSkeleton />;
    }

    const ongoingOrders = mappedOrders.filter((o) => o.status === "ongoing");
    const deliveredOrders = mappedOrders.filter((o) => o.status === "delivered");

    const ongoingCount = ongoingOrders.length;
    const deliveredCount = deliveredOrders.length;

    const currentOrders =
        activeTab === "ongoing" ? ongoingOrders : deliveredOrders;

    const handleOrderAgain = async (order: OrderItemData) => {
        try {
            await reorderMutation.mutateAsync(order.orderNumber);
            toast.success(
                `Items from Order ${order.orderNumber} added to cart!`,
            );
        } catch {
            // Handled by onError in reorder mutation hook
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Section Title */}
            <h2 className="font-playfair font-bold text-2xl md:text-3xl text-white">
                Orders
            </h2>

            {/* Tabs Filter Bar */}
            <OrdersTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                ongoingCount={ongoingCount}
                deliveredCount={deliveredCount}
            />

            {/* Orders List Card Container */}
            <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-6 w-full">
                <h3 className="font-playfair font-bold text-xl sm:text-[1.25rem] text-white">
                    {activeTab === "ongoing"
                        ? "Ongoing Orders"
                        : "Delivered Orders"}
                </h3>

                {currentOrders.length === 0 ? (
                    <OrdersEmptyState activeTab={activeTab} />
                ) : (
                    <div className="flex flex-col w-full">
                        {currentOrders.map((order, idx) => (
                            <OrderItemRow
                                key={order.id || idx}
                                order={order}
                                activeTab={activeTab}
                                onOrderAgain={handleOrderAgain}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerOrders;
