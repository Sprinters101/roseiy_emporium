// import Container from "@/components/common/Container";
// import TitleDecoration from "@/components/common/TitleDecoration";
// import { categoryHeaderDivider } from "@/lib/site_data";

// export const RoseiyDifference = () => {
//     const features = [
//         {
//             imgUrl: "/icon/wineglass.svg",
//             title: "Curated Selection",
//             description:
//                 "Only the world’s finest champagnes, wines, spirits and rare collections",
//         },
//         {
//             imgUrl: "/icon/d_2.svg",
//             title: "Guaranteed Authenticity",
//             description:
//                 "Every bottle is sourced through trusted distribution to ensure genuine quality",
//         },
//         {
//             imgUrl: "/icon/d_3.svg",
//             title: "Secure Delivery",
//             description:
//                 "Professionally packaged and delivered with the care premium beverages deserve",
//         },
//     ];

//     return (
//         <section className="w-full bg-black-800 py-16 md:py-24 border-t border-white/5">
//             <Container className="flex flex-col items-center">
//                 <div className="w-full max-w-300 mx-auto">
//                     {/* Section Header */}
//                     <div className="flex flex-col items-center text-center">
//                         <TitleDecoration title="The Roseiy Difference" />

//                         <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-2xl leading-tight">
//                             Why Discerning <br className="md:hidden" />{" "}
//                             Customers Choose Roseiy
//                         </h2>

//                         <p className="mt-3 md:mt-4 text-body-c1 md:text-body-b2 max-w-81.75 md:max-w-171 text-center text-neutral-300 font-hanken font-light">
//                             Every bottle in our collection is carefully sourced,
//                             expertly handled, and selected to deliver an
//                             exceptional experience from purchase to pour.
//                         </p>
//                     </div>

//                     {/* 3-Column Features Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 w-full mt-8 md:mt-20">
//                         {features.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="flex flex-col items-center text-center  "
//                             >
//                                 {/* Gold Icon */}
//                                 <div className="h-14 md:h-25 flex items-center justify-center ">
//                                     <img
//                                         src={item.imgUrl}
//                                         alt={item?.title}
//                                         className="w-full h-full"
//                                     />
//                                 </div>

//                                 {/* Title */}
//                                 <h3 className="text-white mt-2 font-playfair text-[1.25rem] md:text-[31px] font-bold tracking-wide">
//                                     {item.title}
//                                 </h3>

//                                 {/* Gold Flourish Underline */}
//                                 <div className="w-full max-w-xs pt-1 pb-2">
//                                     <img
//                                         src={categoryHeaderDivider}
//                                         alt="divider"
//                                         className="w-full h-5.5 object-contain opacity-70 mx-auto"
//                                         style={{
//                                             filter: "brightness(0) invert(1)",
//                                         }}
//                                     />
//                                 </div>

//                                 {/* Description */}
//                                 <p className="text-white max-w-66.25 mt-1 font-hanken text-body-c1 md:text-body-b3 font-light leading-relaxed">
//                                     {item?.description}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </Container>
//         </section>
//     );
// };

import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { categoryHeaderDivider } from "@/lib/site_data";
import { motion } from "framer-motion";

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
                    {/* Section Header: Fades in directly */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col items-center text-center"
                    >
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
                    </motion.div>

                    {/* 3-Column Features Grid: Mapped with inline index delays */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 w-full mt-8 md:mt-20">
                        {features.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.2 + index * 0.2, // Staggers the items one by one
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="flex flex-col items-center text-center"
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
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};
