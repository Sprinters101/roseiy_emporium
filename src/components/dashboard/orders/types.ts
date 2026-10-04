import {
    donJulioReposadoImg,
    hennessyXoImg,
    claseAzulImg,
    champagneImg,
} from "@/lib/site_data";

export interface OrderItemData {
    id: string;
    orderNumber: string;
    itemsCount: number;
    date: string;
    totalAmount: string;
    status: "ongoing" | "delivered";
    thumbnails: string[];
}

export type OrderTabType = "ongoing" | "delivered";

export interface OrderItemDetail {
    id: string;
    category: string;
    name: string;
    description?: string;
    quantityText: string;
    price: string;
    image: string;
    brandName: string;
}

export interface OrderDetailsData {
    orderNumber: string;
    placedDate: string;
    itemsCount: number;
    totalAmount: string;
    items: OrderItemDetail[];
    shippingAddress: {
        title: string;
        address: string;
        deliveryFee: string;
    };
}

// Ongoing mock orders matching design screenshot
export const ONGOING_ORDERS: OrderItemData[] = [
    {
        id: "ongoing-1",
        orderNumber: "RE-2026-7890",
        itemsCount: 10,
        date: "May 15, 2026",
        totalAmount: "₦12,510,000",
        status: "ongoing",
        thumbnails: [donJulioReposadoImg, hennessyXoImg, claseAzulImg],
    },
];

// Delivered mock orders matching design screenshot
export const DELIVERED_ORDERS: OrderItemData[] = [
    {
        id: "del-1",
        orderNumber: "RE-2026-7890",
        itemsCount: 5,
        date: "May 15, 2026",
        totalAmount: "₦2,510,000",
        status: "delivered",
        thumbnails: [donJulioReposadoImg, hennessyXoImg, claseAzulImg],
    },
    {
        id: "del-2",
        orderNumber: "RE-2026-7890",
        itemsCount: 1,
        date: "June 10, 2025",
        totalAmount: "₦180,000",
        status: "delivered",
        thumbnails: [donJulioReposadoImg],
    },
    {
        id: "del-3",
        orderNumber: "RE-2026-7890",
        itemsCount: 2,
        date: "August 22, 2027",
        totalAmount: "₦75,000",
        status: "delivered",
        thumbnails: [hennessyXoImg, claseAzulImg],
    },
    {
        id: "del-4",
        orderNumber: "RE-2026-7890",
        itemsCount: 5,
        date: "May 15, 2026",
        totalAmount: "₦2,510,000",
        status: "delivered",
        thumbnails: [donJulioReposadoImg, hennessyXoImg, claseAzulImg],
    },
    {
        id: "del-5",
        orderNumber: "RE-2026-7890",
        itemsCount: 2,
        date: "June 10, 2025",
        totalAmount: "₦180,000",
        status: "delivered",
        thumbnails: [champagneImg, claseAzulImg],
    },
    {
        id: "del-6",
        orderNumber: "RE-2026-7890",
        itemsCount: 8,
        date: "August 22, 2027",
        totalAmount: "₦75,000",
        status: "delivered",
        thumbnails: [claseAzulImg, hennessyXoImg, donJulioReposadoImg],
    },
    {
        id: "del-7",
        orderNumber: "RE-2026-7890",
        itemsCount: 2,
        date: "June 10, 2025",
        totalAmount: "₦180,000",
        status: "delivered",
        thumbnails: [champagneImg, claseAzulImg],
    },
    {
        id: "del-8",
        orderNumber: "RE-2026-7890",
        itemsCount: 1,
        date: "June 10, 2025",
        totalAmount: "₦180,000",
        status: "delivered",
        thumbnails: [donJulioReposadoImg],
    },
];
