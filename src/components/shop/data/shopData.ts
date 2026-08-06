export interface FilterOption {
    id: string;
    label: string;
    count: number;
}

export interface PriceRangeOption {
    id: string;
    label: string;
    min: number;
    max: number;
}

export interface ShopFilterState {
    selectedCategories: string[];
    selectedBrands: string[];
    selectedPriceRanges: string[];
    brandSearch: string;
    sortBy: string;
}

export const CATEGORIES: FilterOption[] = [
    { id: "Champagne", label: "Champagne", count: 48 },
    { id: "Sweetwine", label: "Sweetwine", count: 45 },
    { id: "Whiskey", label: "Whiskey", count: 19 },
    { id: "Cognac", label: "Cognac", count: 16 },
    { id: "Tequila", label: "Tequila", count: 5 },
    { id: "Gin", label: "Gin", count: 32 },
    { id: "Rum", label: "Rum", count: 27 },
    { id: "Drink Accessories", label: "Drink Accessories", count: 17 },
];

export const BRANDS: FilterOption[] = [
    { id: "Glenfiddich", label: "Glenfiddich", count: 27 },
    { id: "Don Julio", label: "Don Julio", count: 45 },
    { id: "Veuve Clicquot", label: "Veuve Clicquot", count: 19 },
    { id: "Hennessy", label: "Hennessy", count: 16 },
    { id: "Casamigos", label: "Casamigos", count: 5 },
    { id: "Moet & Chandon", label: "Moet & Chandon", count: 32 },
    { id: "Clase Azul", label: "Clase Azul", count: 27 },
];

export const PRICE_RANGES: PriceRangeOption[] = [
    { id: "5k-50k", label: "₦5,000 - ₦50,000", min: 5000, max: 50000 },
    { id: "50k-150k", label: "₦50,000 - ₦150,000", min: 50000, max: 150000 },
    { id: "150k-200k", label: "₦150,000 - ₦200,000", min: 150000, max: 200000 },
    { id: "200k-plus", label: "₦200,000 +", min: 200000, max: Infinity },
];
