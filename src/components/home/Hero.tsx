import { Link } from "react-router";
import { motion } from "framer-motion";
import { heroBg, badgeOrnament, heroBg2, heroBgMobile } from "@/lib/site_data";
import Container from "../common/Container";

export const Hero = () => {
    return (
        <section className="relative w-full min-h-150 bg-black-900 overflow-hidden">
            <div className="flex flex-col justify-between">
                {/* Background Image Layer */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <img
                        src={heroBg}
                        alt="Premium selection background"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                {/* Content Layer Container */}
                <Container className="w-full relative z-20 pt-28.5 md:pt-46.75 flex-1 flex md:flex-row flex-col justify-between items-center gap-2 md:gap-3 lg:gap-0">
                    {/* Top/Left Section: Heading Title & Decorative Tag */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full md:w-full max-w-4xl md:space-y-6"
                    >
                        {/* Premium Tag Capsule */}
                        <div
                            className="inline-flex items-center gap-1 bg-white/10 border border-[#FEFEFE33] rounded-lg px-1 md:px-5 py-1 md:py-2"
                            style={{ backdropFilter: "blur(6px)" }}
                        >
                            <img
                                src={badgeOrnament}
                                alt=""
                                className="h-4.25 w-auto object-contain opacity-70"
                            />
                            <span className="text-[0.625rem] font-playfair md:text-hg-c1 tracking-[0.15em] font-medium text-white">
                                Premium Beverages
                            </span>
                            <img
                                src={badgeOrnament}
                                alt=""
                                className="h-[17px] w-auto object-contain scale-x-[-1] opacity-70"
                            />
                        </div>

                        {/* Main H1 Design Header */}
                        <div className="relative mt-2 md:mt-0">
                            <h1 className="text-white font-playfair font-bold tracking-wide leading-[1.1] text-4xl sm:text-6xl md:text-7xl lg:text-hg-h1">
                                Curated for <br />
                                <span className="gradient-text font-playfair">
                                    Exceptional
                                </span>{" "}
                                Taste.
                            </h1>

                            {/* Elegant Flourish Underline Ornament */}
                            {/* <div className="mt-4 md:mt-6 max-w-xs sm:max-w-sm">
                                <img
                                    src={decorativeDivider}
                                    alt=""
                                    className="w-full h-auto object-contain opacity-80"
                                />
                            </div> */}
                        </div>
                    </motion.div>

                    {/* Bottom/Right Section: Description & CTAs */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full md:max-w-105"
                    >
                        <div className="max-w-md space-y-6 md:space-y-8 text-left lg:text-left">
                            <p className="text-body-c2 sm:text-body-c1 lg:text-body-b3 text-ivory-300 font-hanken font-light leading-relaxed tracking-wide">
                                Discover authentic champagnes, fine wines, and
                                premium spirits thoughtfully selected to elevate
                                every celebration, milestone, and unforgettable
                                occasion.
                            </p>

                            {/* CTA Action Deck */}
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/shop"
                                    className="md:px-8 px-4 py-3.5 bg-gold-gradient text-black-900 font-hanken font-bold text-body-c1 rounded-md tracking-wider w-full text-center shadow-lg hover:opacity-95 transition-opacity active:scale-[0.99]"
                                >
                                    Shop Collection
                                </Link>

                                <Link
                                    to="/categories"
                                    className="md:px-8 px-4 py-3.5 bg-transparent border border-white text-white font-hanken font-medium text-body-c1 rounded-md w-full text-center tracking-wider hover:bg-white/10 transition-colors active:scale-[0.99]"
                                >
                                    Explore Categories
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </div>

            {/* Background Product Banner */}
            <motion.div
                initial={{ x: 120, y: 120, opacity: 0, scale: 0.9 }}
                whileInView={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{
                    duration: 1.4,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full max-w-380 mx-auto h-full"
            >
                <img
                    src={heroBg2}
                    alt="Premium selection background"
                    className="w-full h-full relative max-h-228.25 -mt-55 object-cover object-center z-10 hidden md:block"
                />

                <img
                    src={heroBgMobile}
                    alt="Premium selection background"
                    className="w-full h-full relative max-h-100 object-cover object-center z-10 md:hidden"
                />
            </motion.div>
        </section>
    );
};
