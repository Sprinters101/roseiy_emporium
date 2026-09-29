import React, { useState, useEffect, useRef, useMemo } from "react";
import { Search, X, ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useUniversalSearch } from "@/service/queries";
import { heroBg, products as mockProducts } from "@/lib/site_data";
import { cn } from "@/lib/utils";
import type { UniversalSearchResultItem } from "@/service/types";

interface NavSearchProps {
    className?: string;
    inputClassName?: string;
    onCloseMobile?: () => void;
    autoFocus?: boolean;
    isMobileModal?: boolean;
}

export const NavSearch: React.FC<NavSearchProps> = ({
    className,
    inputClassName,
    onCloseMobile,
    autoFocus = false,
    isMobileModal = false,
}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Debounce input (250ms) to avoid spamming queries
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery.trim());
        }, 250);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Live Universal Search (Storefront GET /api/v1/search)
    const {
        data: searchApiResponse,
        isLoading: isLoadingSearch,
        isFetching: isFetchingSearch,
    } = useUniversalSearch(
        { q: debouncedQuery, limit: 8 },
        { enabled: debouncedQuery.length > 0 },
    );

    // Actively typing or query in-flight
    const isSearching =
        searchQuery.trim().length > 0 &&
        (searchQuery.trim() !== debouncedQuery ||
            isLoadingSearch ||
            isFetchingSearch);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    // Autofocus when opened in mobile modal
    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    // Build suggestions list once fetching completes
    const suggestions: UniversalSearchResultItem[] = useMemo(() => {
        const q = debouncedQuery.toLowerCase().trim();
        // Do not return suggestions if query is empty or still actively searching/typing
        if (!q || isSearching) return [];

        const liveResults = searchApiResponse?.data?.results;

        if (
            liveResults &&
            Array.isArray(liveResults) &&
            liveResults.length > 0
        ) {
            return liveResults.slice(0, 8);
        }

        // Fallback for offline / demo mode
        const fallbackList: UniversalSearchResultItem[] = [];
        const seen = new Set<string>();

        mockProducts.forEach((p) => {
            if (p.name && p.name.toLowerCase().includes(q)) {
                const norm = p.name.toLowerCase().trim();
                if (!seen.has(norm)) {
                    seen.add(norm);
                    fallbackList.push({
                        searchType: "product",
                        id: String(p.id),
                        title: p.name,
                        subtitle: p.category
                            ? `${p.category} • ₦${p.price.toLocaleString()}`
                            : undefined,
                        image: p.image,
                        url: `/product/${p.id}`,
                        data: p,
                    });
                }
            }
            if (p.brand && p.brand.toLowerCase().includes(q)) {
                const normBrand = p.brand.toLowerCase().trim();
                if (!seen.has(normBrand)) {
                    seen.add(normBrand);
                    fallbackList.push({
                        searchType: "brand",
                        id: `brand-${p.brand}`,
                        title: p.brand,
                        subtitle: "Brand",
                        url: `/shop?brand=${encodeURIComponent(p.brand)}`,
                        data: { name: p.brand },
                    });
                }
            }
        });

        return fallbackList.slice(0, 8);
    }, [debouncedQuery, isSearching, searchApiResponse]);

    const handleSelectSuggestion = (item: UniversalSearchResultItem) => {
        setIsOpen(false);
        setSearchQuery("");
        onCloseMobile?.();

        const type = (item.searchType || "").toLowerCase();
        const slug = item.data?.slug || item.data?.productId || item.id;

        if (type === "product") {
            if (item.url && item.url.startsWith("/catalogue/product/")) {
                const cleanSlug = item.url.replace("/catalogue/product/", "");
                navigate(`/product/${cleanSlug}`);
            } else if (item.url && item.url.startsWith("/product/")) {
                navigate(item.url);
            } else {
                navigate(`/product/${encodeURIComponent(slug)}`);
            }
        } else if (type === "brand") {
            const brandParam = item.data?.slug || item.title;
            navigate(`/shop?brand=${encodeURIComponent(brandParam)}`);
        } else if (type === "category") {
            const catParam = item.data?.slug || item.title;
            navigate(`/shop?category=${encodeURIComponent(catParam)}`);
        } else if (item.url) {
            navigate(item.url);
        } else {
            navigate(`/shop?search=${encodeURIComponent(item.title)}`);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = searchQuery.trim();
        if (!trimmed) return;

        setIsOpen(false);
        onCloseMobile?.();
        navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
    };

    const handleClear = () => {
        onCloseMobile?.();
        setSearchQuery("");
        setDebouncedQuery("");
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex flex-col items-start w-full",
                className,
            )}
        >
            {/* Search Input Bar */}
            <form
                onSubmit={handleFormSubmit}
                className={cn(
                    "relative flex items-center bg-black/50 hover:bg-black/60 focus-within:bg-black/80 rounded-full border border-neutral-700/60 focus-within:border-neutral-500 px-3 py-1.5 w-full transition-all duration-200 h-10",
                    isMobileModal &&
                        "bg-[#18181B] hover:bg-[#18181B] focus-within:bg-[#18181B] border-neutral-700 px-4 py-2.5 shadow-lg",
                    inputClassName,
                )}
            >
                <Search
                    className={cn(
                        "size-4 text-neutral-400 mr-2 shrink-0 transition-colors",
                        isMobileModal && "size-5 text-neutral-300",
                    )}
                />
                <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    placeholder="Search products, brands...."
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => {
                        if (searchQuery.trim().length > 0) {
                            setIsOpen(true);
                        }
                    }}
                    className={cn(
                        "bg-transparent text-sm text-white placeholder:text-neutral-400 placeholder:font-light w-full border-none focus:outline-none h-6 font-normal tracking-wide",
                        isMobileModal && "text-[13px] md:text-base h-7",
                    )}
                />

                {/* Right Action: Spinner or Clear Button */}
                {isSearching ? (
                    <Loader2 className="size-4 text-neutral-400 animate-spin shrink-0 ml-1" />
                ) : searchQuery.length > 0 ? (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-neutral-400 hover:text-white p-0.5 rounded-full hover:bg-white/10 transition-colors shrink-0 ml-1 cursor-pointer focus:outline-none"
                        aria-label="Clear search"
                    >
                        <X className="size-4" />
                    </button>
                ) : null}
            </form>

            {/* Results Dropdown Menu matching Figma design */}
            {isOpen && searchQuery.trim().length > 0 && (
                <div
                    className={cn(
                        "absolute top-0 md:top-12 left-0 mt-2 w-full min-w-[280px] sm:min-w-[320px] bg-black border border-neutral-800 text-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-2xl backdrop-blur-md z-50 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150",
                        isMobileModal &&
                            "relative mt-3 w-full shadow-2xl rounded-2xl p-2",
                    )}
                >
                    <div className="absolute inset-0 w-full h-full bg-black-700 pointer-events-none z-0">
                        <img
                            src={heroBg}
                            alt="Premium selection background"
                            className="w-full h-full object-cover object-center opacity-60"
                        />
                    </div>

                    {isSearching ? (
                        <div className="relative z-10 flex items-center justify-center py-6 text-neutral-400 text-sm gap-2">
                            <Loader2 className="size-4 animate-spin text-gold-500" />
                            <span>Searching...</span>
                        </div>
                    ) : suggestions && suggestions.length > 0 ? (
                        <div className="relative z-10 flex flex-col gap-0.5">
                            {suggestions.map((item) => (
                                <button
                                    key={`${item.searchType}-${item.id}`}
                                    type="button"
                                    onClick={() => handleSelectSuggestion(item)}
                                    className="w-full z-10 flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-neutral-200 hover:text-white hover:bg-white/10 active:bg-white/20 cursor-pointer transition-all duration-150 group text-left"
                                >
                                    <span className="truncate pr-2 font-normal text-[13px] sm:text-sm">
                                        {item.title}
                                    </span>
                                    <ChevronRight className="size-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform duration-150 shrink-0" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="relative z-10 px-3.5 py-4 text-center text-sm text-neutral-400">
                            No products or brands found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NavSearch;
