import { Link } from "react-router";
import {
    heroBg,
    decorativeDivider,
    badgeOrnament,
    heroBg2,
} from "@/lib/site_data";
import Container from "../common/Container";

export const Hero = () => {
    return (
        <section className="relative w-full  min-h-150  bg-black-900 overflow-hidden ">
            <div className="flex flex-col justify-between ">
                {/* Background Image Layer */}
                <div className="absolute inset-0 w-full h-full  pointer-events-none z-0">
                    <img
                        src={heroBg}
                        alt="Premium selection background"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Subtle dark overlay to ensure high contrast for text */}
                    {/* <div className="absolute inset-0 bg-black-900/20" /> */}
                </div>

                {/* Content Layer Container */}
                <Container className="  w-full relative z-20 pt-12 md:pt-46.75 flex-1 flex  justify-between items-center  gap-12 lg:gap-0">
                    {/* Top Section: Heading Title & Decorative Tag */}
                    <div className="w-full max-w-4xl space-y-4 md:space-y-6">
                        {/* Premium Tag Capsule */}
                        <div
                            className="inline-flex items-center gap-3 bg-white/10  border border-[#FEFEFE33] rounded-lg px-5 py-2"
                            style={{
                                backdropFilter: "blur(6px)",
                            }}
                        >
                            <img
                                src={badgeOrnament}
                                alt=""
                                className="h-[17px] w-auto object-contain opacity-70"
                            />
                            <span className="text-body-c1 md:text-hg-c1 tracking-[0.15em] font-medium text-white ">
                                Premium Beverages
                            </span>
                            <img
                                src={badgeOrnament}
                                alt=""
                                className="h-[17px] w-auto object-contain scale-x-[-1] opacity-70"
                            />
                        </div>

                        {/* Main H1 Design Header */}
                        <div className="relative">
                            <h1 className="text-white font-playfair font-bold tracking-wide leading-[1.1] text-4xl sm:text-6xl md:text-7xl lg:text-hg-h1">
                                Curated for <br />
                                <span className="gradient-text font-playfair">
                                    Exceptional
                                </span>{" "}
                                Taste.
                            </h1>

                            {/* Elegant Flourish Underline Ornament */}
                            <div className="mt-4 md:mt-6 max-w-xs sm:max-w-sm">
                                <img
                                    src={decorativeDivider}
                                    alt=""
                                    className="w-full h-auto object-contain opacity-80"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Right-aligned Description & Call to Actions */}
                    <div className="w-full max-w-105 ">
                        <div className="max-w-md space-y-6 md:space-y-8 text-left lg:text-left">
                            <p className="text-body-c2 md:text-body-b3 text-ivory-300 font-hanken font-light leading-relaxed tracking-wide">
                                Discover authentic champagnes, fine wines, and
                                premium spirits thoughtfully selected to elevate
                                every celebration, milestone, and unforgettable
                                occasion.
                            </p>

                            {/* CTA Action Deck */}
                            <div className="flex flex items-center gap-4">
                                <Link
                                    to="/catalog"
                                    className="px-8 py-3.5 bg-gold-gradient text-black-900 font-hanken font-bold text-body-c1 rounded-md tracking-wider w-full text-center shadow-lg hover:opacity-95 transition-opacity active:scale-[0.99]"
                                >
                                    Shop Collection
                                </Link>

                                <Link
                                    to="/categories"
                                    className="px-8 py-3.5 bg-transparent border border-white text-white font-hanken font-medium text-body-c1 rounded-md w-full  text-center tracking-wider hover:bg-white/10 transition-colors active:scale-[0.99]"
                                >
                                    Explore Categories
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="w-full max-w-[1520px] mx-auto h-full ">
                <img
                    src={heroBg2}
                    alt="Premium selection background"
                    className="w-full h-full relative max-h-[913px] -mt-55 object-cover object-center z-10"
                />
            </div>
        </section>
    );
};
