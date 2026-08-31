import React from "react";
import { useNavigate } from "react-router";
import type { OrderItemData, OrderTabType } from "./types";
import { Button } from "@/components/ui/button";
import {
    ActionDropdown,
    type ActionDropdownItem,
} from "@/components/common/ActionDropdown";

interface OrderItemRowProps {
    order: OrderItemData;
    activeTab: OrderTabType;
    onOrderAgain: (order: OrderItemData) => void;
}

export const OrderItemRow: React.FC<OrderItemRowProps> = ({
    order,
    activeTab,
    onOrderAgain,
}) => {
    const navigate = useNavigate();

    const mobileActions: ActionDropdownItem[] =
        activeTab === "ongoing"
            ? [
                  {
                      label: "View Details",
                      onClick: () =>
                          navigate(
                              `/dashboard/orders/details?id=${order.orderNumber}`,
                          ),
                  },
                  {
                      label: "Track Order",
                      onClick: () =>
                          navigate(
                              `/dashboard/track-order?id=${order.orderNumber}`,
                          ),
                  },
              ]
            : [
                  {
                      label: "View Details",
                      onClick: () =>
                          navigate(
                              `/dashboard/orders/details?id=${order.orderNumber}`,
                          ),
                  },
                  {
                      label: "Order Again",
                      onClick: () => onOrderAgain(order),
                  },
              ];

    return (
        <div className="border-y border-y-neutral-800/80 py-2 sm:py-2 flex flex-row items-center justify-between gap-4 transition-all hover:bg-white/[0.01]">
            {/* Left: Product Thumbnails & Order Meta */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 max-w-106.25 w-full">
                {/* Thumbnails */}
                <div className="flex items-center gap-1 shrink-0">
                    {order.thumbnails.slice(0, 3).map((thumb, tIdx) => (
                        <div
                            key={tIdx}
                            className="size-10 sm:size-14 md:size-16 rounded-lg bg-black-900 flex items-center justify-center overflow-hidden p-1 shadow-md border border-neutral-800/40"
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
                    <span className="text-sm sm:text-base font-bold font-hanken text-white truncate">
                        Order {order.orderNumber}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-400 font-hanken mt-0.5">
                        {order.itemsCount}{" "}
                        {order.itemsCount === 1 ? "Item" : "Items"}
                    </span>
                </div>
            </div>

            {/* Center-Left: Date (Desktop) */}
            <div className="hidden sm:block w-full max-w-fit text-xs sm:text-sm text-neutral-300 font-hanken whitespace-nowrap">
                {order.date}
            </div>

            {/* Center-Right: Total Amount (Desktop) */}
            <span className="hidden sm:block text-sm sm:text-base font-bold font-hanken text-white whitespace-nowrap">
                {order.totalAmount}
            </span>

            {/* Right: Desktop Action Links */}
            <div className="hidden sm:flex items-center justify-end gap-5 lg:gap-6 shrink-0 w-full max-w-fit">
                {activeTab === "ongoing" ? (
                    <>
                        <Button
                            variant="link"
                            onClick={() =>
                                navigate(
                                    `/dashboard/track-order?id=${order.orderNumber}`,
                                )
                            }
                            className="h-auto p-0 text-xs sm:text-sm text-gold-500 hover:text-gold-400 font-semibold font-hanken underline hover:no-underline underline-offset-2"
                        >
                            Track Order
                        </Button>
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
                    </>
                ) : (
                    <>
                        <Button
                            variant="link"
                            onClick={() => onOrderAgain(order)}
                            className="h-auto p-0 text-xs sm:text-sm text-gold-500 hover:text-gold-400 font-semibold font-hanken underline hover:no-underline underline-offset-2"
                        >
                            Order Again
                        </Button>
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
                    </>
                )}
            </div>

            {/* Mobile: 3-Dots Action Menu */}
            <div className="sm:hidden shrink-0">
                <ActionDropdown
                    items={mobileActions}
                    align="end"
                    ariaLabel={`Actions for Order ${order.orderNumber}`}
                />
            </div>
        </div>
    );
};

export default OrderItemRow;
