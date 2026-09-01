import React, { useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { ChevronDown, X } from "lucide-react";
import {
    COUNTRY_OPTIONS,
    NIGERIA_STATES,
    type AddressItem,
    type AddressFormData,
} from "./types";

interface AddressFormProps {
    addressToEdit?: AddressItem | null;
    onSave: (data: AddressFormData, editId?: string) => void;
    onClose: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
    addressToEdit,
    onSave,
    onClose,
}) => {
    const [country, setCountry] = useState<string>(
        addressToEdit?.country || "Nigeria",
    );
    const [state, setState] = useState<string>(addressToEdit?.state || "");
    const [city, setCity] = useState<string>(addressToEdit?.city || "");
    const [address, setAddress] = useState<string>(
        addressToEdit?.address || "",
    );
    const phone = addressToEdit?.phone || "+234 812 345 6789";
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!country) newErrors.country = "Country is required";
        if (!state) newErrors.state = "State is required";
        if (!city.trim()) newErrors.city = "City is required";
        if (!address.trim()) newErrors.address = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        onSave(
            {
                country,
                state,
                city: city.trim(),
                address: address.trim(),
                phone: phone.trim() || "+234 812 345 6789",
                title: addressToEdit?.title,
            },
            addressToEdit?.id,
        );

        onClose();
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
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm appearance-none outline-none focus:border-gold-400 transition-colors cursor-pointer pr-10 font-hanken"
                    >
                        {COUNTRY_OPTIONS.map((c) => (
                            <option
                                key={c}
                                value={c}
                                className="bg-black-900 text-white py-2"
                            >
                                {c}
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
                    STATE
                </label>
                <div className="relative w-full">
                    <select
                        id="address-state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className={`w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-sm appearance-none outline-none focus:border-gold-400 transition-colors cursor-pointer pr-10 font-hanken ${
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
                        {NIGERIA_STATES.map((st) => (
                            <option
                                key={st}
                                value={st}
                                className="bg-black-900 text-white py-2"
                            >
                                {st}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
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
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter City"
                    className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 focus:border-gold-400 focus:outline-none transition-colors font-hanken"
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Address"
                    className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 focus:border-gold-400 focus:outline-none transition-colors font-hanken"
                />
                {errors.address && (
                    <span className="text-xs text-red-400 font-medium">
                        {errors.address}
                    </span>
                )}
            </div>

            {/* Confirm Button */}
            <button
                type="submit"
                className="w-full mt-2 bg-gold-gradient text-black-900 font-bold font-hanken py-3.5 px-6 rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-sm sm:text-base shadow-md"
            >
                Confirm
            </button>
        </form>
    );
};

export interface AddressModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    addressToEdit?: AddressItem | null;
    onSave: (data: AddressFormData, editId?: string) => void;
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
