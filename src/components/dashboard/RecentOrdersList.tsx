import React from "react";
import { Link, useNavigate } from "react-router";
import { topFlourishOrnament, donJulioReposadoImg, hennessyXoImg, claseAzulImg } from "@/lib/site_data";

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

// Default mock orders matching design image 2
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
                <h2 className="font-playfair font-bold text-xl sm:text-2xl text-white">
                    Recent Orders
                </h2>
                <Link
                    to="/dashboard/orders"
                    className="text-xs text-white border border-neutral-700 rounded-md px-4 py-1.5 hover:bg-neutral-800 transition-colors cursor-pointer font-hanken"
                >
                    View All
                </Link>
            </div>

            {!hasOrders ? (
                /* Empty State Container */
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                    {/* Wine Box Illustration Graphic */}
                    <div className="w-full max-w-64 sm:max-w-72 flex flex-col items-center mb-4">
                        <img
                            src="https://res.cloudinary.com/dzk1a6bjt/image/upload/v1785057214/image_35_i4k23o.png"
                            alt="Wine Box Selection"
                            className="w-48 h-auto object-contain drop-shadow-2xl"
                        />
                        <img
                            src={topFlourishOrnament || "/icon/titleDivider.svg"}
                            alt="Flourish divider"
                            className="w-full max-w-56 h-auto object-contain opacity-90 mt-4"
                        />
                    </div>

                    <h3 className="font-playfair font-bold text-2xl text-white">
                        No Orders Yet
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-hanken text-center max-w-md leading-relaxed mt-2">
                        You haven't placed an order yet. Explore our carefully curated
                        collection and find the perfect bottle for your next celebration.
                    </p>

                    <Link
                        to="/shop"
                        className="mt-6 px-6 py-2.5 border border-white text-white rounded-md text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer font-hanken"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                /* Recent Orders Items List */
                <div className="flex flex-col gap-3 w-full">
                    {orders.map((order, idx) => (
                        <div
                            key={order.id || idx}
                            className="bg-black-900/60 border border-neutral-800/80 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-neutral-700"
                        >
                            {/* Thumbnails & Order ID */}
                            <div className="flex items-center gap-4 min-w-0">
                                {/* Product Thumbnails Container */}
                                <div className="flex items-center -space-x-2 shrink-0">
                                    {order.thumbnails.map((thumb, tIdx) => (
                                        <div
                                            key={tIdx}
                                            className="w-10 h-10 rounded-md bg-black-900 border border-neutral-800 flex items-center justify-center overflow-hidden p-1 shadow-md"
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
                                        {order.itemsCount} {order.itemsCount === 1 ? "Item" : "Items"}
                                    </span>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="text-xs sm:text-sm text-neutral-300 font-hanken">
                                {order.date}
                            </div>

                            {/* Price & Action Link */}
                            <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                                <span className="text-sm font-bold font-hanken text-white">
                                    {order.totalAmount}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => navigate("/track-order")}
                                    className="text-xs sm:text-sm text-gold-500 font-semibold font-hanken hover:underline cursor-pointer"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentOrdersList;
