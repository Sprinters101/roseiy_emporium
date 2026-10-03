import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, ChevronDown, Search, X } from "lucide-react";
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
import { CartDrawer } from "./CartDrawer";
import { activeNavImg, logo, navLinks } from "@/lib/site_data";
import Container from "./Container";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { NavSearch } from "./NavSearch";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const { totalItems } = useCart();
    const { wishlistCount } = useWishlist();
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isDashboardSection =
        location.pathname.startsWith("/dashboard") ||
        location.pathname.startsWith("/overview");
    const isWishlist =
        location.pathname === "/wishlist" ||
        location.pathname === "/whitelist";

    const isOverviewActive =
        location.pathname === "/dashboard" ||
        location.pathname === "/dashboard/" ||
        location.pathname === "/dashboard/overview" ||
        location.pathname === "/overview";

    const isOrdersActive =
        location.pathname.startsWith("/dashboard/orders") ||
        location.pathname.startsWith("/dashboard/order-details") ||
        location.pathname.startsWith("/dashboard/track-order");

    const isAddressesActive = location.pathname.startsWith(
        "/dashboard/addresses",
    );

    const isProfileActive =
        location.pathname.startsWith("/dashboard/profile");

    // Close mobile search when route changes
    useEffect(() => {
        setMobileSearchOpen(false);
    }, [location.pathname]);

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
        if (href === "/") {
            return location.pathname === "/" && !location.hash;
        }
        if (href.includes("#")) {
            const hash = href.split("#")[1];
            return location.pathname === "/" && location.hash === `#${hash}`;
        }
        if (href === "/shop") {
            return (
                location.pathname.startsWith("/shop") ||
                location.pathname.startsWith("/product")
            );
        }
        return (
            location.pathname === href ||
            location.pathname.startsWith(`${href}/`)
        );
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
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 pointer-events-none",
                    "bg-transparent py-4 md:py-6 transition-all duration-300",
                    isScrolled &&
                        "bg-black-900 md:bgs-transparent md:backdrop-blur-none md:border-0 md:shadow-none backdrop-blur-md border-b border-white/10 shadow-2xl py-3 md:py-2",
                )}
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
                                                : "text-white hover:text-gold-500"
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
                        <div className="bg-po bg-white/10 backdrop-blur-md flex items-center h-14 md:h-15 gap-2 md:gap-3 lg:gap-4 rounded-xl py-2 px-3 md:px-6 border-[0.5px] border-ivory-400/60 shadow-xl lg:w-full max-w-116">
                            <div className="flex items-center gap-2 md:gap-3 flex-1">
                                {/* Desktop Search */}
                                <div className="hidden lg:block w-full max-w-48 xl:max-w-56">
                                    <NavSearch />
                                </div>

                                {/* Mobile Search Button */}
                                <button
                                    type="button"
                                    onClick={() => setMobileSearchOpen(true)}
                                    className="lg:hidden relative flex size-9 shrink-0 items-center justify-center rounded-full bg-black/40 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                                    aria-label="Open search"
                                >
                                    <Search className="size-4" />
                                </button>

                                <Link
                                    to="/wishlist"
                                    type="button"
                                    className={cn(
                                        "relative flex size-9 md:size-10 shrink-0 items-center justify-center rounded-full bg-black/40 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors cursor-pointer",
                                        isWishlist &&
                                            "border-gold-500/60 bg-black/70 text-gold-500",
                                    )}
                                >
                                    <Heart
                                        className={cn(
                                            "size-4 md:size-5 transition-colors",
                                            isWishlist
                                                ? "text-gold-500 fill-gold-500/20"
                                                : "text-white",
                                        )}
                                    />
                                    {wishlistCount > 0 && (
                                        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-gradient text-[0.6rem] font-black text-black-900">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </Link>
                            </div>

                            {/* Cart */}
                            <CartDrawer>
                                <button
                                    type="button"
                                    className="relative flex size-9 md:size-10 shrink-0 items-center justify-center rounded-full bg-black-900 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors focus:outline-none cursor-pointer"
                                >
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
                                        <button
                                            type="button"
                                            className={cn(
                                                "shrink-0 flex size-9 md:size-10 items-center justify-center rounded-full bg-black-900 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors focus:outline-none cursor-pointer",
                                                isDashboardSection &&
                                                    "border-gold-500/60 bg-black-800",
                                            )}
                                        />
                                    }
                                >
                                    <img
                                        alt="user icon"
                                        src={
                                            isDashboardSection
                                                ? "/icon/userActive.svg"
                                                : "/icon/user.svg"
                                        }
                                        className="size-3.5 md:size-4"
                                    />
                                    <ChevronDown
                                        className={cn(
                                            "size-1.5 md:size-2 transition-colors",
                                            isDashboardSection
                                                ? "text-gold-500"
                                                : "text-white",
                                        )}
                                    />
                                </DropdownMenuTrigger>

                                {isAuthenticated ? (
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-44 sm:w-48 mt-2 bg-[#18181B] border border-neutral-800 text-white rounded-xl p-2 flex flex-col gap-0.5 backdrop-blur-md shadow-2xl z-50"
                                    >
                                        <DropdownMenuItem
                                            render={
                                                <Link
                                                    to="/dashboard"
                                                    className={cn(
                                                        "w-full flex items-center text-sm font-medium py-2 px-3 rounded-lg cursor-pointer font-hanken transition-colors",
                                                        isOverviewActive
                                                            ? "text-gold-500 bg-white/5 font-semibold"
                                                            : "text-white hover:text-gold-300 hover:bg-white/5",
                                                    )}
                                                />
                                            }
                                        >
                                            Overview
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            render={
                                                <Link
                                                    to="/dashboard/orders"
                                                    className={cn(
                                                        "w-full flex items-center text-sm font-medium py-2 px-3 rounded-lg cursor-pointer font-hanken transition-colors",
                                                        isOrdersActive
                                                            ? "text-gold-500 bg-white/5 font-semibold"
                                                            : "text-white hover:text-gold-300 hover:bg-white/5",
                                                    )}
                                                />
                                            }
                                        >
                                            Orders
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            render={
                                                <Link
                                                    to="/dashboard/addresses"
                                                    className={cn(
                                                        "w-full flex items-center text-sm font-medium py-2 px-3 rounded-lg cursor-pointer font-hanken transition-colors",
                                                        isAddressesActive
                                                            ? "text-gold-500 bg-white/5 font-semibold"
                                                            : "text-white hover:text-gold-300 hover:bg-white/5",
                                                    )}
                                                />
                                            }
                                        >
                                            Addresses
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            render={
                                                <Link
                                                    to="/dashboard/profile"
                                                    className={cn(
                                                        "w-full flex items-center text-sm font-medium py-2 px-3 rounded-lg cursor-pointer font-hanken transition-colors",
                                                        isProfileActive
                                                            ? "text-gold-500 bg-white/5 font-semibold"
                                                            : "text-white hover:text-gold-300 hover:bg-white/5",
                                                    )}
                                                />
                                            }
                                        >
                                            Profile
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            onClick={logout}
                                            className="w-full flex items-center text-sm font-medium py-2 px-3 rounded-lg text-red-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer font-hanken transition-colors mt-1 border-t border-neutral-800/80 pt-2"
                                        >
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                ) : (
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-25.5 mt-2 bg-white/10 border-[0.2px] border-ivory-100 text-white rounded-sm py-4 px-2 flex flex-col items-center gap-4 backdrop-blur-sm shadow-none"
                                    >
                                        <DropdownMenuItem
                                            render={
                                                <Link
                                                    to="/login"
                                                    state={{ from: location }}
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
                                                    state={{ from: location }}
                                                    className="w-full text-center flex items-center justify-center text-sm font-bold py-2 rounded-lg bg-gold-g text-black cursor-pointer shadow-md tracking-wide hover:opacity-90 active:scale-98 transition-all"
                                                />
                                            }
                                        >
                                            Register
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                )}
                            </DropdownMenu>

                            {/* Mobile Drawer */}
                            <Sheet
                                open={mobileOpen}
                                onOpenChange={setMobileOpen}
                                modal={false}
                            >
                                <SheetTrigger>
                                    <button
                                        type="button"
                                        className="lg:hidden flex size-9 items-center justify-center rounded-full bg-black-900 border border-neutral-800 text-white focus:outline-none cursor-pointer"
                                    >
                                        <img
                                            src="/icon/menu.svg"
                                            className="size-4"
                                        />
                                    </button>
                                </SheetTrigger>

                                <SheetContent
                                    side="right"
                                    className="bg-black-900 border-l border-neutral-900 text-white p-6 pt-8 flex flex-col gap-6 shadow-2xl"
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

                                    {/* Search inside Mobile Drawer */}
                                    <div className="w-full">
                                        <NavSearch
                                            onCloseMobile={() =>
                                                setMobileOpen(false)
                                            }
                                        />
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

            {/* Fullscreen Mobile Search Overlay Modal (Matches Figma design) */}
            {mobileSearchOpen && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg p-4 pt-8 flex flex-col items-center animate-in fade-in duration-200">
                    <div className="w-full max-w-md flex flex-col gap-3">
                        <NavSearch
                            autoFocus
                            isMobileModal
                            onCloseMobile={() => setMobileSearchOpen(false)}
                        />
                    </div>
                </div>
            )}
        </header>
    );
};
