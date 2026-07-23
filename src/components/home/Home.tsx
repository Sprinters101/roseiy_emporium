import { BrandBanner } from "./BrandBanner";
import { CategoryGrid } from "./CategoryGrid";
import { Hero } from "./Hero";

const Home = () => {
    return (
        <div>
            <Hero />
            <BrandBanner />
            <CategoryGrid />
        </div>
    );
};

export default Home;
