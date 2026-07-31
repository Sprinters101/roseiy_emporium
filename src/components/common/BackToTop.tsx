import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            if (currentScrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            if (scrollHeight > 0) {
                const progress = Math.min(
                    100,
                    Math.max(0, (currentScrollY / scrollHeight) * 100)
                );
                setScrollProgress(progress);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
        circumference - (scrollProgress / 100) * circumference;

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className={`fixed bottom-6 left-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-black-900/85 border border-gold-500/40 text-gold-400 backdrop-blur-md shadow-lg shadow-black/60 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gold-500 hover:text-black-900 hover:border-gold-400 hover:shadow-gold-500/30 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black-900 group ${
                isVisible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
            }`}
        >
            <svg
                className="absolute w-full h-full -rotate-90 pointer-events-none"
                viewBox="0 0 48 48"
            >
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    className="stroke-gold-500/20"
                    strokeWidth="2.5"
                    fill="transparent"
                />
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    className="stroke-gold-400 transition-all duration-150 ease-out"
                    strokeWidth="2.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                />
            </svg>
            <ChevronUp className="w-5 h-5 relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </button>
    );
};
