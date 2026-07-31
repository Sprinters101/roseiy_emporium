// import Container from "../common/Container";
// import TitleDecoration from "../common/TitleDecoration";
// import { ProductCard } from "../common/ProductCard";
// import { Link } from "react-router";
// import { products } from "@/lib/site_data";

// export const SignatureSelections = () => {
//     return (
//         <section className="w-full bg-black-900 py-16 md:py-24" id="shop">
//             <Container className="flex flex-col items-center">
//                 <div className="w-full max-w-7xl mx-auto">
//                     <div className="w-full max-w-127.5">
//                         <TitleDecoration
//                             title="Signature Selections"
//                             className="md:mx-0 px-0"
//                         />
//                         <h2 className="text-hg-b3 md:text-hg-h3 text-center md:text-left mx-auto md:mx-0 font-bold mt-1 md:mt-2 font-playfair max-w-63.25 md:max-w-full">
//                             Handpicked for Exceptional Moments
//                         </h2>
//                         <p className=" mt-2 md:mt-4 text-body-c1 md:text-body-b2 max-w-76.5 md:max-w-full text-center mx-auto md:mx-0 md:text-left">
//                             Discover rare bottles and timeless classics chosen
//                             for their quality, character, and legacy.
//                         </p>
//                     </div>

//                     <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mt-4 md:mt-16">
//                         {products?.map((product) => (
//                             <ProductCard
//                                 key={product.id}
//                                 product={product}
//                                 isLandingPage={true}
//                             />
//                         ))}
//                     </div>

//                     <div className="mt-12 md:mt-16 flex justify-center">
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

import Container from "../common/Container";
import TitleDecoration from "../common/TitleDecoration";
import { ProductCard } from "../common/ProductCard";
import { Link } from "react-router";
import { products } from "@/lib/site_data";
import { motion } from "framer-motion";

export const SignatureSelections = () => {
    return (
        <section
            className="w-full bg-black-900 py-16 md:py-24 overflow-hidden"
            id="shop"
        >
            <Container className="flex flex-col items-center">
                <div className="w-full max-w-7xl mx-auto">
                    {/* Header Block: Fades in from the left */}
                    <motion.div
                        initial={{ x: -60, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full max-w-127.5"
                    >
                        <TitleDecoration
                            title="Signature Selections"
                            className="md:mx-0 px-0"
                        />
                        <h2 className="text-hg-b3 md:text-hg-h3 text-center md:text-left mx-auto md:mx-0 font-bold mt-1 md:mt-2 font-playfair max-w-63.25 md:max-w-full text-white">
                            Handpicked for Exceptional Moments
                        </h2>
                        <p className="mt-2 md:mt-4 text-body-c1 md:text-body-b2 max-w-76.5 md:max-w-full text-center mx-auto md:mx-0 md:text-left text-neutral-300 font-hanken font-light">
                            Discover rare bottles and timeless classics chosen
                            for their quality, character, and legacy.
                        </p>
                    </motion.div>

                    {/* Products Grid: Fades in smoothly */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2, // Triggers right after the header slide-in
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mt-4 md:mt-16"
                    >
                        {products?.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isLandingPage={true}
                            />
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mt-12 md:mt-16 flex justify-center"
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
