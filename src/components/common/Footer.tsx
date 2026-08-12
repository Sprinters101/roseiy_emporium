import { Link } from "react-router";
import Container from "@/components/common/Container";
import { Phone, Mail, MapPin } from "lucide-react";
import { footerLogo } from "@/lib/site_data";
import { IoLogoInstagram } from "react-icons/io5";
import { PiSnapchatLogoLight } from "react-icons/pi";

const QUICK_LINKS = [
    { label: "Shop", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "FAQs", href: "/faq" },
    { label: "Track Order", href: "/track-order" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
];

// Shop Categories Data Array
const SHOP_CATEGORIES = [
    { label: "Champagne", href: "/catalog?category=champagne" },
    { label: "Wine", href: "/catalog?category=wine" },
    { label: "Whiskey", href: "/catalog?category=whiskey" },
    { label: "Cognac", href: "/catalog?category=cognac" },
    { label: "Tequila", href: "/catalog?category=tequila" },
    { label: "Gin", href: "/catalog?category=gin" },
    { label: "Rum", href: "/catalog?category=rum" },
    { label: "Bottled Water", href: "/catalog?category=bottled-water" },
    {
        label: "Drinks Accessories",
        href: "/catalog?category=drinks-accessories",
    },
];

const footerLinks = [
    {
        title: "Quick Links",
        data: QUICK_LINKS,
    },
    {
        title: "Shop Categories",
        data: SHOP_CATEGORIES,
    },
];

export const Footer = ({ isAuthPage }: { isAuthPage?: boolean }) => {
    return (
        <footer className="w-full  pt-20 md:pt-30 ">
            {!isAuthPage && (
                <Container>
                    <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-10 lg:gap-12 items-start ">
                        {/* Column 1: Brand Logo, Tagline & Copyright */}
                        <div className="flex flex-col space-y-4 w-full md:max-w-86">
                            <Link to="/" className="inline-block">
                                <img
                                    src={footerLogo}
                                    alt="Roseiy Emporium"
                                    className="h-42.75 w-auto object-contain -ml-2"
                                />
                            </Link>

                            <p className="text-white font-hanken text-sm sm:text-body-b3 font-light leading-relaxed max-w-xs">
                                Roseiy Emporium, your trusted destination for
                                premium wines, champagnes, spirits, whiskies,
                                cognacs, and more.
                            </p>

                            <p className="text-white font-hanken text-sm sm:text-body-b3 pt-2">
                                © 2026 Roseiy Emporium All Rights Reserved.
                            </p>
                        </div>

                        {footerLinks?.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col w-full max-w-fit space-y-4"
                            >
                                <h3 className="text-white font-playfair font-bold text-xl sm:text-hg-b3">
                                    {item.title}
                                </h3>
                                <ul className="flex flex-col space-y-3 font-hanken text-body-c1 sm:text-base text-white">
                                    {item.data.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                to={link.href}
                                                className="hover:text-gold-500 transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Column 4: Contact & Socials */}
                        <div className="flex flex-col space-y-6">
                            <h3 className="text-white font-playfair font-bold text-xl sm:text-2xl">
                                Contact
                            </h3>

                            {/* Contact Channel List */}
                            <div className="flex flex-col space-y-4">
                                {/* Phone */}
                                <div className="flex items-center gap-3">
                                    <div className="size-11 rounded-full bg-black-700 border border-white/10 flex items-center justify-center shrink-0">
                                        <Phone className="size-5 text-white" />
                                    </div>
                                    <a
                                        href="tel:+2348156664737"
                                        className="text-neutral-300 hover:text-gold-500 font-hanken text-body-c1 sm:text- font-semibold transition-colors"
                                    >
                                        +2348156664737
                                    </a>{" "}
                                    &
                                    <a
                                        href="tel:+447946301028"
                                        className="text-neutral-300 hover:text-gold-500 font-hanken text-body-c1 sm:text- font-semibold transition-colors"
                                    >
                                        +447946301028
                                    </a>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-3">
                                    <div className="size-11 rounded-full bg-black-700 border border-white/10 flex items-center justify-center shrink-0">
                                        <Mail className="size-5 text-white" />
                                    </div>
                                    <a
                                        href="mailto:omobolajrose@gmail.com"
                                        className="text-neutral-300 hover:text-gold-500 font-hanken text-body-c1 sm:text- font-semibold transition-colors"
                                    >
                                        omobolajrose@gmail.com
                                    </a>
                                </div>

                                {/* Address */}
                                <div className="flex items-center gap-3">
                                    <div className="size-11 rounded-full bg-black-700 border border-white/10 flex items-center justify-center shrink-0">
                                        <MapPin className="size-5 text-white" />
                                    </div>
                                    <span className="text-neutral-300 font-hanken text-body-c1 sm:text- font-semibold leading-snug">
                                        16 pinnock beach road ajiran , <br />{" "}
                                        lekki , Lagos
                                    </span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="pt-2 flex flex-col space-y-3">
                                <h4 className="text-white font-playfair font-bold text-lg">
                                    Follow Us
                                </h4>
                                <div className="flex items-center gap-3">
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="size-11 rounded-full bg-black-700 border border-white/10 flex items-center justify-center hover:bg-gold-500/20 hover:border-gold-500 transition-all cursor-pointer"
                                        aria-label="Instagram"
                                    >
                                        <IoLogoInstagram className="size-5 text-white" />
                                    </a>
                                    <a
                                        href="https://snapchat.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="size-11 rounded-full bg-black-700 border border-white/10 flex items-center justify-center hover:bg-gold-500/20 hover:border-gold-500 transition-all cursor-pointer"
                                        aria-label="Snapchat"
                                    >
                                        <PiSnapchatLogoLight />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            )}

            <div className="relative ">
                <div className="mx-auto -top-10 md:top-0 w-full max-w-80.75 md:max-w-265.5 mt-20 absolute left-1/2 transform -translate-x-1/2 ">
                    <img
                        src="/icon/footerDivider.svg"
                        alt="divider"
                        className="w-full object-cover"
                    />
                </div>
                <div className="flex items-end min-h-74">
                    <img
                        src={"/icon/footerField.svg"}
                        alt="logo"
                        className="w-full hidden md:block"
                    />
                    <img
                        src={"/icon/footerFieldMobile.svg"}
                        alt="logo"
                        className=" w-full md:hidden  "
                    />
                </div>
            </div>
        </footer>
    );
};
