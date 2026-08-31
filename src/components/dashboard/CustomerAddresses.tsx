import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { Plus } from "lucide-react";
import { AddressCard } from "./addresses/AddressCard";
import { AddressModal } from "./addresses/AddressModal";
import { AddressesSkeleton } from "./addresses/AddressesSkeleton";
import { AddressesEmptyState } from "./addresses/AddressesEmptyState";
import {
    INITIAL_ADDRESSES,
    type AddressItem,
    type AddressFormData,
} from "./addresses/types";

export interface CustomerAddressesProps {
    isLoading?: boolean;
}

export const CustomerAddresses: React.FC<CustomerAddressesProps> = ({
    isLoading: propIsLoading,
}) => {
    const [addresses, setAddresses] = useState<AddressItem[]>(() => {
        const saved = localStorage.getItem("roseiy_user_addresses");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return INITIAL_ADDRESSES;
            }
        }
        return INITIAL_ADDRESSES;
    });

    const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
        const defaultAddr = addresses.find((a) => a.isDefault);
        return defaultAddr ? defaultAddr.id : addresses[0]?.id || "";
    });

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);

    const [simulatedLoading, setSimulatedLoading] = useState<boolean>(
        propIsLoading === undefined
    );

    // Persist changes to localStorage
    useEffect(() => {
        localStorage.setItem("roseiy_user_addresses", JSON.stringify(addresses));
    }, [addresses]);

    useEffect(() => {
        if (propIsLoading !== undefined) return;

        const timer = setTimeout(() => {
            setSimulatedLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [propIsLoading]);

    const loading =
        propIsLoading !== undefined ? propIsLoading : simulatedLoading;

    if (loading) {
        return <AddressesSkeleton />;
    }

    const handleSelectAddress = (id: string) => {
        setSelectedAddressId(id);
        setAddresses((prev) =>
            prev.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
            }))
        );
        const selected = addresses.find((a) => a.id === id);
        if (selected) {
            toast.success(`Active address set to ${selected.title}`);
        }
    };

    const handleOpenAddModal = () => {
        setEditingAddress(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (address: AddressItem) => {
        setEditingAddress(address);
        setIsModalOpen(true);
    };

    const handleDeleteAddress = (id: string) => {
        const target = addresses.find((a) => a.id === id);
        setAddresses((prev) => {
            const next = prev.filter((a) => a.id !== id);
            // If the deleted one was selected, select the first remaining
            if (selectedAddressId === id && next.length > 0) {
                setSelectedAddressId(next[0].id);
                next[0].isDefault = true;
            }
            return next;
        });
        toast.success(
            target
                ? `${target.title} deleted successfully.`
                : "Address deleted."
        );
    };

    const handleSaveAddress = (formData: AddressFormData, editId?: string) => {
        if (editId) {
            // Update existing address
            setAddresses((prev) =>
                prev.map((addr) => {
                    if (addr.id === editId) {
                        return {
                            ...addr,
                            country: formData.country,
                            state: formData.state,
                            city: formData.city,
                            address: formData.address,
                            phone: formData.phone || addr.phone,
                        };
                    }
                    return addr;
                })
            );
            toast.success("Address updated successfully!");
        } else {
            // Create new address
            const newIndex = addresses.length + 1;
            const newAddress: AddressItem = {
                id: `addr-${Date.now()}`,
                title: formData.title || `Shipping Address ${newIndex}`,
                country: formData.country,
                state: formData.state,
                city: formData.city,
                address: formData.address,
                phone: formData.phone || "+234 812 345 6789",
                isDefault: addresses.length === 0,
            };

            setAddresses((prev) => [...prev, newAddress]);
            if (addresses.length === 0) {
                setSelectedAddressId(newAddress.id);
            }
            toast.success("New address added successfully!");
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Header: Title & Add New Address Action Button */}
            <div className="flex items-center justify-between gap-4 w-full">
                <h2 className="font-playfair font-bold text-2xl md:text-[1.75rem] text-white">
                    Addresses
                </h2>

                <button
                    type="button"
                    onClick={handleOpenAddModal}
                    className="bg-gold-gradient text-black-900 font-semibold font-hanken text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-sm sm:rounded-md hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5 shadow-md shrink-0"
                >
                    <Plus className="size-4 text-black-900" />
                    <span>Add New Address</span>
                </button>
            </div>

            {/* Address Cards Grid */}
            {addresses.length === 0 ? (
                <AddressesEmptyState onAddNew={handleOpenAddModal} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full">
                    {addresses.map((address) => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            isSelected={selectedAddressId === address.id}
                            onSelect={handleSelectAddress}
                            onEdit={handleOpenEditModal}
                            onDelete={handleDeleteAddress}
                        />
                    ))}
                </div>
            )}

            {/* Add / Edit Address Dialog Modal */}
            <AddressModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                addressToEdit={editingAddress}
                onSave={handleSaveAddress}
            />
        </div>
    );
};

export default CustomerAddresses;
