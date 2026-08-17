import React from "react";
import { topFlourishOrnament } from "@/lib/site_data";

export interface AuthHeaderProps {
    title: string;
    subtitle?: React.ReactNode;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col items-center text-center w-full max-w-xl mx-auto px-4">
            {/* Gold Flourish Ornament Header */}
            <div className="w-full flex justify-center mb-1">
                <img
                    src={topFlourishOrnament || "/icon/titleDivider.svg"}
                    alt="Decorative flourish"
                    className="w-full max-w-55 sm:max-w-65 md:max-w-[26.3125rem] h-auto object-contain opacity-90"
                />
            </div>

            {/* Main Header Title */}
            <h1 className="text-2xl sm:text-3xl md:text-[2.75rem] font-playfair font-bold text-white tracking-tight leading-tight">
                {title}
            </h1>

            {/* Subtitle Description */}
            {subtitle && (
                <div className="text-xs sm:text-sm md:text-base text-neutral-300 font-hanken mt-2 leading-relaxed">
                    {subtitle}
                </div>
            )}
        </div>
    );
};

export default AuthHeader;
