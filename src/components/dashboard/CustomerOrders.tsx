import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/sonner";
import { CustomerOrdersSkeleton } from "./CustomerOrdersSkeleton";
import { OrdersTabs } from "./orders/OrdersTabs";
import { OrderItemRow } from "./orders/OrderItemRow";
import { OrdersEmptyState } from "./orders/OrdersEmptyState";
import {
    ONGOING_ORDERS,
    DELIVERED_ORDERS,
    type OrderItemData,
    type OrderTabType,
} from "./orders/types";
import { donJulioReposadoImg } from "@/lib/site_data";

export interface CustomerOrdersProps {
    isLoading?: boolean;
}

export const CustomerOrders: React.FC<CustomerOrdersProps> = ({
    isLoading: propIsLoading,
}) => {
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState<OrderTabType>("ongoing");
    const [simulatedLoading, setSimulatedLoading] = useState<boolean>(
        propIsLoading === undefined,
    );

    useEffect(() => {
        if (propIsLoading !== undefined) return;

        const timer = setTimeout(() => {
            setSimulatedLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, [propIsLoading]);

    const loading =
        propIsLoading !== undefined ? propIsLoading : simulatedLoading;

    if (loading) {
        return <CustomerOrdersSkeleton />;
    }

    const ongoingCount = ONGOING_ORDERS.length;
    const deliveredCount = 25; // Design mock total

    const currentOrders =
        activeTab === "ongoing" ? ONGOING_ORDERS : DELIVERED_ORDERS;

    const handleOrderAgain = (order: OrderItemData) => {
        addToCart(
            {
                id: `reorder-${order.id}`,
                name: `Order ${order.orderNumber} Items`,
                price: 25000,
                image: order.thumbnails[0] || donJulioReposadoImg,
            },
            1,
        );
        toast.success(`Items from Order ${order.orderNumber} added to cart!`);
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
