import React, { useState } from "react";
import { PenLine, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AddressModal } from "@/components/dashboard/addresses/AddressModal";
import { DeleteAddressModal } from "@/components/dashboard/addresses/DeleteAddressModal";
import type {
    AddressItem,
    AddressFormData,
} from "@/components/dashboard/addresses/types";

export interface LoggedInShippingInfoProps {
    addresses: AddressItem[];
    selectedAddressId: string;
    onSelectAddress: (id: string) => void;
    onAddNewAddress: (
        data: AddressFormData,
        successCallback?: () => void,
    ) => Promise<void> | void;
    onEditAddress: (
        data: AddressFormData,
        editId?: string,
        successCallback?: () => void,
    ) => Promise<void> | void;
    onDeleteAddress?: (
        id: string,
        successCallback?: () => void,
    ) => Promise<void> | void;
    isLoading?: boolean;
}

export const LoggedInShippingInfo: React.FC<LoggedInShippingInfoProps> = ({
    addresses,
    selectedAddressId,
    onSelectAddress,
    onAddNewAddress,
    onEditAddress,
    onDeleteAddress,
    isLoading = false,
}) => {
    const [isMultiView, setIsMultiView] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [addressToEdit, setAddressToEdit] = useState<AddressItem | null>(null);

    // Delete modal states
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [addressToDelete, setAddressToDelete] = useState<AddressItem | null>(
        null,
    );
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const selectedAddress =
        addresses.find((a) => a.id === selectedAddressId) ||
        addresses[0] ||
        null;

    const handleOpenAddModal = () => {
        setAddressToEdit(null);
        setModalOpen(true);
    };

    const handleOpenEditModal = (addr: AddressItem) => {
        setAddressToEdit(addr);
        setModalOpen(true);
    };

    const handleOpenDeleteModal = (addr: AddressItem) => {
        setAddressToDelete(addr);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!addressToDelete || !onDeleteAddress) return;
        setIsDeleting(true);
        try {
            await onDeleteAddress(addressToDelete.id, () => {
                setIsDeleteModalOpen(false);
                setAddressToDelete(null);
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSaveAddress = async (
        data: AddressFormData,
        editId?: string,
        successCallback?: () => void,
    ) => {
        if (editId) {
            await onEditAddress(data, editId, () => {
                successCallback?.();
                setIsMultiView(false);
            });
        } else {
            await onAddNewAddress(data, () => {
                successCallback?.();
                setIsMultiView(false);
            });
        }
    };

    const handleSelectAddress = (id: string) => {
        onSelectAddress(id);
        setIsMultiView(false); // Collapses list to hide other addresses after selection
    };

    return (
        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-5 w-full">
            {/* Header: Title & Action Button */}
            <div className="flex items-center justify-between w-full">
                <h2 className="font-playfair font-bold text-xl sm:text-[1.25rem] text-white">
                    Shipping Information
                </h2>

                {isMultiView ? (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setIsMultiView(false)}
                            className="bg-transparent border border-neutral-700/80 text-neutral-300 rounded-md text-xs font-hanken px-3 py-1.5 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleOpenAddModal}
                            className="bg-black-900 border border-neutral-700/80 text-white rounded-md text-xs font-hanken px-3.5 py-1.5 hover:bg-neutral-800 hover:border-gold-400/40 transition-colors cursor-pointer"
                        >
                            Add New Address
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsMultiView(true)}
                        className="bg-black-900 border border-neutral-700/80 text-white rounded-md text-xs font-hanken px-3.5 py-1.5 hover:bg-neutral-800 hover:border-gold-400/40 transition-colors cursor-pointer"
                    >
                        Change Address
                    </button>
                )}
            </div>

            {/* Address View: Loading Skeleton vs Single Default vs All Addresses */}
            {isLoading ? (
                <div className="bg-black-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-neutral-800/80 flex items-start justify-between gap-4 w-full">
                    <div className="flex items-start gap-3.5 sm:gap-4 min-w-0 flex-1">
                        <Skeleton className="size-5 rounded-full bg-neutral-800 shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-2 min-w-0 flex-1">
                            <Skeleton className="h-5 w-32 bg-neutral-800" />
                            <Skeleton className="h-4 w-3/4 bg-neutral-800" />
                            <Skeleton className="h-4 w-28 bg-neutral-800" />
                        </div>
                    </div>
                    <Skeleton className="size-8 sm:size-9 rounded-full bg-neutral-800 shrink-0" />
                </div>
            ) : !isMultiView ? (
                selectedAddress ? (
                    <div className="bg-black-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gold-400 shadow-[0_0_16px_rgba(228,196,91,0.08)] flex items-start justify-between gap-4 w-full">
                        {/* Left: Radio Dot & Details */}
                        <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                            <div className="size-5 rounded-full border-2 border-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                                <div className="size-2.5 rounded-full bg-gold-400" />
                            </div>

                            <div className="flex flex-col min-w-0">
                                <h3 className="font-hanken font-bold text-base sm:text-lg text-white">
                                    {selectedAddress.title}
                                </h3>
                                <p className="font-hanken text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                                    {selectedAddress.address}
                                </p>
                                <p className="font-hanken text-xs sm:text-sm text-neutral-400 mt-1">
                                    {selectedAddress.phone}
                                </p>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                onClick={() =>
                                    handleOpenEditModal(selectedAddress)
                                }
                                className="size-8 sm:size-9 rounded-full bg-black-900 border border-neutral-800/80 flex items-center justify-center text-white hover:bg-neutral-800 hover:text-gold-400 hover:border-gold-400/40 transition-all cursor-pointer shrink-0"
                                aria-label="Edit address"
                            >
                                <PenLine className="size-3.5 sm:size-4" />
                            </button>
                            {onDeleteAddress && addresses.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleOpenDeleteModal(selectedAddress)
                                    }
                                    className="size-8 sm:size-9 rounded-full bg-black-900 border border-neutral-800/80 flex items-center justify-center text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer shrink-0"
                                    aria-label="Delete address"
                                >
                                    <Trash2 className="size-3.5 sm:size-4" />
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="py-6 flex flex-col items-center justify-center gap-3 text-center">
                        <p className="text-neutral-400 text-sm font-hanken">
                            No shipping address saved yet.
                        </p>
                        <button
                            type="button"
                            onClick={handleOpenAddModal}
                            className="bg-black-900 border border-neutral-700/80 text-white rounded-md text-xs font-hanken px-3.5 py-1.5 hover:bg-neutral-800 hover:border-gold-400/40 transition-colors cursor-pointer"
                        >
                            Add Shipping Address
                        </button>
                    </div>
                )
            ) : (
                <div className="flex flex-col gap-3.5 w-full">
                    {addresses.map((address) => {
                        const isSelected = address.id === selectedAddressId;

                        return (
                            <div
                                key={address.id}
                                onClick={() => handleSelectAddress(address.id)}
                                className={cn(
                                    "bg-black-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 relative",
                                    isSelected
                                        ? "border border-gold-400 shadow-[0_0_16px_rgba(228,196,91,0.08)]"
                                        : "border border-neutral-800/60 hover:border-neutral-700/80",
                                )}
                            >
                                {/* Left: Radio Dot & Details */}
                                <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectAddress(address.id);
                                        }}
                                        className="size-5 rounded-full border-2 border-gold-400 flex items-center justify-center shrink-0 mt-0.5 cursor-pointer focus:outline-none"
                                        aria-label={`Select ${address.title}`}
                                        role="radio"
                                        aria-checked={isSelected}
                                    >
                                        {isSelected && (
                                            <div className="size-2.5 rounded-full bg-gold-400 animate-in fade-in zoom-in duration-150" />
                                        )}
                                    </button>

                                    <div className="flex flex-col min-w-0">
                                        <h3 className="font-hanken font-bold text-base sm:text-lg text-white">
                                            {address.title}
                                        </h3>
                                        <p className="font-hanken text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                                            {address.address}
                                        </p>
                                        <p className="font-hanken text-xs sm:text-sm text-neutral-400 mt-1">
                                            {address.phone}
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Action Buttons (Edit & Delete) */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenEditModal(address);
                                        }}
                                        className="size-8 sm:size-9 rounded-full bg-black-900 border border-neutral-800/80 flex items-center justify-center text-white hover:bg-neutral-800 hover:text-gold-400 hover:border-gold-400/40 transition-all cursor-pointer shrink-0"
                                        aria-label={`Edit ${address.title}`}
                                    >
                                        <PenLine className="size-3.5 sm:size-4" />
                                    </button>
                                    {onDeleteAddress &&
                                        addresses.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenDeleteModal(
                                                        address,
                                                    );
                                                }}
                                                className="size-8 sm:size-9 rounded-full bg-black-900 border border-neutral-800/80 flex items-center justify-center text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer shrink-0"
                                                aria-label={`Delete ${address.title}`}
                                            >
                                                <Trash2 className="size-3.5 sm:size-4" />
                                            </button>
                                        )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Address Add / Edit Modal */}
            <AddressModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                addressToEdit={addressToEdit}
                onSave={handleSaveAddress}
            />

            {/* Delete Confirmation Modal */}
            <DeleteAddressModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                address={addressToDelete}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default LoggedInShippingInfo;
