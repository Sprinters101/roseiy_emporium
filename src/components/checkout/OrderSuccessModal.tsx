import React, { useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { topFlourishOrnament } from "@/lib/site_data";
import { toast } from "@/components/ui/sonner";
import { IoStarSharp } from "react-icons/io5";

export interface OrderSuccessModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTrackOrder?: () => void;
    onSubmitReview?: (rating: number, review: string) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
    open,
    onOpenChange,
    onTrackOrder,
    onSubmitReview,
}) => {
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [review, setReview] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const activeRating = hoverRating || rating;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (onSubmitReview) {
                await onSubmitReview(rating, review);
                // console.log(rating, review);
            } else {
                await new Promise((resolve) => setTimeout(resolve, 600));
                toast.success("Thank you for your feedback!");
            }
            onOpenChange(false);
            // Reset form state
            setRating(0);
            setReview("");
        } catch {
            toast.error("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTrackOrderClick = () => {
        if (onTrackOrder) {
            onTrackOrder();
        } else {
            toast.info("Redirecting to order tracking...");
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogOverlay className="bg-black/80 backdrop-blur-md z-50" />
            <DialogContent
                showCloseButton={false}
                className="bg-black-700 border-none  rounded-lg p-6 sm:p-8 max-w-md sm:max-w-182.5 w-full text-white  z-50 ring-0 outline-none "
            >
                {/* Gold Flourish Ornament Header */}
                <div className="w-full flex justify-center ">
                    <img
                        src={topFlourishOrnament || "/icon/titleDivider.svg"}
                        alt="Decorative flourish"
                        className="w-full max-w-55 sm:max-w-65 md:max-w-[26.3125rem] h-auto object-contain opacity-90"
                    />
                </div>

                {/* Main Heading */}
                <h2 className="text-[1.5625rem] sm:text-3xl md:text-[3.0625rem] font-playfair font-bold text-white text-center ">
                    Your Order is on the Way
                </h2>

                {/* Subtitle Message */}
                <p className="text-xs sm:text-[1rem] text-white font-hanken text-center max-w-xs sm:max-w-sm md:max-w-[28.75rem] mx-auto ">
                    Kindly leave a rating and quick review of your shopping
                    experience with Roseiy Emporium
                </p>

                {/* Interactive 5-Star Rating Deck */}
                <div className="flex items-center justify-center gap-2.5 mt-2 sm:my-7">
                    {[1, 2, 3, 4, 5].map((starIndex) => {
                        const isFilled = starIndex <= activeRating;
                        return (
                            <button
                                key={starIndex}
                                type="button"
                                onClick={() => setRating(starIndex)}
                                onMouseEnter={() => setHoverRating(starIndex)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="p-1 transition-transform hover:scgale-110 focus:outline-none cursor-pointer"
                                aria-label={`Rate ${starIndex} stars out of 5`}
                            >
                                <IoStarSharp
                                    className={`size-10 md:size-14  transition-colors duration-150 ${
                                        isFilled
                                            ? "text-gold-500 fill-gold-500 "
                                            : "text-black-900 fill-black-900"
                                    }`}
                                />
                            </button>
                        );
                    })}
                </div>

                {/* Review Textarea Section */}
                <div className="flex flex-col gap-2 w-full mt-2 mb-4 md:mb-6">
                    <label
                        htmlFor="order-review"
                        className="text-[11px] sm:text-[12px] font-semibold tracking-wider text-gold-500 uppercase font-hanken"
                    >
                        LEAVE A REVIEW
                    </label>
                    <textarea
                        id="order-review"
                        rows={4}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Enter your review......"
                        className="w-full bg-black-900  rounded-lg p-3.5 text-sm text-white placeholder:text-black-200 focus:outline-none focus:border-gold-500 transition-colors resize-none h-32"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-6 w-full">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full h-10 md:h-12 bg-gold-g hover:opacity-95 text-black font-semibold text-sm sm:text-base py-3.5 px-6 rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center "
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>

                    <button
                        type="button"
                        onClick={handleTrackOrderClick}
                        className="w-full h-10  md:h-12 border border-white bg-transparent text-white hover:bg-white/20 font-semibold text-sm sm:text-base py-3 px-6 rounded-sm transition-all cursor-pointer "
                    >
                        Track Order
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OrderSuccessModal;
