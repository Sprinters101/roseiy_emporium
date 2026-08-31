import React from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeliveryProgress } from "@/components/track-order/DeliveryProgress";

export const DashboardTrackOrder: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("id") || "RE-2026-7890";

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
                    Track Order
                </h2>
            </div>

            {/* Delivery Progress Card */}
            <DeliveryProgress
                orderId={orderId}
                placedDate="January 15 2026"
                currentStepIndex={1}
            />
        </div>
    );
};

export default DashboardTrackOrder;
