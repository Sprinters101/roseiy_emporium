// import { Link } from "react-router";
// import Container from "@/components/common/Container";
// import TitleDecoration from "@/components/common/TitleDecoration";
// import { Button } from "@/components/ui/button";
// import {
//     brandDivider,
//     categoryHeaderDivider,
//     glenfiddichLogo,
//     domPerignonLogo,
//     veuveClicquotLogo,
//     moetLogo,
//     hennessyLogo,
//     donJulioLogo,
//     claseAzulLogo,
//     tequilaLogo,
// } from "@/lib/site_data";
// import { cn } from "@/lib/utils";

// interface BrandItem {
//     name: string;
//     logo: string;
//     href: string;
//     showMobile: boolean;
// }

// export const IconicBrands = () => {
//     // Top Row Brands
//     const topRowBrands: BrandItem[] = [
//         {
//             name: "Glenfiddich",
//             logo: glenfiddichLogo,
//             href: "/catalog?brand=glenfiddich",
//             showMobile: true,
//         },
//         {
//             name: "Dom Pérignon",
//             logo: domPerignonLogo,
//             href: "/catalog?brand=dom-perignon",
//             showMobile: false,
//         },
//         {
//             name: "Veuve Clicquot",
//             logo: veuveClicquotLogo,
//             href: "/catalog?brand=veuve-clicquot",
//             showMobile: true,
//         },
//         {
//             name: "Moët & Chandon",
//             logo: moetLogo,
//             href: "/catalog?brand=moet-chandon",
//             showMobile: false,
//         },
//     ];

//     // Bottom Row Brands
//     const bottomRowBrands: BrandItem[] = [
//         {
//             name: "Hennessy",
//             logo: hennessyLogo,
//             href: "/catalog?brand=hennessy",
//             showMobile: true,
//         },
//         {
//             name: "Don Julio",
//             logo: donJulioLogo,
//             href: "/catalog?brand=don-julio",
//             showMobile: false,
//         },
//         {
//             name: "Clase Azul",
//             logo: claseAzulLogo,
//             href: "/catalog?brand=clase-azul",
//             showMobile: true,
//         },
//         {
//             name: "Tequila ",
//             logo: tequilaLogo,
//             href: "/catalog?brand=tequila",
//             showMobile: false,
//         },
//     ];

//     const renderBrandRow = (brands: BrandItem[]) => (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 w-full ">
//             {brands?.map((brand, i) => {
//                 const index = i;
//                 console.log(index % 2);

//                 return (
//                     <div
//                         key={brand.name}
//                         className="flex items-center justify-center gap-0 md:gap-12"
//                     >
//                         {/* Brand Card with Hover States */}
//                         <div className="group relative flex flex-col items-center justify-center p-4 ">
//                             {/* Logo Asset */}
//                             <div className="min-h-17.5 md:min-h-26.75 max-w-20.5 md:max-w-full  flex items-end justify-center">
//                                 <img
//                                     src={brand?.logo}
//                                     alt={brand?.name}
//                                     className="max-h-auto w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
//                                 />
//                             </div>

//                             <div className=" flex flex-col items-center justify-center bg-black-900/90 backdrop-blur-xs  transition-opacity duration-300 rounded-md py-2">
//                                 <img
//                                     src={categoryHeaderDivider}
//                                     alt=""
//                                     className="w-auto max-w-full h-4 object-contain mb-2 brightness-0 invert group-hover:invert-0 group-hover:brightness-100"
//                                 />
//                                 <Link
//                                     to={brand.href}
//                                     className="opacity-0 group-hover:opacity-100 min-h-7.75"
//                                 >
//                                     <Button className=" px-4 text-[0.8125rem] font-hanken bg-white/10 rounded-sm h-7 md:h-11 border border-neutral-700 text-white hover:bg-gold-gradient  transition-all cursor-pointer">
//                                         Explore Collection
//                                     </Button>
//                                 </Link>
//                             </div>
//                         </div>

//                         {/* Gold Starburst Separator */}
//                         {index < brands.length - 1 && (
//                             <img
//                                 src={brandDivider}
//                                 alt="divider"
//                                 className={cn(
//                                     "h-6 w-6 md:h-8 md:w-8 object-contain md:shrink-0 hidden",
//                                     brand.showMobile
//                                         ? "block"
//                                         : "hidden md:block",
//                                 )}
//                             />
//                         )}
//                     </div>
//                 );
//             })}
//         </div>
//     );

//     return (
//         <section className="w-full bg-black-900 py-16 md:py-24 border-t border-white/5 ">
//             <Container className="flex flex-col items-center">
//                 <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
//                     {/* Section Header */}
//                     <TitleDecoration title="Our Iconic Brands" />
//                     <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair max-w-147.5">
//                         Iconic Brands, Timeless Craftsmanship
//                     </h2>

//                     {/* Brand Showcase Grid */}
//                     <div className="w-full mt-10 md:mt-16 flex flex-col items-center">
//                         {renderBrandRow(topRowBrands)}
//                         {renderBrandRow(bottomRowBrands)}
//                     </div>

//                     {/* Bottom CTA Action Button */}
//                     <div className="mt-12 md:mt-16 flex justify-center w-full">
//                         <Link
//                             to="/catalog"
//                             className="flex items-center justify-center px-12 md:py-3.5 bg-gold-g text-black-900 h-10 md:h-12 font-hanken font-bold text-body-b3 rounded-md tracking-wider shadow-xl hover:opacity-95 transition-all active:scale-[0.98] w-full max-w-62 md:max-w-68 text-center"
//                         >
//                             View All
//                         </Link>
//                     </div>
//                 </div>
//             </Container>
//         </section>
//     );
// };

import { Link } from "react-router";
import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { Button } from "@/components/ui/button";
import {
    brandDivider,
    categoryHeaderDivider,
    glenfiddichLogo,
    domPerignonLogo,
    veuveClicquotLogo,
    moetLogo,
    hennessyLogo,
    donJulioLogo,
    claseAzulLogo,
    tequilaLogo,
} from "@/lib/site_data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BrandItem {
    name: string;
    logo: string;
    href: string;
    showMobile: boolean;
}

export const IconicBrands = () => {
    // Top Row Brands
    const topRowBrands: BrandItem[] = [
        {
            name: "Glenfiddich",
            logo: glenfiddichLogo,
            href: "/catalog?brand=glenfiddich",
            showMobile: true,
        },
        {
            name: "Dom Pérignon",
            logo: domPerignonLogo,
            href: "/catalog?brand=dom-perignon",
            showMobile: false,
        },
        {
            name: "Veuve Clicquot",
            logo: veuveClicquotLogo,
            href: "/catalog?brand=veuve-clicquot",
            showMobile: true,
        },
        {
            name: "Moët & Chandon",
            logo: moetLogo,
            href: "/catalog?brand=moet-chandon",
            showMobile: false,
        },
    ];

    // Bottom Row Brands
    const bottomRowBrands: BrandItem[] = [
        {
            name: "Hennessy",
            logo: hennessyLogo,
            href: "/catalog?brand=hennessy",
            showMobile: true,
        },
        {
            name: "Don Julio",
            logo: donJulioLogo,
            href: "/catalog?brand=don-julio",
            showMobile: false,
        },
        {
            name: "Clase Azul",
            logo: claseAzulLogo,
            href: "/catalog?brand=clase-azul",
            showMobile: true,
        },
        {
            name: "Tequila ",
            logo: tequilaLogo,
            href: "/catalog?brand=tequila",
            showMobile: false,
        },
    ];

    const renderBrandRow = (brands: BrandItem[]) => (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 w-full ">
            {brands?.map((brand, i) => {
                const index = i;

                return (
                    <motion.div
                        key={brand.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2 + index * 0.15, // Staggers left-to-right
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex items-center justify-center gap-0 md:gap-12"
                    >
                        {/* Brand Card with Hover States */}
                        <div className="group relative flex flex-col items-center justify-center p-4 ">
                            {/* Logo Asset */}
                            <div className="min-h-17.5 md:min-h-26.75 max-w-20.5 md:max-w-full  flex items-end justify-center">
                                <img
                                    src={brand?.logo}
                                    alt={brand?.name}
                                    className="max-h-auto w-full object-contain  transition-opacity duration-300"
                                />
                            </div>

                            <div className=" flex flex-col items-center justify-center bg-black-900/90 backdrop-blur-xs  transition-opacity duration-300 rounded-md py-2">
                                <img
                                    src={categoryHeaderDivider}
                                    alt=""
                                    className="w-auto max-w-full h-4 object-contain mb-2 brightness-20 invert group-hover:invert-0 group-hover:brightness-100"
                                />
                                <Link
                                    to={brand.href}
                                    className="opacity-0 group-hover:opacity-100 min-h-7.75"
                                >
                                    <Button className=" px-4 text-[0.8125rem] font-hanken bg-white/10 rounded-sm h-7 md:h-11 border border-neutral-700 text-white hover:bg-gold-gradient  transition-all cursor-pointer">
                                        Explore Collection
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Gold Starburst Separator */}
                        {index < brands.length - 1 && (
                            <img
                                src={brandDivider}
                                alt="divider"
                                className={cn(
                                    "h-6 w-6 md:h-8 md:w-8 object-contain md:shrink-0 hidden",
                                    brand.showMobile
                                        ? "block"
                                        : "hidden md:block",
                                )}
                            />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );

    return (
        <section className="w-full bg-black-900 py-16 md:py-24 border-t border-white/5 ">
            <Container className="flex flex-col items-center">
                <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
                    {/* Section Header: Fades in */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col items-center"
                    >
                        <TitleDecoration title="Our Iconic Brands" />
                        <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair max-w-147.5">
                            Iconic Brands, Timeless Craftsmanship
                        </h2>
                    </motion.div>

                    {/* Brand Showcase Grid */}
                    <div className="w-full mt-10 md:mt-16 flex flex-col items-center">
                        {renderBrandRow(topRowBrands)}
                        {renderBrandRow(bottomRowBrands)}
                    </div>

                    {/* Bottom CTA Action Button: Fades in after grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mt-12 md:mt-16 flex justify-center w-full"
                    >
                        <Link
                            to="/catalog"
                            className="flex items-center justify-center px-12 md:py-3.5 bg-gold-g text-black-900 h-10 md:h-12 font-hanken font-bold text-body-b3 rounded-md tracking-wider shadow-xl hover:opacity-95 transition-all active:scale-[0.98] w-full max-w-62 md:max-w-68 text-center"
                        >
                            View All
                        </Link>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};
