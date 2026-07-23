import { Link } from "react-router";
import {
    badgeOrnament,
    categoryHeaderDivider,
    champagneImg,
    sweetwineImg,
    whiskeyImg,
    cognacImg,
    tequilaImg,
    rumImg,
} from "@/lib/site_data";
import Container from "../common/Container";
import TitleDecoration from "../common/TitleDecoration";
import { Button } from "../ui/button";

interface CategoryCardProps {
    title: string;
    image: string;
    href: string;
}

const CategoryCard = ({ title, image, href }: CategoryCardProps) => {
    return (
        <Link
            to={href}
            className={`group max-w-81.5 md:max-w-full mx-auto relative w-full h-118.25 sm:h-133.25 rounded-lg overflow-hidden border border-white/10 flex flex-col justify-between  p-6 transition-all duration-300 hover:border-gold-300/50 hover:shadow-2xl hover:shadow-gold-500/10`}
        >
            {/* Category Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out grousp-hover:scale-105 group-hover:blur-[7px]"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-black/60 transition-opacity duration-300 group-hover:from-black/70 group-hover:to-black/80" />
            </div>

            {/* Top Category Title Block with Gold Ornament Header */}
            <div className="relative z-10 flex flex-col items-center text-center mt-4 space-y-2">
                <img
                    src={categoryHeaderDivider}
                    alt=""
                    className="w-full h-7.75 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <h3 className="text-white font-playfair text-hg-b2 font-normal tracking-wide drop-shadow-md gradient-text">
                    {title}
                </h3>
            </div>

            {/* Bottom Action Area (Reveals/Highlights 'Shop Now' CTA) */}
            <Button className="relative px-10 rounded-sm py-3.5 h-11 mx-auto z-10 border border-white w-fit gap-10 group-hover:flex justify-center  transition-all duration-300 mb-2 hidden backdrop-blur-xl cursor-pointer">
                Shop Now
            </Button>
        </Link>
    );
};

export const CategoryGrid = () => {
    const categories = [
        {
            title: "Champagne",
            image: champagneImg,
            href: "/catalog?category=champagne",
        },
        {
            title: "Sweetwine",
            image: sweetwineImg,
            href: "/catalog?category=sweetwine",
        },
        {
            title: "Whiskey",
            image: whiskeyImg,
            href: "/catalog?category=whiskey",
        },
        { title: "Cognac", image: cognacImg, href: "/catalog?category=cognac" },
        {
            title: "Tequila",
            image: tequilaImg,
            href: "/catalog?category=tequila",
        },
        { title: "Rum", image: rumImg, href: "/catalog?category=rum" },
    ];

    return (
        <section className="w-full bg-black-900 pt-16 md:pt-24">
            <Container className="flex flex-col items-center ">
                <div className="max-w-288.5 mx-auto">
                    {/* Section Title Header */}
                    <TitleDecoration title="Explore Our Collection" />
                    <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair">
                        A Collection for Every Taste
                    </h2>
                    <p className=" mt-2 md:mt-4 text-body-c1 md:text-body-b2 max-w-160.5 text-center mx-auto">
                        From celebratory champagnes to timeless whiskies,
                        discover a carefully curated selection from the world's
                        most respected producers.
                    </p>
                    {/* 3-Column Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-9.25 w-full mt-8 md:mt-16">
                        {categories.map((cat) => (
                            <CategoryCard
                                key={cat.title}
                                title={cat.title}
                                image={cat.image}
                                href={cat.href}
                            />
                        ))}
                    </div>

                    {/* Bottom Center CTA Action */}
                    <div className="mt-12 md:mt-16 flex justify-center">
                        <Link
                            to="/catalog"
                            className="inline-block px-12 py-3.5 bg-gold-g text-black-900 h-10 md:h-12 font-hanken font-bold text-body-b3 rounded-md tracking-wider shadow-xl hover:opacity-95 transition-all active:scale-[0.98] w-full max-w-62 md:max-w-68 text-center"
                        >
                            View All
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
};
