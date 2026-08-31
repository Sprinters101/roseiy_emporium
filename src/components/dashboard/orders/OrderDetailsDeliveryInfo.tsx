import React from "react";
import { MapPin } from "lucide-react";

interface OrderDetailsDeliveryInfoProps {
    title?: string;
    address: string;
    deliveryFee: string;
}

export const OrderDetailsDeliveryInfo: React.FC<
    OrderDetailsDeliveryInfoProps
> = ({ title = "Shipping Address", address, deliveryFee }) => {
    return (
        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-4 w-full">
            {/* Section Heading */}
            <h3 className="font-playfair font-bold text-base sm:text-[1.25rem] text-white">
                Delivery Information
            </h3>

            {/* Address Row */}
            <div className="flex items-center justify-between gap-4 pt-1">
                {/* Left: Map Pin Icon & Address Text */}
                <div className="flex items-center gap-3.5 min-w-0">
                    <div className="size-9 sm:size-10 rounded-full bg-black-900 flex items-center justify-center text-white shrink-0 border border-neutral-800/50 shadow-md">
                        <MapPin className="size-4 sm:size-4.5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <h4 className="font-bold font-hanken text-sm sm:text-base text-white truncate">
                            {title}
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-400 font-hanken mt-0.5 truncate">
                            {address}
                        </p>
                    </div>
                </div>

                {/* Right: Delivery Fee */}
                <span className="font-playfair font-bold text-sm sm:text-base text-white whitespace-nowrap shrink-0">
                    {deliveryFee}
                </span>
            </div>
        </div>
    );
};

export default OrderDetailsDeliveryInfo;
