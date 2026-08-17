// import { useState } from "react";
// import { Search, ChevronDown, X } from "lucide-react";
// import { CATEGORIES, PRICE_RANGES, type FilterOption } from "./data/shopData";
// // import { CATEGORIES, PRICE_RANGES } from "../data/shopData";
// // import type { FilterOption } from "../types/shop.types";

// interface ShopSidebarProps {
//     selectedCategories: string[];
//     selectedBrands: string[];
//     selectedPriceRanges: string[];
//     brandSearch: string;
//     totalActiveFilters: number;
//     filteredBrandList: FilterOption[];
//     isMobileDrawer?: boolean;
//     onCloseMobileDrawer?: () => void;
//     onCategoryToggle: (id: string) => void;
//     onBrandToggle: (id: string) => void;
//     onPriceToggle: (id: string) => void;
//     onBrandSearchChange: (value: string) => void;
//     onClearAll: () => void;
// }

// export const ShopSidebar = ({
//     selectedCategories,
//     selectedBrands,
//     selectedPriceRanges,
//     brandSearch,
//     totalActiveFilters,
//     filteredBrandList,
//     isMobileDrawer = false,
//     onCloseMobileDrawer,
//     onCategoryToggle,
//     onBrandToggle,
//     onPriceToggle,
//     onBrandSearchChange,
//     onClearAll,
// }: ShopSidebarProps) => {
//     const [openSections, setOpenSections] = useState({
//         categories: true,
//         brands: true,
//         price: true,
//     });

//     return (
//         <aside
//             className={`bg-[#111111] border border-neutral-800/80 rounded-xl p-5 md:p-6 space-y-6 ${
//                 isMobileDrawer
//                     ? "w-full h-full border-none rounded-none overflow-y-auto"
//                     : "hidden lg:block lg:col-span-1"
//             }`}
//         >
//             {/* Sidebar Header */}
//             <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
//                 <h3 className="font-playfair text-xl text-white font-bold tracking-wide">
//                     Filters{" "}
//                     {totalActiveFilters > 0 && `(${totalActiveFilters})`}
//                 </h3>

//                 <div className="flex items-center gap-3">
//                     {totalActiveFilters > 0 && (
//                         <button
//                             type="button"
//                             onClick={onClearAll}
//                             className="text-xs text-gold-500 hover:underline font-hanken cursor-pointer"
//                         >
//                             Reset
//                         </button>
//                     )}

//                     {/* Mobile Close Button */}
//                     {isMobileDrawer && (
//                         <button
//                             type="button"
//                             onClick={onCloseMobileDrawer}
//                             className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
//                         >
//                             <X className="size-5" />
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* CATEGORIES SECTION */}
//             <div className="border-b border-neutral-800/60 pb-5">
//                 <button
//                     type="button"
//                     onClick={() =>
//                         setOpenSections((p) => ({
//                             ...p,
//                             categories: !p.categories,
//                         }))
//                     }
//                     className="w-full flex items-center justify-between text-white font-hanken font-bold text-sm md:text-base tracking-wide mb-4 text-left cursor-pointer"
//                 >
//                     CATEGORIES
//                     <ChevronDown
//                         className={`size-4 text-neutral-400 transition-transform ${
//                             openSections.categories ? "rotate-180" : ""
//                         }`}
//                     />
//                 </button>

//                 {openSections.categories && (
//                     <div className="space-y-3">
//                         {CATEGORIES.map((cat) => {
//                             const isChecked = selectedCategories.includes(
//                                 cat.id,
//                             );
//                             return (
//                                 <label
//                                     key={cat.id}
//                                     className="flex items-center justify-between cursor-pointer group text-xs font-hanken"
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <input
//                                             type="checkbox"
//                                             checked={isChecked}
//                                             onChange={() =>
//                                                 onCategoryToggle(cat.id)
//                                             }
//                                             className="size-4 rounded border-neutral-700 bg-black-900 accent-gold-500 cursor-pointer"
//                                         />
//                                         <span
//                                             className={
//                                                 isChecked
//                                                     ? "gradient-text  font-semibold"
//                                                     : "text-neutral-300 group-hover:text-white"
//                                             }
//                                         >
//                                             {cat.label}
//                                         </span>
//                                     </div>
//                                     <span
//                                         className={
//                                             isChecked
//                                                 ? "gradient-text  font-semibold"
//                                                 : "text-neutral-500"
//                                         }
//                                     >
//                                         ({cat.count.toString().padStart(2, "0")}
//                                         )
//                                     </span>
//                                 </label>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>

//             {/* BRANDS SECTION */}
//             <div className="border-b border-neutral-800/60 pb-5">
//                 <button
//                     type="button"
//                     onClick={() =>
//                         setOpenSections((p) => ({ ...p, brands: !p.brands }))
//                     }
//                     className="w-full flex items-center justify-between text-white font-hanken font-bold text-sm md:text-base tracking-wide mb-3 text-left cursor-pointer"
//                 >
//                     BRANDS
//                     <ChevronDown
//                         className={`size-4 text-neutral-400 transition-transform ${
//                             openSections.brands ? "rotate-180" : ""
//                         }`}
//                     />
//                 </button>

//                 {openSections.brands && (
//                     <div className="space-y-3">
//                         <div className="relative mb-3">
//                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-neutral-500" />
//                             <input
//                                 type="text"
//                                 placeholder="Search product brand..."
//                                 value={brandSearch}
//                                 onChange={(e) =>
//                                     onBrandSearchChange(e.target.value)
//                                 }
//                                 className="w-full bg-black-900 border border-neutral-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 font-hanken"
//                             />
//                         </div>

//                         {filteredBrandList.map((b) => {
//                             const isChecked = selectedBrands.includes(b.id);
//                             return (
//                                 <label
//                                     key={b.id}
//                                     className="flex items-center justify-between cursor-pointer group text-xs font-hanken"
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <input
//                                             type="checkbox"
//                                             checked={isChecked}
//                                             onChange={() => onBrandToggle(b.id)}
//                                             className="size-4 rounded border-neutral-700 bg-black-900 accent-gold-500 cursor-pointer"
//                                         />
//                                         <span
//                                             className={
//                                                 isChecked
//                                                     ? "gradient-text  font-semibold"
//                                                     : "text-neutral-300 group-hover:text-white"
//                                             }
//                                         >
//                                             {b.label}
//                                         </span>
//                                     </div>
//                                     <span
//                                         className={
//                                             isChecked
//                                                 ? "gradient-text  font-semibold"
//                                                 : "text-neutral-500"
//                                         }
//                                     >
//                                         ({b.count.toString().padStart(2, "0")})
//                                     </span>
//                                 </label>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>

//             {/* PRICE RANGE SECTION */}
//             <div>
//                 <button
//                     type="button"
//                     onClick={() =>
//                         setOpenSections((p) => ({ ...p, price: !p.price }))
//                     }
//                     className="w-full flex items-center justify-between text-white font-hanken font-bold text-sm md:text-base tracking-wide mb-4 text-left cursor-pointer"
//                 >
//                     PRICE RANGE
//                     <ChevronDown
//                         className={`size-4 text-neutral-400 transition-transform ${
//                             openSections.price ? "rotate-180" : ""
//                         }`}
//                     />
//                 </button>

//                 {openSections.price && (
//                     <div className="space-y-3">
//                         {PRICE_RANGES.map((pr) => {
//                             const isChecked = selectedPriceRanges.includes(
//                                 pr.id,
//                             );
//                             return (
//                                 <label
//                                     key={pr.id}
//                                     className="flex items-center cursor-pointer group text-xs font-hanken"
//                                 >
//                                     <input
//                                         type="checkbox"
//                                         checked={isChecked}
//                                         onChange={() => onPriceToggle(pr.id)}
//                                         className=" size-4 rounded-full border-neutral-700 bg-black-900 accent-gold-500 cursor-pointer mr-3"
//                                     />
//                                     <span
//                                         className={
//                                             isChecked
//                                                 ? "gradient-text  font-semibold"
//                                                 : "text-neutral-300 group-hover:text-white"
//                                         }
//                                     >
//                                         {pr.label}
//                                     </span>
//                                 </label>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>
//         </aside>
//     );
// };

import { useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { CATEGORIES, PRICE_RANGES, type FilterOption } from "./data/shopData";
import { CustomCheckbox } from "@/components/common/CustomCheckbox";

interface ShopSidebarProps {
    selectedCategories: string[];
    selectedBrands: string[];
    selectedPriceRanges: string[];
    brandSearch: string;
    totalActiveFilters: number;
    filteredBrandList: FilterOption[];
    isMobileDrawer?: boolean;
    onCloseMobileDrawer?: () => void;
    onCategoryToggle: (id: string) => void;
    onBrandToggle: (id: string) => void;
    onPriceToggle: (id: string) => void;
    onBrandSearchChange: (value: string) => void;
    onClearAll: () => void;
}

export const ShopSidebar = ({
    selectedCategories,
    selectedBrands,
    selectedPriceRanges,
    brandSearch,
    totalActiveFilters,
    filteredBrandList,
    isMobileDrawer = false,
    onCloseMobileDrawer,
    onCategoryToggle,
    onBrandToggle,
    onPriceToggle,
    onBrandSearchChange,
    onClearAll,
}: ShopSidebarProps) => {
    const [openSections, setOpenSections] = useState({
        categories: true,
        brands: true,
        price: true,
    });

    return (
        <aside
            className={`bg-[#111111] border border-neutral-800/80 rounded-xl p-5 md:p-6 space-y-6 ${
                isMobileDrawer
                    ? "w-full h-full border-none rounded-none overflow-y-auto"
                    : "hidden lg:block lg:col-span-1"
            }`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <h3 className="font-playfair text-xl text-white font-bold tracking-wide">
                    Filters{" "}
                    {totalActiveFilters > 0 && `(${totalActiveFilters})`}
                </h3>

                <div className="flex items-center gap-3">
                    {totalActiveFilters > 0 && (
                        <button
                            type="button"
                            onClick={onClearAll}
                            className="text-xs text-gold-500 hover:underline font-hanken cursor-pointer"
                        >
                            Reset
                        </button>
                    )}

                    {/* Mobile Close Button */}
                    {isMobileDrawer && (
                        <button
                            type="button"
                            onClick={onCloseMobileDrawer}
                            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <X className="size-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* CATEGORIES SECTION */}
            <div className="border-b border-neutral-800/60 pb-5">
                <button
                    type="button"
                    onClick={() =>
                        setOpenSections((p) => ({
                            ...p,
                            categories: !p.categories,
                        }))
                    }
                    className="w-full flex items-center justify-between text-white font-hanken font-bold text-sm md:text-base tracking-wide mb-4 text-left cursor-pointer"
                >
                    CATEGORIES
                    <ChevronDown
                        className={`size-4 text-neutral-400 transition-transform ${
                            openSections.categories ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {openSections.categories && (
                    <div className="space-y-3">
                        {CATEGORIES.map((cat) => {
                            const isChecked = selectedCategories.includes(
                                cat.id,
                            );
                            return (
                                <CustomCheckbox
                                    key={cat.id}
                                    id={`cat-${cat.id}`}
                                    checked={isChecked}
                                    onCheckedChange={() =>
                                        onCategoryToggle(cat.id)
                                    }
                                    label={cat.label}
                                    count={cat.count}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            {/* BRANDS SECTION */}
            <div className="border-b border-neutral-800/60 pb-5">
                <button
                    type="button"
                    onClick={() =>
                        setOpenSections((p) => ({ ...p, brands: !p.brands }))
                    }
                    className="w-full flex items-center justify-between text-white font-hanken font-bold text-sm md:text-base tracking-wide mb-3 text-left cursor-pointer"
                >
                    BRANDS
                    <ChevronDown
                        className={`size-4 text-neutral-400 transition-transform ${
                            openSections.brands ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {openSections.brands && (
                    <div className="space-y-3">
                        <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-white" />
                            <input
                                type="text"
                                placeholder="Search product brand..."
                                value={brandSearch}
                                onChange={(e) =>
                                    onBrandSearchChange(e.target.value)
                                }
                                className="w-full bg-black-900 border-none rounded-md pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 font-hanken"
                            />
                        </div>

                        {filteredBrandList.map((b) => {
                            const isChecked = selectedBrands.includes(b.id);
                            return (
                                <CustomCheckbox
                                    key={b.id}
                                    id={`brand-${b.id}`}
                                    checked={isChecked}
                                    onCheckedChange={() => onBrandToggle(b.id)}
                                    label={b.label}
                                    count={b.count}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            {/* PRICE RANGE SECTION */}
            <div>
                <button
                    type="button"
                    onClick={() =>
                        setOpenSections((p) => ({ ...p, price: !p.price }))
                    }
                    className="w-full flex items-center justify-between text-white font-hanken font-bold text-sm md:text-base tracking-wide mb-4 text-left cursor-pointer"
                >
                    PRICE RANGE
                    <ChevronDown
                        className={`size-4 text-neutral-400 transition-transform ${
                            openSections.price ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {openSections.price && (
                    <div className="space-y-3">
                        {PRICE_RANGES.map((pr) => {
                            const isChecked = selectedPriceRanges.includes(
                                pr.id,
                            );
                            return (
                                <CustomCheckbox
                                    key={pr.id}
                                    id={`price-${pr.id}`}
                                    checked={isChecked}
                                    onCheckedChange={() => onPriceToggle(pr.id)}
                                    label={pr.label}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </aside>
    );
};
