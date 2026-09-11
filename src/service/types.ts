export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

// Backward-compatibility alias
export type AuthApiResponse<T = unknown> = ApiResponse<T>;

export interface ApiErrorResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
}

// ==========================================
// 1. AUTHENTICATION & CUSTOMER USER TYPES
// ==========================================

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponseData {
    email: string;
}

export interface VerifyEmailPayload {
    email: string;
    otp: string;
}

export interface VerifyEmailResponseData {
    email: string;
}

export interface ResendOtpPayload {
    email: string;
}

export interface ResendOtpResponseData {
    email: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface CustomerUser {
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role?: string;
    status?: string;
    createdAt?: string;
}

export interface LoginResponseData {
    customer: CustomerUser;
    token: string;
}

// ==========================================
// 2. CATALOGUE, CATEGORIES & PRODUCTS
// ==========================================

export interface Category {
    categoryId: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    status?: string;
}

export interface Brand {
    brandId: string;
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    image?: string;
    status?: string;
}

export interface SellingUnit {
    sellingUnitId: string;
    name: string; // e.g. "Piece", "Carton", "Pack of 6"
    sku: string;
    price: string | number;
    stock: number;
    status: string;
}

export interface ProductImage {
    productImageId?: string;
    imageUrl: string;
    altText?: string;
    isPrimary?: boolean;
    sortOrder?: number;
}

export interface ProductItem {
    productId: string;
    name: string;
    slug: string;
    description?: string;
    categoryId?: string;
    brandId?: string;
    status: string;
    featured?: boolean;
    category?: Category;
    brand?: Brand;
    images: ProductImage[];
    sellingUnits: SellingUnit[];
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface GetProductsParams {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    brandId?: string;
    featured?: boolean;
    sort?: "newest" | "name_asc" | "name_desc";
}

export interface ProductsResponseData {
    products: ProductItem[];
    pagination: PaginationMeta;
}

// ==========================================
// 3. CART TYPES
// ==========================================

export interface CartItemResponse {
    cartItemId: string;
    sellingUnitId: string;
    sellingUnit?: SellingUnit;
    product?: Partial<ProductItem>;
    name?: string;
    image?: string;
    quantity: number;
    unitPrice: string | number;
    totalPrice: string | number;
}

export interface CartResponseData {
    cartId: string;
    guestToken?: string;
    items: CartItemResponse[];
    itemCount: number;
    subtotal: string | number;
}

export interface AddToCartPayload {
    sellingUnitId: string;
    quantity: number;
}

export interface UpdateCartItemPayload {
    cartItemId: string;
    quantity: number;
}

// ==========================================
// 4. CHECKOUT & PAYMENT TYPES
// ==========================================

export interface CheckoutAddressPayload {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
}

export interface CheckoutResponseData {
    checkout: {
        reference: string;
        authorizationUrl: string;
        accessCode: string;
        subtotal: string;
        deliveryFee: string;
        total: string;
        currency: string;
    };
}

export interface VerifyCheckoutResponseData {
    paid: boolean;
    alreadyProcessed: boolean;
    order?: OrderDetailsData;
}

// ==========================================
// 5. CUSTOMER ACCOUNT & SAVED ADDRESSES
// ==========================================

export interface UpdateProfilePayload {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}

export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface AddressResponseItem {
    addressId: string;
    label?: string; // "Home", "Work", etc.
    firstName: string;
    lastName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
    isDefault: boolean;
    createdAt?: string;
}

export interface CreateAddressPayload {
    label?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
    isDefault?: boolean;
}

export interface UpdateAddressPayload {
    addressId: string;
    data: Partial<CreateAddressPayload>;
}

// ==========================================
// 6. ORDERS, TRACKING & REORDER TYPES
// ==========================================

export interface TrackOrderPayload {
    orderNumber: string;
    email: string;
}

export interface OrderItemDetail {
    orderItemId?: string;
    sellingUnitId?: string;
    productName?: string;
    productImage?: string;
    unitName?: string; // "Piece", "Carton"
    quantity: number;
    price: string | number;
    total: string | number;
    thumbnails?: string[];
}

export interface OrderSummaryItem {
    orderId: string;
    orderNumber: string;
    status: "processing" | "shipped" | "delivered" | "cancelled" | string;
    subtotal: string | number;
    deliveryFee: string | number;
    total: string | number;
    createdAt: string;
    date?: string;
    itemsCount?: number;
    thumbnails?: string[];
    items?: OrderItemDetail[];
}

export interface OrderDetailsData {
    orderId: string;
    orderNumber: string;
    status: "processing" | "shipped" | "delivered" | "cancelled" | string;
    subtotal: string | number;
    deliveryFee: string | number;
    total: string | number;
    currency?: string;
    items: OrderItemDetail[];
    shippingAddress?: {
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        addressLine1?: string;
        addressLine2?: string | null;
        city?: string;
        state?: string;
        country?: string;
    };
    placedAt?: string;
    createdAt?: string;
    estimatedDelivery?: string;
    timeline?: Array<{
        status: string;
        label: string;
        timestamp?: string;
        isCompleted?: boolean;
    }>;
}

export interface TrackOrderResponseData {
    orderNumber: string;
    status: "processing" | "shipped" | "delivered" | "cancelled" | string;
    subtotal?: string | number;
    deliveryFee?: string | number;
    total?: string | number;
    placedAt?: string;
    estimatedDelivery?: string;
    items?: OrderItemDetail[];
    shippingAddress?: Partial<AddressResponseItem>;
}

export interface ReorderResponseData {
    cart: CartResponseData;
}
