export interface Product {
    id: string;
    name: string;
    category: string;
    volume: string;
    piecesLeft?: number;
    casesLeft?: number;
    price: number;
    image: string;
    isFeatured?: boolean;
    brand?: string;
    gallery?: string[];
    description?: string;
    tastingNotes?: {
        nose?: string;
        taste?: string;
        finish?: string;
    };
    details?: {
        abv?: string;
        country?: string;
        region?: string;
    };
}

export interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onToggleWishlist?: (productId: string) => void;
    className?: string;
    isLandingPage?: boolean;
}
