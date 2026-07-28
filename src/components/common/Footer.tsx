import { Link } from "react-router";
import Container from "@/components/common/Container";
import { Phone, Mail, MapPin } from "lucide-react";
import { footerLogo } from "@/lib/site_data";
import { IoLogoInstagram } from "react-icons/io5";

// Custom Snapchat SVG icon
const SnapchatIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 text-white"
    >
        <path d="M12 3c-3.5 0-6 2.5-6 6 0 1.2.3 2.1.8 3-.8.4-1.8.8-2.8.8-.5 0-.9.4-.9.9 0 .6.4 1 1 1 1.2 0 2.2-.4 3.1-.9.8 1.1 2.2 1.9 4.8 1.9s4-1 4.8-1.9c.9.5 1.9.9 3.1.9.6 0 1-.4 1-1 0-.5-.4-.9-.9-.9-1 0-2-.4-2.8-.8.5-.9.8-1.8.8-3 0-3.5-2.5-6-6-6z" />
    </svg>
);

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

export const Footer = () => {
    return (
        <footer className="w-full  pt-16 md:pt-30 ">
            <Container>
                <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-10 lg:gap-12 items-start ">
                    {/* Column 1: Brand Logo, Tagline & Copyright */}
                    <div className="flex flex-col space-y-4 w-full md:max-w-86">
                        <Link to="/" className="inline-block">
                            <img
                                src={footerLogo}
                                alt="Roseiy Emporium"
                                className="h-28 sm:h-42.75 w-auto object-contain -ml-2"
                            />
                        </Link>

                        <p className="text-white font-hanken text-xs sm:text-body-b3 font-light leading-relaxed max-w-xs">
                            Roseiy Emporium, your trusted destination for
                            premium wines, champagnes, spirits, whiskies,
                            cognacs, and more.
                        </p>

                        <p className="text-white font-hanken text-xs sm:text-body-b3 pt-2">
                            © 2026 Roseiy Emporium All Rights Reserved.
                        </p>
                    </div>

                    {footerLinks.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col w-full max-w-fit space-y-4"
                        >
                            <h3 className="text-white font-playfair font-bold text-xl sm:text-[1.9375rem]">
                                {item.title}
                            </h3>
                            <ul className="flex flex-col space-y-3 font-hanken text-body-c1 sm:text-body-b2 text-white">
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

                    {/* Column 2: Quick Links */}
                    {/* <div className="flex flex-col w-full max-w-fit space-y-4">
                        <h3 className="text-white font-playfair font-bold text-xl sm:text-[1.9375rem]">
                            Quick Links
                        </h3>
                        <ul className="flex mt-5 flex-col space-y-5 font-hanken text-body-c1 sm:text-body-b2 text-white font-light">
                            <li>
                                <Link
                                    to="/shop"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faq"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/track-order"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div> */}

                    {/* Column 3: Shop Categories */}
                    {/* <div className="flex flex-col space-y-4">
                        <h3 className="text-white font-playfair font-bold text-xl sm:text-[1.9375rem]">
                            Shop
                        </h3>
                        <ul className="flex flex-col space-y-3 font-hanken text-body-c1 sm:text-body-b2 text-neutral-300 font-light">
                            <li>
                                <Link
                                    to="/catalog?category=champagne"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Champagne
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=wine"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Wine
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=whiskey"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Whiskey
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=cognac"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Cognac
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=tequila"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Tequila
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=gin"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Gin
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=rum"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Rum
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=bottled-water"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Bottled Water
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=drinks-accessories"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Drinks Accessories
                                </Link>
                            </li>
                        </ul>
                    </div> */}

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
                                    className="text-neutral-300 hover:text-gold-500 font-hanken text-xs sm:text-body-b2 font-light transition-colors"
                                >
                                    +2348156664737 <br /> & +447946301028
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3">
                                <div className="size-11 rounded-full bg-black-700 border border-white/10 flex items-center justify-center shrink-0">
                                    <Mail className="size-5 text-white" />
                                </div>
                                <a
                                    href="mailto:omobolajrose@gmail.com"
                                    className="text-neutral-300 hover:text-gold-500 font-hanken text-xs sm:text-body-b2 font-light transition-colors"
                                >
                                    omobolajrose@gmail.com
                                </a>
                            </div>

                            {/* Address */}
                            <div className="flex items-center gap-3">
                                <div className="size-11 rounded-full bg-black-700 border border-white/10 flex items-center justify-center shrink-0">
                                    <MapPin className="size-5 text-white" />
                                </div>
                                <span className="text-neutral-300 font-hanken text-xs sm:text-body-b2 font-light leading-snug">
                                    16 pinnock beach road ajiran , <br /> lekki
                                    , Lagos
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
                                    <SnapchatIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <div className="relative ">
                <div className="mx-auto w-full max-w-[323px] md:max-w-265.5 mt-20 absolute left-1/2 transform -translate-x-1/2 ">
                    <img
                        src="/icon/footerDivider.svg"
                        alt="divider"
                        className="w-full object-cover"
                    />
                </div>
                <div className="flex items-end min-h-[296px]">
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
