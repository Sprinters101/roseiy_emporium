import React from "react";
import { ShoppingBag } from "lucide-react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";

export interface DeliveryProgressProps {
    orderId?: string;
    placedDate?: string;
    currentStepIndex?: number; // 0: Order Placed, 1: Order Confirmed, 2: In Transit, 3: Order Delivered
    className?: string;
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
    currentStepIndex = 1, // Order Confirmed
    className,
}) => {
    // Progress bar width (0 -> 15%, 1 -> 48%, 2 -> 75%, 3 -> 100%)
    const progressWidths = ["15%", "48%", "75%", "100%"];
    const activeProgressWidth = progressWidths[currentStepIndex] || "48%";

    return (
        <div
            className={cn(
                "bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col gap-6 border border-neutral-800/60 shadow-xl w-full",
                className,
            )}
        >
            {/* Card Heading */}
            <h3 className="text-xl sm:text-base font-playfair font-bold text-white">
                Delivery Progress
            </h3>

            {/* Order Identifier Info Box */}
            <div className="flex items-center gap-3.5">
                <div className="size-10 sm:size-11 rounded-full bg-black-900 flex items-center justify-center text-white shrink-0 border border-neutral-800/50">
                    <ShoppingBag className="size-4.5" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[0.8125rem] sm:text-sm font-bold font-hanken text-white">
                        Order {orderId}
                    </span>
                    <span className="text-xs sm:text-sm text-black-200 font-hanken mt-0.5">
                        Placed on {placedDate}
                    </span>
                </div>
            </div>

            {/* Top Progress Bar */}
            <div className="w-full h-2 sm:h-2.5 bg-black-900 rounded-full overflow-hidden relative my-1">
                <div
                    className="h-full bg-gold-400 rounded-full transition-all duration-500"
                    style={{ width: activeProgressWidth }}
                />
            </div>

            {/* Stepper Steps Row */}
            <div className="w-full pt-1">
                {/* Icons & Connecting Lines Row */}
                <div className="flex items-center justify-between w-full">
                    {STEPS.map((step, idx) => {
                        const isCompleted = idx <= currentStepIndex;
                        const isLast = idx === STEPS.length - 1;

                        return (
                            <React.Fragment key={step.key}>
                                {/* Step Icon Node */}
                                <div className="flex items-center justify-center shrink-0">
                                    <IoCheckmarkCircleSharp
                                        className={cn(
                                            "size-5 sm:size-6 shrink-0 transition-colors",
                                            isCompleted
                                                ? "text-emerald-500"
                                                : "text-white",
                                        )}
                                    />
                                </div>

                                {/* Connecting Line */}
                                {!isLast && (
                                    <div className="h-[1px] min-w-[20px] sm:min-w-[40px] flex-1 mx-2 sm:mx-4 bg-neutral-600/70" />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Labels Row */}
                <div className="flex items-start justify-between w-full mt-2">
                    {STEPS.map((step, idx) => {
                        const isCompleted = idx <= currentStepIndex;

                        return (
                            <span
                                key={step.key}
                                className={cn(
                                    "text-[10px] sm:text-xs font-hanken font-medium text-center",
                                    isCompleted
                                        ? "text-emerald-500"
                                        : "text-white",
                                    idx === 0 && "text-left",
                                    idx === STEPS.length - 1 && "text-right",
                                )}
                            >
                                {step.label}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DeliveryProgress;
