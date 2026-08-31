import React from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderDetailsItemRow } from "./orders/OrderDetailsItemRow";
import { OrderDetailsDeliveryInfo } from "./orders/OrderDetailsDeliveryInfo";
import { DEMO_ORDER_DETAILS, type OrderDetailsData } from "./orders/types";

interface CustomerOrderDetailsProps {
    order?: OrderDetailsData;
}

export const CustomerOrderDetails: React.FC<CustomerOrderDetailsProps> = ({
    order = DEMO_ORDER_DETAILS,
}) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("id") || order.orderNumber;

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Header: Back Button & Title */}
            <div className="flex items-center gap-3.5">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(-1)}
                    className="size-6 md:size-8 rounded-full bg-black-700 border border-neutral-800 text-white hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer shrink-0"
                    aria-label="Go back"
                >
                    <ArrowLeft className="size-3 md:size-4" />
                </Button>
                <h2 className="font-playfair font-bold text-xl md:text-[1.5625rem] text-white">
                    Order Details
                </h2>
            </div>

            {/* Main Order Card */}
            <div className="bg-black-700 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-6 w-full">
                {/* Order Top Meta & Action */}
                <div className="flex items-center justify-between gap-4 pb-2">
                    {/* Left: Shopping Bag Badge & Order Meta */}
                    <div className="flex md:items-center gap-3.5">
                        <div className="size-6 sm:size-11 rounded-full bg-black-900 flex items-center justify-center text-white shrink-0 border border-neutral-800/50 shadow-md">
                            <ShoppingBag className="size-3 md:size-4.5" />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[0.8125rem] sm:text-xl font-bold font-hanken text-white">
                                Order {orderId}
                            </span>
                            <span className="text-[0.625rem] sm:text-sm text-black-200 font-hanken mt-0.5">
                                Placed on {order.placedDate}
                            </span>
                            <span className="text-[0.625rem] sm:text-sm text-neutral-400 font-hanken mt-0.5">
                                {order.itemsCount} Items
                            </span>
                        </div>
                    </div>

                    {/* Right: Track Order Button */}
                    <Button
                        type="button"
                        onClick={() =>
                            navigate(`/dashboard/track-order?id=${orderId}`)
                        }
                        className="bg-gold-gradient md:h-12 h-7 text-black-900 font-semibold font-hanken text-[0.5rem] sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-sm hover:opacity-90 transition-opacity cursor-pointer border-none w-full max-w-20 md:max-w-49.5 "
                    >
                        Track Order
                    </Button>
                </div>

                {/* Subheading: Items in your order */}
                <h3 className="font-playfair font-bold text-base sm:text-[1.25rem] text-white pt-2">
                    Items in your order
                </h3>

                {/* Items List */}
                <div className="flex flex-col w-full">
                    {order.items.map((item) => (
                        <OrderDetailsItemRow key={item.id} item={item} />
                    ))}
                </div>

                {/* Bottom Total Amount */}
                <div className="flex items-center justify-end pt-2">
                    <span className="font-playfair font-bold text-base sm:text-xl text-gold-400">
                        Total: {order.totalAmount}
                    </span>
                </div>
            </div>

            {/* Delivery Information Card */}
            <OrderDetailsDeliveryInfo
                title={order.shippingAddress.title}
                address={order.shippingAddress.address}
                deliveryFee={order.shippingAddress.deliveryFee}
            />
        </div>
    );
};

export default CustomerOrderDetails;
