import {
    hennessyLogo,
    chamdorLogo,
    evaLogo,
    johnnieWalkerLogo,
    brandDivider,
    topFlourishOrnament,
} from "@/lib/site_data";

export const BrandBanner = () => {
    const brandLogos = [
        { name: "Hennessy", src: hennessyLogo },
        { name: "Chamdor", src: chamdorLogo },
        // { name: "Eva", src: evaLogo },
        { name: "Johnnie Walker", src: johnnieWalkerLogo },
    ];

    // Double the array to guarantee seamless looping without jumps
    const marqueeBrands = [...brandLogos, ...brandLogos];

    return (
        <section className="w-full bg-black-900  pt-4 overflow-hidden">
            <div className="container mx-auto max-w-6xl relative flex flex-col items-center">
                {/* Top Ornamental Gold Divider Header */}
                <div className="w-full flex justify-center items-center relative mb-1">
                    <img
                        src={topFlourishOrnament}
                        alt=""
                        className="w-full max-w-4xl h-auto object-contain"
                    />
                </div>

                {/* Infinite Marquee Track Container */}
                <div className="w-full overflow-hidden mask-gradient-x max-w-245.25 mx-auto relative ">
                    {/* Left Edge Fade / Shadow Overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-linear-to-r from-black-900 to-transparent" />

                    {/* Right Edge Fade / Shadow Overlay */}
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-linear-to-l from-black-900 to-transparent" />

                    <div className="flex items-center w-max animate-marquee space-x-8 hover:paused">
                        {marqueeBrands.map((brand, index) => (
                            <div
                                key={`${brand.name}-${index}`}
                                className="flex items-center gap-8 shrink-0"
                            >
                                {/* Brand Logo Container */}
                                <div className="h-13.75 md:h-26.75 flex items-center justify-center px-4 opacity-80 hover:opacity-100 transition-opacity">
                                    <img
                                        src={brand.src}
                                        alt={brand.name}
                                        className="max-h-full w-auto object-contain"
                                    />
                                </div>

                                {/* Gold Starburst Separator Asset */}
                                <img
                                    src={brandDivider}
                                    alt="golden section"
                                    className="h-6 w-6 md:h-12 md:w-12 object-contain shrink-0"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Ornamental Gold Divider Footer */}
                <div className="w-full flex justify-center items-center relative mt-1">
                    <img
                        src={topFlourishOrnament}
                        alt="global section"
                        className="w-full max-w-4xl h-auto object-contain rotate-180"
                    />
                </div>
            </div>
        </section>
    );
};
