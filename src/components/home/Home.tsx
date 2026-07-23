import { BrandBanner } from "./BrandBanner";
import { CategoryGrid } from "./CategoryGrid";
import { Hero } from "./Hero";
import { SignatureSelections } from "./SignatureSelections";

const Home = () => {
    return (
        <div>
            <Hero />
            <BrandBanner />
            <CategoryGrid />
            <SignatureSelections />
        </div>
    );
};

export default Home;
