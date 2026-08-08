import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import {
    Heart,
    ShoppingCart,
    User,
    ChevronDown,
    Search,
    Menu,
    X,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "./CartDrawer";
import { activeNavImg, logo, navLinks } from "@/lib/site_data";
import Container from "./Container";
import { useCart } from "@/context/CartContext";

const NavSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="relative flex items-center bg-black/40 rounded-full px-3.5 py-1.5 w-full transition-colors">
            <Search className="size-4 text-black-300 mr-1 shrink-0" />
            <Input
                type="text"
                placeholder="Search products, brands...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-body-c1 text-white w-full border-none h-6 focus-visible:ring-0 p-0"
            />
        </div>
    );
};

export const Navbar = () => {
    const { totalItems } = useCart();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Track scroll position to toggle the black background
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (href: string) => {
        const currentPathWithHash = location.pathname + location.hash;
        if (href === "/") {
            return location.pathname === "/" && !location.hash;
        }
        return currentPathWithHash === href;
    };

    const handleNavClick = (href: string) => {
        if (href.includes("#")) {
            const hash = href.split("#")[1];
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setMobileOpen(false);
    };

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [location]);

    return (
        <header className="w-full bg-transparent">
            {/* Smooth transition for background when scrolling */}
            <div
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${
                    isScrolled
                        ? "bg-black-900 md:bg-transparent md:backdrop-blur-none md:border-0 md:shadow-none backdrop-blur-md border-b border-white/10 shadow-2xl py-3 md:py-4"
                        : "bg-transparent py-4 md:py-6"
                }`}
            >
                <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{
                        duration: 1.2,
                        delay: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="pointer-events-auto"
                >
                    <Container className="gap-3 lg:gap-4 mx-auto flex items-center justify-between">
                        {/* Brand Logo Section */}
                        <Link to="/" className="flex items-center shrink-0">
                            <img
                                src={logo}
                                alt="Roseiy Emporium"
                                className="h-12 md:h-20 w-auto object-contain transition-all duration-300"
                            />
                        </Link>

                        {/* Desktop Center: Main Navigation Pod */}
                        <nav className="hidden shrink-0 bg-white/10 lg:flex h-15 items-center gap-10 rounded-lg px-10 py-4 border-[0.5px] border-[#FEFEFE99] backdrop-blur-md">
                            {navLinks?.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() =>
                                            handleNavClick(link.href)
                                        }
                                        className={`relative text-sm font-medium tracking-wide transition-colors duration-200 h-7 shrink-0 overflow-hidden w-auto ${
                                            active
                                                ? "gradient-text"
                                                : "text-white hover:text-gold-300"
                                        }`}
                                    >
                                        {link.name}

                                        {active && (
                                            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                                                <img
                                                    src={activeNavImg}
                                                    alt="active icon"
                                                    className="object-contain h-1.75 w-5.25"
                                                />
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Integrated Right Action Pod */}
                        <div className="bg-po bg-white/10 backdrop-blur-md flex items-center h-14 md:h-15 gap-3 md:gap-4 rounded-xl py-2 px-3 md:px-8 border-[0.5px] border-ivory-400/60 shadow-xl lg:w-full max-w-116">
                            <div className="hidden lg:flex items-center gap-4">
                                <NavSearch />
                                <button className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black/40 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors cursor-pointer">
                                    <Heart className="size-5" />
                                </button>
                            </div>

                            {/* Cart */}
                            <CartDrawer>
                                <button className="relative flex size-9 md:size-10 shrink-0 items-center justify-center rounded-full bg-black/90 md:bg-black/40 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors focus:outline-none cursor-pointer">
                                    <ShoppingCart className="size-4 md:size-5" />
                                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-gradient text-[0.6rem] font-black text-black-900">
                                        {totalItems}
                                    </span>
                                </button>
                            </CartDrawer>

                            {/* Profile Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    render={
                                        <button className="shrink-0 flex size-9 md:size-10 items-center justify-center rounded-full bg-black/40 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors focus:outline-none" />
                                    }
                                >
                                    <User className="size-3 md:size-5" />
                                    <ChevronDown className="size-1.5 md:size-2 text-gray-400" />
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    className="w-25.5 mt-2 bg-white/10 border-[0.2px] border-ivory-100 text-white rounded-sm py-4 px-2 flex flex-col items-center gap-4 backdrop-blur-sm shadow-none"
                                >
                                    <DropdownMenuItem
                                        render={
                                            <Link
                                                to="/login"
                                                className="w-full text-center flex items-center justify-center text-sm font-medium py-2 rounded-lg text-gray-300 hover:text-white cursor-pointer focus:bg-neutral-800"
                                            />
                                        }
                                    >
                                        Login
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        render={
                                            <Link
                                                to="/register"
                                                className="w-full text-center flex items-center justify-center text-sm font-bold py-2 rounded-lg bg-gold-g text-black cursor-pointer shadow-md tracking-wide hover:opacity-90 active:scale-98 transition-all"
                                            />
                                        }
                                    >
                                        Register
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Mobile Drawer */}
                            <Sheet
                                open={mobileOpen}
                                onOpenChange={setMobileOpen}
                                modal={false}
                            >
                                <SheetTrigger>
                                    <button className="lg:hidden flex size-9 items-center justify-center rounded-full bg-black/90 border border-neutral-800 text-white focus:outline-none cursor-pointer">
                                        <Menu className="size-4" />
                                    </button>
                                </SheetTrigger>

                                <SheetContent
                                    side="right"
                                    className="bg-black-900 border-l border-neutral-900 text-white p-6 pt-8 flex flex-col gap-8 shadow-2xl"
                                    showCloseButton={false}
                                >
                                    <div className="flex items-center justify-between w-full border-b border-neutral-900 pb-4">
                                        <img
                                            src={logo}
                                            alt="Roseiy Emporium"
                                            className="h-10 w-auto object-contain"
                                        />
                                        <SheetClose className="text-neutral-400 hover:text-white transition-colors focus:outline-none">
                                            <X className="size-5" />
                                        </SheetClose>
                                    </div>

                                    <nav className="flex flex-col gap-4 pl-2">
                                        {navLinks.map((link) => {
                                            const active = isActive(link.href);
                                            return (
                                                <Link
                                                    key={link.name}
                                                    to={link.href}
                                                    onClick={() =>
                                                        handleNavClick(
                                                            link.href,
                                                        )
                                                    }
                                                    className={`text-body-c1 font-normal tracking-wide transition-colors ${
                                                        active
                                                            ? "gradient-text font-bold"
                                                            : "text-white hover:text-gold-300"
                                                    }`}
                                                >
                                                    {link.name}
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </Container>
                </motion.div>
            </div>
        </header>
    );
};
