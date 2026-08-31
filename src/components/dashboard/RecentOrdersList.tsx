import React from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ShopEmptyState } from "@/components/shop/ShopEmptyState";
import {
    donJulioReposadoImg,
    hennessyXoImg,
    claseAzulImg,
} from "@/lib/site_data";

export interface OrderItem {
    id: string;
    orderNumber: string;
    itemsCount: number;
    date: string;
    totalAmount: string;
    thumbnails: string[];
}

export interface RecentOrdersListProps {
    orders?: OrderItem[];
}

// Default mock orders matching design
const DEMO_ORDERS: OrderItem[] = [
    {
        id: "1",
        orderNumber: "RE-2026-7890",
        itemsCount: 5,
        date: "May 15, 2026",
        totalAmount: "₦2,510,000",
        thumbnails: [donJulioReposadoImg, hennessyXoImg, claseAzulImg],
    },
    {
        id: "2",
        orderNumber: "RE-2026-7890",
        itemsCount: 1,
        date: "June 10, 2025",
        totalAmount: "₦180,000",
        thumbnails: [donJulioReposadoImg],
    },
    {
        id: "3",
        orderNumber: "RE-2026-7890",
        itemsCount: 2,
        date: "August 22, 2027",
        totalAmount: "₦75,000",
        thumbnails: [hennessyXoImg, claseAzulImg],
    },
    {
        id: "4",
        orderNumber: "RE-2026-7890",
        itemsCount: 2,
        date: "June 10, 2025",
        totalAmount: "₦180,000",
        thumbnails: [donJulioReposadoImg, hennessyXoImg],
    },
];

export const RecentOrdersList: React.FC<RecentOrdersListProps> = ({
    orders = DEMO_ORDERS,
}) => {
    const navigate = useNavigate();
    const hasOrders = orders && orders.length > 0;

    return (
        <div className="bg-black-700 rounded-xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-6 w-full mt-2">
            {/* Card Header */}
            <div className="flex items-center justify-between w-full">
                <h2 className="font-playfair font-bold text-lg sm:text-xl text-white">
                    Recent Orders
                </h2>
                <Link
                    to="/dashboard/orders"
                    className="text-xs text-white border border-neutral-700 rounded-md px-4 py-1.5 hover:bg-neutral-800 transition-colors cursor-pointer font-hanken w-full max-w-25 text-center"
                >
                    View All
                </Link>
            </div>

            {!hasOrders ? (
                /* Empty State Container */
                <ShopEmptyState
                    title="No Orders Yet"
                    description="You haven't placed an order yet. Explore our carefully curated collection and find the perfect bottle for your next celebration."
                    buttonText="Start Shopping"
                    onButtonClick={() => navigate("/shop")}
                    imageSrc="https://res.cloudinary.com/dzk1a6bjt/image/upload/v1785057214/image_35_i4k23o.png"
                />
            ) : (
                /* Recent Orders Items List */
                <div className="flex flex-col gap-3 w-full">
                    {orders.map((order, idx) => (
                        <div
                            key={order.id || idx}
                            className="border-y border-y-neutral-800/80 py-2.5 flex flex-row sm:items-center justify-between gap-4 transition-all"
                        >
                            {/* Thumbnails & Order ID */}
                            <div className="flex items-center gap-4 min-w-0 max-w-106.25 w-full">
                                {/* Product Thumbnails Container */}
                                <div className="flex items-center gap-1 shrink-0">
                                    {order?.thumbnails
                                        ?.slice(0, 3)
                                        .map((thumb, tIdx) => (
                                            <div
                                                key={tIdx}
                                                className="size-10 md:size-16 rounded-lg bg-black-900 flex items-center justify-center overflow-hidden p-1 shadow-md border border-neutral-800/40"
                                            >
                                                <img
                                                    src={thumb}
                                                    alt="Product thumbnail"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        ))}
                                </div>

                                {/* Order Info */}
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-bold font-hanken text-white truncate">
                                        Order {order.orderNumber}
                                    </span>
                                    <span className="text-xs text-neutral-400 font-hanken mt-0.5">
                                        {order.itemsCount}{" "}
                                        {order.itemsCount === 1
                                            ? "Item"
                                            : "Items"}
                                    </span>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="hidden sm:block w-full max-w-fit text-xs sm:text-sm text-neutral-300 font-hanken">
                                {order.date}
                            </div>

                            {/* Price & Action Link */}
                            <span className="hidden sm:block text-sm font-bold font-hanken text-white">
                                {order.totalAmount}
                            </span>
                            <div className="w-full max-w-fit flex items-center justify-between sm:justify-end gap-6 shrink-0">
                                <Button
                                    variant="link"
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/orders/details?id=${order.orderNumber}`,
                                        )
                                    }
                                    className="h-auto p-0 text-xs sm:text-sm text-gold-500 hover:text-gold-400 font-semibold font-hanken underline hover:no-underline underline-offset-2"
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentOrdersList;
