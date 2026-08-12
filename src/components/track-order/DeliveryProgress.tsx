import React from "react";
import { ShoppingBag } from "lucide-react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export interface DeliveryProgressProps {
    orderId?: string;
    placedDate?: string;
    currentStepIndex?: number; // 0: Order Placed, 1: Order Confirmed, 2: In Transit, 3: Order Delivered
}

const STEPS = [
    { label: "Order Placed", key: "placed" },
    { label: "Order Confirmed", key: "confirmed" },
    { label: "In Transit", key: "transit" },
    { label: "Order Delivered", key: "delivered" },
];

export const DeliveryProgress: React.FC<DeliveryProgressProps> = ({
    orderId = "RE-2026-7890",
    placedDate = "January 15 2026",
    currentStepIndex = 1, // Default matching screenshot (Order Confirmed / In Transit)
}) => {
    // Progress bar width percentage based on step index (0 -> 15%, 1 -> 45%, 2 -> 75%, 3 -> 100%)
    const progressWidths = ["15%", "45%", "75%", "100%"];
    const activeProgressWidth = progressWidths[currentStepIndex] || "45%";

    return (
        <div className="bg-black-700 rounded-lg p-6 sm:p-8 flex flex-col gap-6 mt-8 border border-neutral-800/60 shadow-xl">
            {/* Header */}
            <h2 className="text-xl sm:text-[1.25rem] font-playfair font-bold text-white mb-1">
                Delivery Progress
            </h2>

            {/* Order Identifier Info Box */}
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-black-900 flex items-center justify-center text-white shrink-0">
                    <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-base sm:text-lg font-bold font-hanken text-white">
                        Order {orderId}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-hanken mt-0.5">
                        Placed on {placedDate}
                    </p>
                </div>
            </div>

            {/* Top Progress Bar */}
            <div className="w-full h-2 bg-black-900 rounded-full overflow-hidden relative mt-2 mb-4">
                <div
                    className="h-full bg-gold-g transition-all duration-500 rounded-full"
                    style={{ width: activeProgressWidth }}
                />
            </div>

            {/* Stepper Steps Row with Horizontal Connecting Lines */}
            <div className="flex items-center justify-between w-full pt-2 gap-2 overflow-x-auto">
                {STEPS?.map((step, idx) => {
                    const isCompleted = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex + 1;
                    const isLast = idx === STEPS.length - 1;

                    return (
                        <React.Fragment key={step.key}>
                            {/* Step Node */}
                            <div className="flex flex-col items-center gap-2 text-center md:text-left shrink-0">
                                <div className="flex items-center justify-center">
                                    {isCompleted ? (
                                        <IoCheckmarkCircleSharp className="size-5 sm:size-6 text-emerald-500 shrink-0" />
                                    ) : isCurrent ? (
                                        <IoCheckmarkCircleSharp className="size-5 sm:size-6 text-white shrink-0" />
                                    ) : (
                                        <IoCheckmarkCircleSharp className="size-5 sm:size-6 text-white shrink-0" />
                                    )}
                                </div>

                                {/* Label */}
                                <span
                                    className={`text-xs sm:text-sm font-hanken font-medium whitespace-nowrap ${
                                        isCompleted
                                            ? "text-emerald-400"
                                            : isCurrent
                                              ? "text-white"
                                              : "text-white"
                                    }`}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {/* Horizontal Line Divider between Steps */}
                            {!isLast && (
                                <div
                                    className={`h-[1px] min-w-[24px] flex-1 mx-2 sm:mx-4 transition-colors ${
                                        idx < currentStepIndex
                                            ? "bg-white"
                                            : "bg-white"
                                    }`}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default DeliveryProgress;
