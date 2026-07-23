import { BrandBanner } from "./BrandBanner";
import { CategoryGrid } from "./CategoryGrid";
import { Hero } from "./Hero";
import { IconicBrands } from "./IconicBrands";
import { RoseiyDifference } from "./RoseiyDifference";
import { SignatureSelections } from "./SignatureSelections";

const Home = () => {
    return (
        <div>
            <Hero />
            <BrandBanner />
            <CategoryGrid />
            <SignatureSelections />
            <RoseiyDifference />
            <IconicBrands />
        </div>
    );
};

export default Home;
