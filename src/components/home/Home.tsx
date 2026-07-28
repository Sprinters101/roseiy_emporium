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

const Home = () => {
    return (
        <div>
            <Hero />
            <div className="relative">
                <img
                    src="/icon/sideDrink.png"
                    // src="/icon/sideDrink.svg"
                    alt="side drinks"
                    className="block h-39 max-h-149.5 md:max-h-[598px]  h-full  absolute -left-3 md:-left-1 top-60 md:top-38.25 z-0"
                />
                <BrandBanner />
                <CategoryGrid />
            </div>
            <div className="relative">
                <img
                    src="/icon/sideGlass.png"
                    // src="/icon/sideDrink.svg"
                    alt="side drinks"
                    className="absolute max-h-[295px] -top-28 -right-10 md:max-h-[708px] md:-right-1 z-0"
                />
                <SignatureSelections />
            </div>
            <RoseiyDifference />
            {/* <IconicBrands /> */}
            <BestSellers />
            <AboutSection />
            <TestimonialsSection />
            <FaqSection />
            <ContactSection />
        </div>
    );
};

export default Home;
