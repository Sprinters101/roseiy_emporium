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

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    email: string;
    otp: string;
    password: string;
    confirmPassword: string;
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
    cartMerged?: boolean;
}

// ==========================================
// 2. CATALOGUE, CATEGORIES & PRODUCTS
// ==========================================

export interface Category {
    categoryId: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type CategoriesResponseData = Category[] | { categories: Category[] };

export interface Brand {
    brandId: string;
    name: string;
    slug: string;
    description?: string | null;
    logo?: string;
    image?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type BrandsResponseData = Brand[] | { brands: Brand[] };

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
    items?: ProductItem[];
    pagination: PaginationMeta;
}

// ==========================================
// 3. CART TYPES
// ==========================================

export interface CartProductImage {
    imageUrl: string;
    altText?: string;
}

export interface CartProductItem {
    productId: string;
    name: string;
    slug: string;
    status?: string;
    category?: string | { id?: string; name: string };
    volume?: string;
    image?: string | CartProductImage;
    images?: Array<{ imageUrl: string; isPrimary?: boolean }>;
    sellingUnits?: SellingUnit[];
}

export interface CartItemResponse {
    cartItemId: string;
    quantity: number;
    unitPrice: string | number;
    lineTotal?: string | number;
    totalPrice?: string | number;
    availableStock?: number;
    sellingUnitId?: string;
    sellingUnit?: {
        sellingUnitId: string;
        name: string;
        sku?: string | null;
        status?: string;
        price?: string | number;
        stock?: number;
    };
    product?: CartProductItem;
    name?: string;
    image?: string | CartProductImage;
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

export interface SetProductQuantitiesItem {
    sellingUnitId: string;
    quantity: number;
}

export interface SetProductQuantitiesPayload {
    productId?: string;
    items?: SetProductQuantitiesItem[];
    quantities?: Record<string, number>;
    [key: string]: unknown;
}

export interface UpdateCartItemPayload {
    cartItemId: string;
    quantity: number;
}

// ==========================================
// 4. CHECKOUT, DELIVERY AREAS & PAYMENT TYPES
// ==========================================

export interface DeliveryArea {
    deliveryAreaId: string;
    name: string;
    fee: string | number;
    state?: string;
    city?: string;
    description?: string;
    estimatedDeliveryTime?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type DeliveryAreasResponseData =
    | DeliveryArea[]
    | { deliveryAreas: DeliveryArea[] }
    | { areas: DeliveryArea[] };

export interface CheckoutAddressPayload {
    deliveryAreaId?: string;
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
    callbackUrl?: string;
}

export interface CheckoutResponseData {
    checkout?: {
        reference: string;
        authorizationUrl: string;
        authorization_url?: string;
        accessCode?: string;
        access_code?: string;
        subtotal?: string | number;
        deliveryFee?: string | number;
        total?: string | number;
        currency?: string;
    };
    reference?: string;
    authorizationUrl?: string;
    authorization_url?: string;
    accessCode?: string;
    access_code?: string;
    subtotal?: string | number;
    deliveryFee?: string | number;
    total?: string | number;
    currency?: string;
}

export interface VerifyCheckoutResponseData {
    paid: boolean;
    alreadyProcessed?: boolean;
    paymentStatus?: string;
    reference?: string;
    order?: OrderDetailsData;
}

export interface AccountPaymentItem {
    paymentId: string;
    orderId?: string;
    orderNumber?: string;
    reference: string;
    amount: string | number;
    currency: string;
    channel?: string;
    status: string;
    paidAt?: string | null;
    createdAt: string;
}

export type AccountPaymentsResponseData =
    | AccountPaymentItem[]
    | { payments: AccountPaymentItem[] };

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
    customerId?: string;
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
    updatedAt?: string;
}

export interface AddressListData {
    addresses: AddressResponseItem[];
}

export type AddressesResponseData = AddressListData | AddressResponseItem[];

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
    orderItemId: string;
    orderId?: string;
    productId?: string;
    sellingUnitId?: string;
    productName: string;
    sellingUnitName?: string;
    sku?: string | null;
    unitPrice: string | number;
    quantity: number;
    lineTotal: string | number;
    createdAt?: string;
    updatedAt?: string;

    // Optional / legacy aliases or frontend convenience
    id?: string;
    name?: string;
    price?: string | number;
    total?: string | number;
    unitName?: string;
    productImage?: string;
    thumbnails?: string[];
    image?: string;
    volume?: string;
    category?: string;
    quantityText?: string;
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
    customerId?: string;
    paymentReference?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    addressLine1?: string;
    addressLine2?: string | null;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    currency?: string;
    subtotal: string | number;
    deliveryFee: string | number;
    total: string | number;
    status:
        | "cancelled"
        | "processing"
        | "shipped"
        | "delivered"
        | "pending"
        | string;
    paidAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
    placedAt?: string;
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
        postalCode?: string;
    };
    estimatedDelivery?: string;
    timeline?: Array<{
        status: string;
        label: string;
        timestamp?: string;
        isCompleted?: boolean;
    }>;
}

export type SingleOrderResponseData =
    | { order: OrderDetailsData }
    | OrderDetailsData;

export interface TrackOrderStep {
    status: string;
    label: string;
    completed: boolean;
    occurredAt?: string | null;
}

export interface TrackOrderTimelineItem {
    orderStatusHistoryId: string;
    status: string;
    previousStatus?: string | null;
    occurredAt: string;
    derived?: boolean;
    label: string;
}

export interface TrackOrderProgress {
    orderId: string;
    orderNumber: string;
    currentStatus: string;
    cancelled: boolean;
    steps: TrackOrderStep[];
    timeline: TrackOrderTimelineItem[];
}

export interface TrackOrderResponseData {
    order?: OrderDetailsData;
    progress?: TrackOrderProgress;
    orderNumber?: string;
    status?: "processing" | "shipped" | "delivered" | "cancelled" | string;
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

// ==========================================
// 7. REVIEWS & RATINGS TYPES
// ==========================================

export interface ReviewProductInfo {
    productId: string;
    name: string;
    slug: string;
    images?: Array<{ imageUrl: string; altText?: string }>;
}

export interface ReviewItem {
    reviewId: string;
    orderId?: string;
    customerId?: string;
    productId: string;
    displayName: string;
    rating: number;
    title?: string;
    comment: string;
    status: "published" | string;
    createdAt: string;
    product?: ReviewProductInfo;
}

export interface LatestReviewsResponseData {
    reviews: ReviewItem[];
}

export interface ReviewsPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PublishedReviewsResponseData {
    reviews: ReviewItem[];
    pagination: ReviewsPagination;
}

export interface SubmitReviewPayload {
    orderNumber: string;
    productId: string;
    rating: number;
    comment: string;
    title?: string;
    email?: string;
}

export interface SubmitReviewResponseData {
    review: {
        reviewId: string;
        status: string;
    };
}
