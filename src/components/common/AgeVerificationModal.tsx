import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { topFlourishOrnament } from "@/lib/site_data";
import { motion, AnimatePresence } from "framer-motion";

const AGE_VERIFIED_KEY = "roseiy_age_verified";

export const AgeVerificationModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const isVerifiedLocal = localStorage.getItem(AGE_VERIFIED_KEY);
        const isVerifiedCookie = Cookies.get(AGE_VERIFIED_KEY);

        if (isVerifiedLocal !== "true" && isVerifiedCookie !== "true") {
            setIsOpen(true);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleAccept = () => {
        localStorage.setItem(AGE_VERIFIED_KEY, "true");
        Cookies.set(AGE_VERIFIED_KEY, "true", { expires: 365 });
        setIsOpen(false);
    };

    const handleDecline = () => {
        window.location.href = "https://www.google.com";
    };

    // const handleRedirectExit = () => {
    //     window.location.href = "https://www.google.com";
    // };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Dark Blurred Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/85 backdrop-blur-md"
                    />

                    {/* Modal Content Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative z-10 bg-black-700 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 max-w-[624px] w-full shadow-2xl flex flex-col items-center text-center"
                    >
                        {/* Decorative Top Flourish */}
                        <div className="w-full flex justify-center mb-1">
                            <img
                                src={
                                    topFlourishOrnament ||
                                    "/icon/titleDivider.svg"
                                }
                                alt="Decorative flourish"
                                className="w-full max-w-44 sm:max-w-56 h-auto object-contain opacity-90"
                            />
                        </div>

                        <>
                            {/* Heading */}
                            <h2 className="text-2xl sm:text-[2.4375rem] font-playfair font-bold text-white tracking-tight mt-1">
                                Welcome to Roseiy Emporium
                            </h2>

                            {/* Description */}
                            <p className="text-xs sm:text-[1.25rem] font-hanken text-neutral-300 leading-relaxed mt-3 max-w-xs sm:max-w-[31.75rem]">
                                Roseiy Emporium offers premium alcoholic
                                beverages. To enter Roseiy Emporium, please
                                confirm that you are{" "}
                                <span className="font-bold text-white">
                                    18 years of age or older.
                                </span>
                            </p>

                            {/* Buttons Container */}
                            <div className="flex flex-col gap-3 w-full mt-6">
                                {/* Primary Button */}
                                <button
                                    type="button"
                                    onClick={handleAccept}
                                    className="w-full py-3 sm:py-3.5 bg-gold-g hover:opacity-95 text-black font-semibold font-hanken text-xs sm:text-base rounded-sm transition-all shadow-md cursor-pointer"
                                >
                                    Yes, I'm 18 or Older
                                </button>

                                {/* Secondary Button */}
                                <button
                                    type="button"
                                    onClick={handleDecline}
                                    className="w-full py-3 sm:py-3.5 bg-transparent border border-neutral-700 hover:border-gold-500 text-white font-semibold font-hanken text-xs sm:text-base rounded-sm transition-all cursor-pointer"
                                >
                                    No, Exit
                                </button>
                            </div>

                            {/* Footnote */}
                            <p className="text-[0.8125rem] italic text-gold-400/90 font-playfair mt-4">
                                Please enjoy responsibly.
                            </p>
                        </>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AgeVerificationModal;
