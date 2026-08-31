import React from "react";
import { MapPin, Plus } from "lucide-react";

export interface AddressesEmptyStateProps {
    onAddNew: () => void;
}

export const AddressesEmptyState: React.FC<AddressesEmptyStateProps> = ({
    onAddNew,
}) => {
    return (
        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-10 sm:p-14 border border-neutral-800/60 shadow-xl flex flex-col items-center justify-center text-center w-full col-span-full my-4">
            <div className="size-16 rounded-full bg-black-900 border border-neutral-800 flex items-center justify-center text-gold-400 mb-4 shadow-inner">
                <MapPin className="size-8" />
            </div>

            <h3 className="font-playfair font-bold text-xl sm:text-2xl text-white mb-2">
                No Saved Addresses
            </h3>

            <p className="font-hanken text-xs sm:text-sm text-neutral-400 max-w-sm mb-6 leading-relaxed">
                You have not added any shipping addresses to your account yet.
                Add one to speed up your checkout process.
            </p>

            <button
                type="button"
                onClick={onAddNew}
                className="bg-gold-gradient text-black-900 font-bold font-hanken text-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2 shadow-md"
            >
                <Plus className="size-4" />
                <span>Add Your First Address</span>
            </button>
        </div>
    );
};

export default AddressesEmptyState;
