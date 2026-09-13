import React from "react";
import { DashboardStatsCard } from "./DashboardStatsCard";
import { RecentOrdersList } from "./RecentOrdersList";
import { CustomerOverviewSkeleton } from "./CustomerOverviewSkeleton";
import { useGetCustomerOrders, useGetAddresses } from "@/service/queries";
import type { OrderSummaryItem, AddressResponseItem } from "@/service/types";

export interface CustomerOverviewProps {
    isLoading?: boolean;
}

export const CustomerOverview: React.FC<CustomerOverviewProps> = ({
    isLoading: propIsLoading,
}) => {
    const { data: ordersData, isLoading: isOrdersLoading } =
        useGetCustomerOrders();
    const { data: addressesData, isLoading: isAddressesLoading } =
        useGetAddresses();

    const loading =
        propIsLoading !== undefined
            ? propIsLoading
            : isOrdersLoading || isAddressesLoading;

    const orders: OrderSummaryItem[] = React.useMemo(() => {
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

    const addressesCount: number = React.useMemo(() => {
        if (!addressesData?.data) return 0;
        if (Array.isArray(addressesData.data)) return addressesData.data.length;
        if (
            Array.isArray(
                (addressesData.data as { addresses?: AddressResponseItem[] })
                    .addresses,
            )
        ) {
            return (
                (addressesData.data as { addresses: AddressResponseItem[] })
                    .addresses.length || 0
            );
        }
        return 0;
    }, [addressesData]);

    const activeOrdersCount = orders.filter(
        (o) =>
            o.status === "processing" ||
            o.status === "shipped" ||
            o.status === "confirmed" ||
            o.status === "in_transit" ||
            o.status === "pending" ||
            o.status === "placed",
    ).length;

    const completedOrdersCount = orders.filter(
        (o) => o.status === "delivered" || o.status === "completed",
    ).length;

    if (loading) {
        return <CustomerOverviewSkeleton />;
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Section Header */}
            <h2 className="font-playfair font-bold text-2xl md:text-3xl text-white">
                Overview
            </h2>

            {/* Top Stats Cards Row */}
            <DashboardStatsCard
                activeOrdersCount={activeOrdersCount}
                completedOrdersCount={completedOrdersCount}
                savedAddressesCount={addressesCount}
            />

            {/* Recent Orders List Card Container */}
            <RecentOrdersList orders={orders} isLoading={false} />
        </div>
    );
};

export default CustomerOverview;
