import { AboutSection } from "./AboutSection";
import { BestSellers } from "./BestSellers";
import { BrandBanner } from "./BrandBanner";
import { CategoryGrid } from "./CategoryGrid";
import { ContactSection } from "./ContactSection";
import { FaqSection } from "./FaqSection";
import { Hero } from "./Hero";
import { IconicBrands } from "./IconicBrands";
import { RoseiyDifference } from "./RoseiyDifference";
import { SignatureSelections } from "./SignatureSelections";
import { TestimonialsSection } from "./TestimonialsSection";
import { motion } from "framer-motion";
const Home = () => {
    return (
        <div className="relative overflow-hidden">
            <Hero />
            <div className="relative">
                {/* <img
                    src="/icon/sideDrink.png"
                    // src="/icon/sideDrink.svg"
                    alt="side drinks"
                    className="block h-39 max-h-149.5 md:max-h-149.5  md:h-full  absolute -left-3 md:-left-1 top-60 md:top-38.25 z-0"
                /> */}

                <motion.img
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                        duration: 2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    src="/icon/sideDrink.png"
                    // src="/icon/sideDrink.svg"
                    alt="side drinks"
                    className="block h-39 max-h-149.5 md:max-h-149.5 md:h-full absolute -left-3 md:-left-1 top-60 md:top-38.25 z-0"
                />
                <BrandBanner />
                <CategoryGrid />
            </div>
            <div className="relative">
                <motion.img
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                        duration: 2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    // src="/icon/sideDrink.png"
                    src="/icon/sideGlass.png"
                    // src="/icon/sideDrink.svg"
                    alt="side drinks"
                    className="absolute max-h-73.75 -top-28 -right-10 md:max-h-177 md:-right-1 z-0"
                />
                <SignatureSelections />
            </div>
            <RoseiyDifference />
            <div className="relative">
                <motion.img
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                        duration: 2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    // src="/icon/sideDrink.png"
                    // src="/icon/sideDrink.svg"
                    alt="side drinks"
                    src="/icon/glassCup.png"
                    // src="/icon/sideDrink.svg"
                    // alt="side drinks"
                    className="absolute max-h-45.75 -top-12 md:-top-52 -left-4 md:max-h-152 md:-left-1 z-0"
                />

                <IconicBrands />
            </div>
            <BestSellers />
            <AboutSection />
            <TestimonialsSection />
            <FaqSection />
            <ContactSection />
        </div>
    );
};

export default Home;
