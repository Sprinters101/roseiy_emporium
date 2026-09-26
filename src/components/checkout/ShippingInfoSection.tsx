import React, { useMemo } from "react";
import { useFormikContext } from "formik";
import { Country, State } from "country-state-city";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";

export interface ShippingInfoSectionProps {
    totalAmount: number;
    isSubmitting?: boolean;
}

export const ShippingInfoSection: React.FC<ShippingInfoSectionProps> = ({
    totalAmount,
    isSubmitting = false,
}) => {
    const { values, setFieldValue } = useFormikContext<{
        country?: string;
        state?: string;
    }>();

    const allCountries = useMemo(() => Country.getAllCountries(), []);

    const selectedCountryObj = useMemo(() => {
        if (!values?.country) return null;
        return (
            allCountries.find(
                (c) =>
                    c.name.toLowerCase() === values.country?.toLowerCase() ||
                    c.isoCode.toLowerCase() === values.country?.toLowerCase(),
            ) || null
        );
    }, [allCountries, values?.country]);

    const availableStates = useMemo(() => {
        if (!selectedCountryObj?.isoCode) return [];
        return State.getStatesOfCountry(selectedCountryObj.isoCode);
    }, [selectedCountryObj]);

    const countryOptions = useMemo(
        () => allCountries.map((c) => ({ label: c.name, value: c.name })),
        [allCountries],
    );

    const stateOptions = useMemo(
        () =>
            availableStates.map((st) => ({
                label: st.name,
                value: st.name,
            })),
        [availableStates],
    );

    return (
        <div className="bg-black-700 rounded-sm px-4 py-6 sm:p-8 flex flex-col gap-5">
            <h2 className="text-xl sm:text-[1.25rem] font-playfair font-bold text-white mb-1">
                Shipping Information
            </h2>

            <CustomSelect
                name="country"
                label="COUNTRY"
                options={countryOptions}
                placeholder="Select Country"
                onChange={(val) => {
                    setFieldValue("country", val);
                    setFieldValue("state", "");
                }}
            />

            {availableStates.length > 0 ? (
                <CustomSelect
                    name="state"
                    label="STATE / PROVINCE"
                    options={stateOptions}
                    placeholder="Select State"
                />
            ) : (
                <CustomInput
                    name="state"
                    label="STATE / PROVINCE"
                    placeholder="Enter State / Province / Region"
                />
            )}

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
