import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { contactChampagneImg } from "@/lib/site_data";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { PiSnapchatLogoLight } from "react-icons/pi";
import { IoLogoInstagram } from "react-icons/io5";
import { motion } from "framer-motion";

export const ContactSection = () => {
    return (
        <section
            className="w-full bg-black-700 mt-16 pt-12 md:pt-24 overflow-hidden"
            id="contact"
        >
            <Container>
                <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Champagne Bottle & Glass Graphic (Slides in from the bottom) */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                        }}
                        className="relative w-full flex justify-center items-end h-full order-2 lg:order-1"
                    >
                        <div className="relative w-full max-w-md lg:max-w-lg">
                            <img
                                src={contactChampagneImg}
                                alt="Champagne Bottle and Glass"
                                className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]"
                            />
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Details & Socials (Slides in from the left) */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col items-start text-left space-y-8 order-1 lg:order-2"
                    >
                        {/* Section Title Header */}
                        <div className="flex flex-col items-start space-y-2">
                            <TitleDecoration
                                title="Contact Us"
                                className="mx-0"
                            />
                            <h2 className="text-white mt-2 font-playfair text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                We’re Here to Help You
                            </h2>
                        </div>

                        {/* Contact Channels List */}
                        <div className="flex flex-col space-y-6 w-full">
                            {/* Phone Numbers */}
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-black-900 flex items-center justify-center shrink-0">
                                    <PhoneCall className="size-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-body-c1 md:text-base text-white">
                                        Call Us On
                                    </span>
                                    <a
                                        href="tel:+2348156664737"
                                        className="gradient-text font-hanken text-base md:text-body-b1 font-bold hover:underline"
                                    >
                                        +2348156664737 & +447946301028
                                    </a>
                                </div>
                            </div>

                            {/* Email Address */}
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-black-900 flex items-center justify-center shrink-0">
                                    <Mail className="size-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-body-c1 md:text-base text-white">
                                        Email Us
                                    </span>
                                    <a
                                        href="mailto:omobolajrose@gmail.com"
                                        className="gradient-text font-hanken md:text-body-b1 text-base font-bold hover:underline"
                                    >
                                        omobolajrose@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Physical Location */}
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-black-900 flex items-center justify-center shrink-0">
                                    <MapPin className="size-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-body-c1 md:text-base text-white">
                                        Visit Us at
                                    </span>
                                    <p className="gradient-text font-hanken text-base md:text-body-b1 font-bold">
                                        16 pinnock beach road ajiran , lekki ,
                                        Lagos
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="pt-4 flex flex-col space-y-3 md:mb-16">
                            <h3 className="text-white font-playfair text-xl font-bold">
                                Follow Us
                            </h3>
                            <div className="flex items-center gap-4">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="size-12 rounded-full bg-black-900 flex items-center justify-center hover:bg-gold-500/20 hover:border-gold-500 transition-all cursor-pointer"
                                    aria-label="Instagram"
                                >
                                    <IoLogoInstagram className="size-5 text-white" />
                                </a>
                                <a
                                    href="https://snapchat.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="size-12 rounded-full bg-black-900 flex items-center justify-center hover:bg-gold-500/20 hover:border-gold-500 transition-all cursor-pointer"
                                    aria-label="Snapchat"
                                >
                                    <PiSnapchatLogoLight />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};
