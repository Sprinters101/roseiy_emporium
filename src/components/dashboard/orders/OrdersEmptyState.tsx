import React from "react";
import { useNavigate } from "react-router";
import type { OrderTabType } from "./types";
import { ShopEmptyState } from "@/components/shop/ShopEmptyState";

interface OrdersEmptyStateProps {
    activeTab: OrderTabType;
}

export const OrdersEmptyState: React.FC<OrdersEmptyStateProps> = ({
    activeTab,
}) => {
    const navigate = useNavigate();

    return (
        <ShopEmptyState
            title={`No ${activeTab === "ongoing" ? "Ongoing" : "Delivered"} Orders`}
            description={
                activeTab === "ongoing"
                    ? "You don't have any ongoing orders at the moment."
                    : "You haven't completed any orders yet."
            }
            buttonText="Start Shopping"
            onButtonClick={() => navigate("/shop")}
            imageSrc="https://res.cloudinary.com/dzk1a6bjt/image/upload/v1785057214/image_35_i4k23o.png"
        />
    );
};

export default OrdersEmptyState;
