import { AboutSection } from "./AboutSection";
import { BestSellers } from "./BestSellers";
import { BrandBanner } from "./BrandBanner";
import { CategoryGrid } from "./CategoryGrid";
import { Hero } from "./Hero";
import { IconicBrands } from "./IconicBrands";
import { RoseiyDifference } from "./RoseiyDifference";
import { SignatureSelections } from "./SignatureSelections";
import { TestimonialsSection } from "./TestimonialsSection";

const Home = () => {
    return (
        <div>
            <Hero />
            <BrandBanner />
            <CategoryGrid />
            <SignatureSelections />
            <RoseiyDifference />
            <IconicBrands />
            <BestSellers />
            <AboutSection />
            <TestimonialsSection />
        </div>
    );
};

export default Home;
