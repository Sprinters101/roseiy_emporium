import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { categoryHeaderDivider } from "@/lib/site_data";

// Custom inline SVG icons matching the thin gold stroke design in the image
const BottleGlassIcon = () => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold-300"
    >
        {/* Bottle */}
        <path
            d="M18 10V14C18 16 14 18 14 22V38C14 40.2091 15.7909 42 18 42H26C28.2091 42 30 40.2091 30 38V22C30 18 26 16 26 14V10H18Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20 10H24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        {/* Glass */}
        <path
            d="M32 26C32 29.3137 34.6863 32 38 32C41.3137 32 44 29.3137 44 26V20H32V26Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M38 32V42"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        <path
            d="M34 42H42"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold-300"
    >
        <path
            d="M24 6L38 12V22C38 31.5 32 39.5 24 42C16 39.5 10 31.5 10 22V12L24 6Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M18 23L22 27L30 19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const DeliveryTruckIcon = () => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold-300"
    >
        {/* Motion lines */}
        <path
            d="M6 16H14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        <path
            d="M4 22H10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        <path
            d="M6 28H12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        {/* Truck body */}
        <path
            d="M16 16H32V32H16V16Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M32 20H38L42 25V32H32V20Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* Wheels */}
        <circle cx="21" cy="35" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="37" cy="35" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

export const RoseiyDifference = () => {
    const features = [
        {
            imgUrl: "/icon/wineglass.svg",
            title: "Curated Selection",
            description:
                "Only the world’s finest champagnes, wines, spirits and rare collections",
        },
        {
            imgUrl: "/icon/d_2.svg",
            title: "Guaranteed Authenticity",
            description:
                "Every bottle is sourced through trusted distribution to ensure genuine quality",
        },
        {
            imgUrl: "/icon/d_3.svg",
            title: "Secure Delivery",
            description:
                "Professionally packaged and delivered with the care premium beverages deserve",
        },
    ];

    return (
        <section className="w-full bg-black-800 py-16 md:py-24 border-t border-white/5">
            <Container className="flex flex-col items-center">
                <div className="w-full max-w-300 mx-auto">
                    {/* Section Header */}
                    <div className="flex flex-col items-center text-center">
                        <TitleDecoration title="The Roseiy Difference" />

                        <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-2xl leading-tight">
                            Why Discerning <br className="md:hidden" />{" "}
                            Customers Choose Roseiy
                        </h2>

                        <p className="mt-3 md:mt-4 text-body-c1 md:text-body-b2 max-w-81.75 md:max-w-171 text-center text-neutral-300 font-hanken font-light">
                            Every bottle in our collection is carefully sourced,
                            expertly handled, and selected to deliver an
                            exceptional experience from purchase to pour.
                        </p>
                    </div>

                    {/* 3-Column Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 w-full mt-8 md:mt-20">
                        {features.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center  "
                            >
                                {/* Gold Icon */}
                                <div className="h-14 md:h-25 flex items-center justify-center ">
                                    <img
                                        src={item.imgUrl}
                                        alt={item?.title}
                                        className="w-full h-full"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-white mt-2 font-playfair text-[1.25rem] md:text-[31px] font-bold tracking-wide">
                                    {item.title}
                                </h3>

                                {/* Gold Flourish Underline */}
                                <div className="w-full max-w-xs pt-1 pb-2">
                                    <img
                                        src={categoryHeaderDivider}
                                        alt="divider"
                                        className="w-full h-5.5 object-contain opacity-70 mx-auto"
                                        style={{
                                            filter: "brightness(0) invert(1)",
                                        }}
                                    />
                                </div>

                                {/* Description */}
                                <p className="text-white max-w-66.25 mt-1 font-hanken text-body-c1 md:text-body-b3 font-light leading-relaxed">
                                    {item?.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};
