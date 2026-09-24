import React from "react";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";
import type { DeliveryArea } from "@/service/types";

export interface ShippingInfoSectionProps {
    totalAmount: number;
    isSubmitting?: boolean;
    deliveryAreas?: DeliveryArea[];
    onDeliveryAreaChange?: (areaId: string) => void;
}

const COUNTRY_OPTIONS = [
    "Nigeria",
    "United Kingdom",
    "United States",
    "Ghana",
    "Canada",
];

const NIGERIA_STATES = [
    "Lagos",
    "Abuja (FCT)",
    "Rivers",
    "Oyo",
    "Ogun",
    "Enugu",
    "Delta",
    "Edo",
    "Kano",
    "Anambra",
    "Akwa Ibom",
    "Cross River",
    "Kaduna",
    "Ondo",
    "Imo",
];

export const ShippingInfoSection: React.FC<ShippingInfoSectionProps> = ({
    totalAmount,
    isSubmitting = false,
    deliveryAreas = [],
    onDeliveryAreaChange,
}) => {
    const areaOptions = deliveryAreas.map((area) => ({
        label: `${area.name} — ₦${Number(area.fee).toLocaleString()}${
            area.estimatedDeliveryTime ? ` (${area.estimatedDeliveryTime})` : ""
        }`,
        value: area.deliveryAreaId,
    }));

    return (
        <div className="bg-black-700 rounded-sm px-4 py-6 sm:p-8 flex flex-col gap-5">
            <h2 className="text-xl sm:text-[1.25rem] font-playfair font-bold text-white mb-1">
                Shipping Information
            </h2>

            {areaOptions.length > 0 && (
                <CustomSelect
                    name="deliveryAreaId"
                    label="DELIVERY REGION / AREA"
                    options={areaOptions}
                    placeholder="Select Delivery Region"
                    onChange={(val) => {
                        onDeliveryAreaChange?.(val);
                    }}
                />
            )}

            <CustomSelect
                name="country"
                label="COUNTRY"
                options={COUNTRY_OPTIONS}
                placeholder="Select Country"
            />

            <CustomSelect
                name="state"
                label="STATE"
                options={NIGERIA_STATES}
                placeholder="Select State"
            />

            <CustomInput name="city" label="CITY" placeholder="Enter City" />

            <CustomInput
                name="address"
                label="ADDRESS"
                placeholder="Enter Address"
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 bg-gold-g hover:opacity-95 text-black font-semibold text-body-c1 md:text-base py-3.5 px-6 rounded-sm transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-hanken"
            >
                {isSubmitting
                    ? "Processing Payment..."
                    : `Pay ₦${totalAmount.toLocaleString()}`}
            </button>
        </div>
    );
};

export default ShippingInfoSection;
