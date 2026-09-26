import React, { useState } from "react";
import { Plus } from "lucide-react";
import { AddressCard } from "./addresses/AddressCard";
import { AddressModal } from "./addresses/AddressModal";
import { DeleteAddressModal } from "./addresses/DeleteAddressModal";
import { AddressesSkeleton } from "./addresses/AddressesSkeleton";
import { AddressesEmptyState } from "./addresses/AddressesEmptyState";
import { type AddressItem, type AddressFormData } from "./addresses/types";
import { useGetAddresses } from "@/service/queries";
import {
    useCreateAddress,
    useUpdateAddress,
    useDeleteAddress,
} from "@/service/mutation";
import type {
    AddressResponseItem,
    CreateAddressPayload,
} from "@/service/types";

export interface CustomerAddressesProps {
    isLoading?: boolean;
}

export const CustomerAddresses: React.FC<CustomerAddressesProps> = ({
    isLoading: propIsLoading,
}) => {
    const { data: addressesData, isLoading: queryLoading } = useGetAddresses();
    const createAddressMutation = useCreateAddress();
    const updateAddressMutation = useUpdateAddress();
    const deleteAddressMutation = useDeleteAddress();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingAddress, setEditingAddress] = useState<AddressItem | null>(
        null,
    );
    const [selectedAddressId, setSelectedAddressId] = useState<string>("");

    const [settingActiveId, setSettingActiveId] = useState<string>("");

    // Delete Confirmation Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [addressToDelete, setAddressToDelete] = useState<AddressItem | null>(
        null,
    );
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    // Normalizing addresses from backend response
    const addresses: AddressItem[] = React.useMemo(() => {
        if (!addressesData?.data) return [];
        const rawData = addressesData.data;
        const rawList: AddressResponseItem[] = Array.isArray(rawData)
            ? rawData
            : Array.isArray(
                    (rawData as { addresses?: AddressResponseItem[] })
                        .addresses,
                )
              ? (rawData as { addresses: AddressResponseItem[] }).addresses
              : [];

        return rawList.map((raw, idx) => {
            const id = raw.addressId || (raw as any).id || `addr-${idx}`;
            const street = raw.addressLine1 || (raw as any).address || "";
            const fullStreet = [street, raw.addressLine2]
                .filter(Boolean)
                .join(", ");
            const phone = raw.phoneNumber || (raw as any).phone || "";
            const title =
                raw.label ||
                (raw.firstName && raw.lastName
                    ? `${raw.firstName} ${raw.lastName}`
                    : `Shipping Address ${idx + 1}`);

            return {
                id,
                addressId: raw.addressId || id,
                title,
                country: raw.country || "Nigeria",
                state: raw.state || "",
                city: raw.city || "",
                address: fullStreet,
                addressLine1: raw.addressLine1 || street,
                addressLine2: raw.addressLine2 || null,
                phone: phone || "+234 812 345 6789",
                phoneNumber: phone,
                firstName: raw.firstName,
                lastName: raw.lastName,
                postalCode: raw.postalCode,
                isDefault: Boolean(raw.isDefault),
            };
        });
    }, [addressesData]);

    // Initialize default selected address
    React.useEffect(() => {
        if (addresses.length > 0) {
            const defaultAddr = addresses.find((a) => a.isDefault);
            if (defaultAddr) {
                setSelectedAddressId(defaultAddr.id);
            } else if (!selectedAddressId) {
                setSelectedAddressId(addresses[0].id);
            }
        }
    }, [addresses]);

    const loading = propIsLoading !== undefined ? propIsLoading : queryLoading;

    if (loading) {
        return <AddressesSkeleton />;
    }

    const handleSelectAddress = async (id: string) => {
        const selected = addresses.find((a) => a.id === id);
        if (!selected) return;

        setSelectedAddressId(id);

        if (selected.isDefault) {
            return;
        }

        // Call PATCH /account/addresses/:addressId with isDefault: true
        setSettingActiveId(id);
        try {
            await updateAddressMutation.mutateAsync({
                addressId: selected.addressId || id,
                data: {
                    isDefault: true,
                },
            });
        } catch {
            // Handled in mutation onError toast
        } finally {
            setSettingActiveId("");
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

    const handleOpenDeleteModal = (id: string) => {
        const target = addresses.find((a) => a.id === id) || null;
        setAddressToDelete(target || ({ id } as any));
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!addressToDelete) return;
        setIsDeleting(true);
        try {
            const id = addressToDelete.id || (addressToDelete as any).addressId;
            await deleteAddressMutation.mutateAsync(id);
            if (selectedAddressId === id && addresses.length > 1) {
                const remaining = addresses.filter((a) => a.id !== id);
                if (remaining.length > 0) {
                    setSelectedAddressId(remaining[0].id);
                }
            }
            setIsDeleteModalOpen(false);
            setAddressToDelete(null);
        } catch {
            // Handled in mutation onError toast
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSaveAddress = async (
        formData: AddressFormData,
        editId?: string,
        successCallback?: () => void,
    ) => {
        if (editId) {
            // Update existing address
            try {
                await updateAddressMutation.mutateAsync({
                    addressId: editId,
                    data: {
                        label: formData.title,
                        firstName: formData.firstName || "",
                        lastName: formData.lastName || "",
                        phoneNumber: formData.phone || "",
                        addressLine1: formData.address,
                        city: formData.city,
                        state: formData.state,
                        postalCode: formData.postalCode || "",
                        country: formData.country,
                        isDefault: formData.isDefault,
                    },
                });
                successCallback?.();
            } catch {
                // Handled in mutation onError toast
            }
        } else {
            // Create new address
            try {
                const newIndex = addresses.length + 1;
                const payload: CreateAddressPayload = {
                    label: formData.title || `Shipping Address ${newIndex}`,
                    firstName: formData.firstName || "Customer",
                    lastName: formData.lastName || `Address ${newIndex}`,
                    phoneNumber: formData.phone || "",
                    addressLine1: formData.address,
                    addressLine2: null,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode || "",
                    country: formData.country,
                    isDefault:
                        formData.isDefault !== undefined
                            ? formData.isDefault
                            : addresses.length === 0,
                };

                const res = await createAddressMutation.mutateAsync(payload);
                if (
                    (addresses.length === 0 || formData.isDefault) &&
                    res?.data?.addressId
                ) {
                    setSelectedAddressId(res.data.addressId);
                }
                successCallback?.();
            } catch {
                // Handled in mutation onError toast
            }
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
                            isSettingActive={settingActiveId === address.id}
                            onSelect={handleSelectAddress}
                            onEdit={handleOpenEditModal}
                            onDelete={handleOpenDeleteModal}
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

            {/* Delete Confirmation Dialog Modal */}
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

export default CustomerAddresses;
