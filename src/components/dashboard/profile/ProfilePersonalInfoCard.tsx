import React, { useState } from "react";
import { toast } from "@/components/ui/sonner";

export interface ProfilePersonalInfoData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
}

export interface ProfilePersonalInfoCardProps {
    initialData: ProfilePersonalInfoData;
    onSave: (data: ProfilePersonalInfoData) => void;
}

export const ProfilePersonalInfoCard: React.FC<
    ProfilePersonalInfoCardProps
> = ({ initialData, onSave }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<ProfilePersonalInfoData>(initialData);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleStartEditing = () => {
        setFormData(initialData);
        setErrors({});
        setIsEditing(true);
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        if (!formData.emailAddress.trim()) {
            newErrors.emailAddress = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
            newErrors.emailAddress = "Enter a valid email address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        onSave(formData);
        setIsEditing(false);
        toast.success("Personal information updated successfully!");
    };

    return (
        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-5 w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <h2 className="font-playfair font-bold text-xl sm:text-[1.25rem] text-white">
                    Personal Information
                </h2>

                {isEditing ? (
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-black-900 border border-neutral-700/80 text-white rounded-md text-xs font-hanken px-4 py-1.5 hover:bg-neutral-800 hover:border-gold-400/40 transition-colors cursor-pointer"
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleStartEditing}
                        className="bg-black-900 border border-neutral-700/80 text-white rounded-md text-xs font-hanken px-4 py-1.5 hover:bg-neutral-800 hover:border-gold-400/40 transition-colors cursor-pointer"
                    >
                        Edit
                    </button>
                )}
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4 pt-1 w-full">
                {/* 2-Column Name Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="profile-first-name"
                            className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                        >
                            FIRST NAME
                        </label>
                        <input
                            id="profile-first-name"
                            type="text"
                            disabled={!isEditing}
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    firstName: e.target.value,
                                }))
                            }
                            placeholder="Enter First Name"
                            className={`w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 font-hanken transition-colors ${
                                isEditing
                                    ? "focus:border-gold-400 focus:outline-none"
                                    : "cursor-default text-white"
                            }`}
                        />
                        {errors.firstName && (
                            <span className="text-xs text-red-400 font-medium">
                                {errors.firstName}
                            </span>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="profile-last-name"
                            className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                        >
                            LAST NAME
                        </label>
                        <input
                            id="profile-last-name"
                            type="text"
                            disabled={!isEditing}
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    lastName: e.target.value,
                                }))
                            }
                            placeholder="Enter Last Name"
                            className={`w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 font-hanken transition-colors ${
                                isEditing
                                    ? "focus:border-gold-400 focus:outline-none"
                                    : "cursor-default text-white"
                            }`}
                        />
                        {errors.lastName && (
                            <span className="text-xs text-red-400 font-medium">
                                {errors.lastName}
                            </span>
                        )}
                    </div>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="profile-phone-number"
                        className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                    >
                        PHONE NUMBER
                    </label>
                    <input
                        id="profile-phone-number"
                        type="tel"
                        disabled={!isEditing}
                        value={formData.phoneNumber}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                phoneNumber: e.target.value,
                            }))
                        }
                        placeholder="Enter Phone Number"
                        className={`w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 font-hanken transition-colors ${
                            isEditing
                                ? "focus:border-gold-400 focus:outline-none"
                                : "cursor-default text-white"
                        }`}
                    />
                    {errors.phoneNumber && (
                        <span className="text-xs text-red-400 font-medium">
                            {errors.phoneNumber}
                        </span>
                    )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="profile-email-address"
                        className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                    >
                        EMAIL ADDRESS
                    </label>
                    <input
                        id="profile-email-address"
                        type="email"
                        disabled={!isEditing}
                        value={formData.emailAddress}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                emailAddress: e.target.value,
                            }))
                        }
                        placeholder="Enter Email Address"
                        className={`w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 font-hanken transition-colors ${
                            isEditing
                                ? "focus:border-gold-400 focus:outline-none"
                                : "cursor-default text-white"
                        }`}
                    />
                    {errors.emailAddress && (
                        <span className="text-xs text-red-400 font-medium">
                            {errors.emailAddress}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePersonalInfoCard;
