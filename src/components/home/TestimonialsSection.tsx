import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
    id: string;
    name: string;
    initials: string;
    rating: number;
    comment: string;
    bgFade: boolean;
}

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`size-4 ${
                        star <= rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-white "
                    }`}
                />
            ))}
        </div>
    );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    return (
        <div
            className={cn(
                "w-full rounded-lg p-6 sm:p-8 flex flex-col space-y-4 transition-all duration-300 hover:border-gold-300/30",
                testimonial?.bgFade ? "bg-black-500" : "bg-black-800",
            )}
        >
            {/* Header: Initials Avatar + Name & Rating */}
            <div className="flex items-center gap-4">
                {/* Initials Circle */}
                <div className="size-14 sm:size-18 rounded-full border border-white/20 flex items-center justify-center shrink-0 bg-black/40">
                    <span className="text-white text-lg sm:text-body-b1 font-medium tracking-wide">
                        {testimonial.initials}
                    </span>
                </div>

                {/* Name & Star Rating */}
                <div className="flex flex-col space-y-1">
                    <h3 className="text-white font-playfair text-xl sm:text-hg-c1 font-bold leading-tight">
                        {testimonial.name}
                    </h3>
                    <StarRating rating={testimonial.rating} />
                </div>
            </div>

            {/* Testimonial Copy */}
            <p className="text-white font-hanken text-body-c1 font-normal leading-relaxed">
                {testimonial.comment}
            </p>
        </div>
    );
};

export const TestimonialsSection = () => {
    const testimonials: Testimonial[] = [
        {
            id: "1",
            name: "Peter Odejobi",
            initials: "PO",
            rating: 5,
            bgFade: true,
            comment:
                "The bottle arrived beautifully packaged and exactly as described. You can tell Roseiy takes presentation seriously. I'll definitely be ordering again.",
        },
        {
            id: "2",
            name: "Omobolaji Abubakar",
            initials: "OA",
            rating: 5,
            bgFade: false,
            comment:
                "Everything about the experience felt premium, from the packaging to the product itself. My only suggestion would be to offer more payment options at checkout.",
        },
        {
            id: "3",
            name: "Toheeb Kasali",
            initials: "TK",
            rating: 3,
            bgFade: true,
            comment:
                "The quality of the bottle was excellent, but one item I wanted was already sold out. Hopefully they restock faster because I'd love to purchase again.",
        },
        {
            id: "4",
            name: "Rasheed Bello",
            initials: "RB",
            rating: 5,
            bgFade: false,
            comment:
                "Finding authentic premium champagne locally isn't always easy, so I was impressed by the selection. Delivery was smooth and everything arrived in perfect condition.",
        },
        {
            id: "5",
            name: "Busayo Daramola",
            initials: "RB",
            rating: 4,
            bgFade: true,
            comment:
                "Great shopping experience overall. The website was easy to navigate and checkout was seamless. I just wish there were more whisky options available.",
        },
        {
            id: "6",
            name: "Ghali Abdullahi",
            initials: "GA",
            rating: 3,
            bgFade: false,
            comment:
                "Customer support responded quickly when I had questions about my order. Delivery took a little longer than expected, but the bottle arrived safely and was worth the wait.",
        },
    ];

    return (
        <section className="w-full bg-black-900 py-16 md:py-24 border-t border-white/5">
            <Container>
                <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
                    {/* Mobile Title Header (Appears second) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mb-10 lg:hidden flex flex-col items-center"
                    >
                        <TitleDecoration title="Testimonials" />
                        <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-104.5 leading-tight">
                            Hear From Our Happy Customers
                        </h2>
                    </motion.div>

                    {/* Staggered Desktop Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full items-start">
                        {/* Left Column */}
                        <div className="flex flex-col gap-6 lg:gap-8 md:mt-28">
                            {/* Card 0: Appears First */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[0]}
                                />
                            </motion.div>

                            {/* Card 3: Appears First */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[3]}
                                />
                            </motion.div>
                        </div>

                        {/* Middle Column with Central Title Header */}
                        <div className="flex flex-col gap-6 lg:gap-8 items-center">
                            {/* Card 1: Appears Second */}
                            <motion.div
                                className="w-full"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.6,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[1]}
                                />
                            </motion.div>

                            {/* Desktop Central Title Block (Appears Second) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="hidden lg:flex h-full items-center justify-center mb-4 py-4 w-full flex-col"
                            >
                                <TitleDecoration title="Testimonials" />
                                <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-104.5 leading-tight">
                                    Hear From Our Happy Customers
                                </h2>
                            </motion.div>

                            {/* Card 4: Appears Second */}
                            <motion.div
                                className="w-full"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[4]}
                                />
                            </motion.div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6 lg:gap-8 md:mt-28">
                            {/* Card 2: Appears Second */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.6,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[2]}
                                />
                            </motion.div>

                            {/* Card 5: Appears First */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[5]}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
