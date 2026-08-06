import Container from "@/components/common/Container";
import { heroBg, heroBg2, topFlourishOrnament } from "@/lib/site_data";
import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <section className="relative w-full max-h-[491px]  h-[491px] bg-black-900 flex items-center justify-center overflow-hidden ">
            {/* Background Texture & Golden Wheat Hills Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
                {/* Dark Marble Texture Overlay */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <img
                        src={heroBg}
                        alt="Premium selection background"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                {/* Bottom Rolling Golden Fields Asset */}
                <img
                    src={heroBg2}
                    alt="Golden landscape"
                    className="absolute bottom-0 left-0 w-full h-auto object-cover object-bottom opacity-95"
                />

                {/* Subtle Radial Gradient Vignette for Depth */}
                <div className="absolute inset-0 bg-radial-[at_center] from-transparent via-black-900/30 to-black-900/80" />
            </div>
            {/* Central Content Deck */}
            <Container className="relative z-10 flex flex-col items-center text-center">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    {/* Header Title with Ornamental Gold Flourish */}
                    <motion.div
                        initial={{ opacity: 0, y: -25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1.1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col items-center w-full"
                    >
                        {/* Center Gold Flourish & Divider Line */}
                        <div className="w-full max-w-lg mb-4 sm:mb-6 flex justify-center items-center">
                            <img
                                src={
                                    topFlourishOrnament ||
                                    "/icon/titleDivider.svg"
                                }
                                alt=""
                                className="w-full max-w-xs sm:max-w-md h-auto object-contain opacity-90"
                            />
                        </div>

                        {/* Main Banner Heading */}
                        <h1 className="text-white font-playfair text-4xl  md:text-[49px] font-bold tracking-tight leading-none drop-shadow-xl">
                            Shop Our Collection
                        </h1>
                    </motion.div>

                    {/* Subtitle Copy */}
                    <p className="mt-4 sm:mt-6 text-ivory-600 font-hanken text-base  max-w-lg md:max-w-[460px] leading-relaxed drop-shadow-md">
                        Discover the world’s finest champagnes, wines and
                        spirits from iconic brands and rare selections
                    </p>
                </div>
            </Container>
        </section>
    );
};
