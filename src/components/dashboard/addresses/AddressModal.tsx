import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { ChevronDown, Loader2, X } from "lucide-react";
import { Country, State } from "country-state-city";
import type { AddressItem, AddressFormData } from "./types";

interface AddressFormProps {
    addressToEdit?: AddressItem | null;
    onSave: (
        data: AddressFormData,
        editId?: string,
        successCallback?: () => void,
    ) => Promise<void> | void;
    onClose: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
    addressToEdit,
    onSave,
    onClose,
}) => {
    const allCountries = useMemo(() => Country.getAllCountries(), []);

    const [country, setCountry] = useState<string>(
        addressToEdit?.country || "Nigeria",
    );

    const selectedCountryObj = useMemo(() => {
        if (!country) return null;
        return (
            allCountries.find(
                (c) =>
                    c.name.toLowerCase() === country.toLowerCase() ||
                    c.isoCode.toLowerCase() === country.toLowerCase(),
            ) || null
        );
    }, [allCountries, country]);

    const availableStates = useMemo(() => {
        if (!selectedCountryObj?.isoCode) return [];
        return State.getStatesOfCountry(selectedCountryObj.isoCode);
    }, [selectedCountryObj]);

    const [state, setState] = useState<string>(addressToEdit?.state || "");
    const [city, setCity] = useState<string>(addressToEdit?.city || "");
    const [address, setAddress] = useState<string>(
        addressToEdit?.address || addressToEdit?.addressLine1 || "",
    );
    const [phone, setPhone] = useState<string>(
        addressToEdit?.phone || addressToEdit?.phoneNumber || "",
    );
    const [isDefault, setIsDefault] = useState<boolean>(
        Boolean(addressToEdit?.isDefault),
    );
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!country) newErrors.country = "Country is required";
        if (availableStates.length > 0 && !state)
            newErrors.state = "State is required";
        if (!city.trim()) newErrors.city = "City is required";
        if (!address.trim()) newErrors.address = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCountryChange = (newCountryName: string) => {
        setCountry(newCountryName);
        setState(""); // Reset state when country changes
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await onSave(
                {
                    country: selectedCountryObj?.name || country,
                    state: state.trim(),
                    city: city.trim(),
                    address: address.trim(),
                    phone: phone.trim() || "",
                    title: addressToEdit?.title,
                    firstName: addressToEdit?.firstName,
                    lastName: addressToEdit?.lastName,
                    postalCode: addressToEdit?.postalCode,
                    isDefault,
                },
                addressToEdit?.id || addressToEdit?.addressId,
                () => {
                    onClose();
                },
            );
        } catch {
            // Stay open on error
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            {/* Country Field */}
            <div className="flex flex-col gap-2 w-full">
                <label
                    htmlFor="address-country"
                    className="text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                >
                    COUNTRY
                </label>
                <div className="relative w-full">
                    <select
                        id="address-country"
                        disabled={isSubmitting}
                        value={country}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm appearance-none outline-none focus:border-gold-400 transition-colors cursor-pointer pr-10 font-hanken disabled:opacity-60"
                    >
                        <option
                            value=""
                            disabled
                            className="bg-black-900 text-neutral-400"
                        >
                            Select Country
                        </option>
                        {allCountries.map((c) => (
                            <option
                                key={c.isoCode}
                                value={c.name}
                                className="bg-black-900 text-white py-2"
                            >
                                {c.name}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                </div>
                {errors.country && (
                    <span className="text-xs text-red-400 font-medium">
                        {errors.country}
                    </span>
                )}
            </div>

            {/* State Field */}
            <div className="flex flex-col gap-2 w-full">
                <label
                    htmlFor="address-state"
                    className="text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                >
                    STATE / PROVINCE
                </label>
                <div className="relative w-full">
                    {availableStates.length > 0 ? (
                        <>
                            <select
                                id="address-state"
                                disabled={isSubmitting}
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className={`w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-sm appearance-none outline-none focus:border-gold-400 transition-colors cursor-pointer pr-10 font-hanken disabled:opacity-60 ${
                                    state ? "text-white" : "text-neutral-400"
                                }`}
                            >
                                <option
                                    value=""
                                    disabled
                                    className="bg-black-900 text-neutral-400"
                                >
                                    Select State
                                </option>
                                {availableStates.map((st) => (
                                    <option
                                        key={st.isoCode || st.name}
                                        value={st.name}
                                        className="bg-black-900 text-white py-2"
                                    >
                                        {st.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                        </>
                    ) : (
                        <input
                            id="address-state"
                            type="text"
                            disabled={isSubmitting}
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="Enter State / Province / Region"
                            className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 focus:border-gold-400 focus:outline-none transition-colors font-hanken disabled:opacity-60"
                        />
                    )}
                </div>
                {errors.state && (
                    <span className="text-xs text-red-400 font-medium">
                        {errors.state}
                    </span>
                )}
            </div>

            {/* City Field */}
            <div className="flex flex-col gap-2 w-full">
                <label
                    htmlFor="address-city"
                    className="text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                >
                    CITY
                </label>
                <input
                    id="address-city"
                    type="text"
                    disabled={isSubmitting}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter City"
                    className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 focus:border-gold-400 focus:outline-none transition-colors font-hanken disabled:opacity-60"
                />
                {errors.city && (
                    <span className="text-xs text-red-400 font-medium">
                        {errors.city}
                    </span>
                )}
            </div>

            {/* Address Field */}
            <div className="flex flex-col gap-2 w-full">
                <label
                    htmlFor="address-street"
                    className="text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                >
                    ADDRESS
                </label>
                <input
                    id="address-street"
                    type="text"
                    disabled={isSubmitting}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Address"
                    className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 focus:border-gold-400 focus:outline-none transition-colors font-hanken disabled:opacity-60"
                />
                {errors.address && (
                    <span className="text-xs text-red-400 font-medium">
                        {errors.address}
                    </span>
                )}
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col gap-2 w-full">
                <label
                    htmlFor="address-phone"
                    className="text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                >
                    PHONE NUMBER
                </label>
                <input
                    id="address-phone"
                    type="tel"
                    disabled={isSubmitting}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Phone Number (e.g. 08012345678)"
                    className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 focus:border-gold-400 focus:outline-none transition-colors font-hanken disabled:opacity-60"
                />
                {errors.phone && (
                    <span className="text-xs text-red-400 font-medium">
                        {errors.phone}
                    </span>
                )}
            </div>

            {/* Set As Default Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer select-none py-1">
                <input
                    type="checkbox"
                    disabled={isSubmitting}
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="size-4 rounded bg-black-900 border border-neutral-700 text-gold-400 focus:ring-gold-400/20 focus:ring-2 cursor-pointer accent-[#e4c45b]"
                />
                <span className="text-xs sm:text-sm font-hanken text-neutral-300">
                    Set as default / active delivery address
                </span>
            </label>

            {/* Confirm Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-gold-gradient text-black-900 font-bold font-hanken py-3.5 px-6 rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-sm sm:text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                {isSubmitting ? "Saving..." : "Confirm"}
            </button>
        </form>
    );
};

export interface AddressModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    addressToEdit?: AddressItem | null;
    onSave: (
        data: AddressFormData,
        editId?: string,
        successCallback?: () => void,
    ) => Promise<void> | void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
    open,
    onOpenChange,
    addressToEdit,
    onSave,
}) => {
    const isEditing = Boolean(addressToEdit);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogOverlay className="bg-black/80 backdrop-blur-md z-50" />
            <DialogContent
                showCloseButton={false}
                className="bg-black-700 rounded-lg p-4 sm:p-6 w-full sm:w-full sm:max-w-172 text-white z-50 shadow-2xl ring-0 outline-none"
            >
                {/* Header with Title & Close Button */}
                <div className="flex items-center justify-between w-full mb-6">
                    <h2 className="font-playfair font-bold text-xl sm:text-[1.5625rem] text-white">
                        {isEditing ? "Edit Address" : "Add Address"}
                    </h2>
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="Close dialog"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Inner Form with key for instant clean state initialization without useEffect */}
                {open && (
                    <AddressForm
                        key={addressToEdit ? addressToEdit.id : "new-address"}
                        addressToEdit={addressToEdit}
                        onSave={onSave}
                        onClose={() => onOpenChange(false)}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AddressModal;
