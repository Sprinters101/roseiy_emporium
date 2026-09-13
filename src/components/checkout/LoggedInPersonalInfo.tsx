import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export interface PersonalInfoData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
}

export interface LoggedInPersonalInfoProps {
    personalInfo: PersonalInfoData;
    onSave: (
        info: PersonalInfoData,
        successCallback?: () => void,
    ) => Promise<void> | void;
    isLoading?: boolean;
}

export const LoggedInPersonalInfo: React.FC<LoggedInPersonalInfoProps> = ({
    personalInfo,
    onSave,
    isLoading = false,
}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState<PersonalInfoData>(personalInfo);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleStartEditing = () => {
        setFormData(personalInfo);
        setErrors({});
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData(personalInfo);
        setErrors({});
        setIsEditing(false);
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.firstName.trim())
            newErrors.firstName = "First name is required";
        if (!formData.lastName.trim())
            newErrors.lastName = "Last name is required";
        if (!formData.phoneNumber.trim())
            newErrors.phoneNumber = "Phone number is required";
        if (!formData.emailAddress.trim()) {
            newErrors.emailAddress = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
            newErrors.emailAddress = "Enter a valid email address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await onSave(formData, () => {
                setIsEditing(false);
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const fullName =
        `${personalInfo.firstName} ${personalInfo.lastName}`.trim() ||
        "Bola Roseiy";

    return (
        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-5 w-full">
            {/* Header: Title & Action Buttons */}
            <div className="flex items-center justify-between w-full">
                <h2 className="font-playfair font-bold text-xl sm:text-[1.25rem] text-white">
                    Personal Information
                </h2>

                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="bg-transparent border border-neutral-700/80 text-neutral-300 rounded-md text-xs font-hanken px-3 py-1.5 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSubmitting}
                            className="bg-black-900 border border-neutral-700/80 text-white rounded-md text-xs font-hanken px-3.5 py-1.5 hover:bg-neutral-800 hover:border-gold-400/40 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                        >
                            {isSubmitting && (
                                <Loader2 className="size-3 animate-spin" />
                            )}
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={handleStartEditing}
                        className="bg-black-900 border border-neutral-700/80 text-white rounded-md text-xs font-hanken px-3.5 py-1.5 hover:bg-neutral-800 hover:border-gold-400/40 transition-colors cursor-pointer"
                    >
                        Edit Information
                    </button>
                )}
            </div>

            {/* Content: Loading Skeleton vs View Mode vs Edit Mode */}
            {isLoading ? (
                <div className="flex flex-col gap-4 pt-1">
                    <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-3 w-16 bg-neutral-800" />
                        <Skeleton className="h-5 w-40 bg-neutral-800" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-3 w-24 bg-neutral-800" />
                        <Skeleton className="h-5 w-36 bg-neutral-800" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-3 w-24 bg-neutral-800" />
                        <Skeleton className="h-5 w-48 bg-neutral-800" />
                    </div>
                </div>
            ) : !isEditing ? (
                <div className="flex flex-col gap-4 pt-1">
                    {/* Full Name */}
                    <div className="flex flex-col">
                        <span className="text-xs text-neutral-400 font-hanken">
                            Full Name
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white font-hanken mt-0.5">
                            {fullName}
                        </span>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col">
                        <span className="text-xs text-neutral-400 font-hanken">
                            Phone Number
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white font-hanken mt-0.5">
                            {personalInfo.phoneNumber || "090 123 456 7890"}
                        </span>
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col">
                        <span className="text-xs text-neutral-400 font-hanken">
                            Email Address
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white font-hanken mt-0.5">
                            {personalInfo.emailAddress || "Rosebola@gmail.com"}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-4 pt-1 w-full">
                    {/* Names 2-Col Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="checkout-first-name"
                                className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                            >
                                FIRST NAME
                            </label>
                            <input
                                id="checkout-first-name"
                                type="text"
                                disabled={isSubmitting}
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        firstName: e.target.value,
                                    }))
                                }
                                placeholder="Enter Full Name"
                                className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3 text-white text-sm placeholder:text-neutral-500 focus:border-gold-400 focus:outline-none transition-colors font-hanken disabled:opacity-60"
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
                                htmlFor="checkout-last-name"
                                className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                            >
                                LAST NAME
                            </label>
                            <input
                                id="checkout-last-name"
                                type="text"
                                disabled={isSubmitting}
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        lastName: e.target.value,
                                    }))
                                }
                                placeholder="Enter Full Name"
                                className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3 text-white text-sm placeholder:text-neutral-500 focus:border-gold-400 focus:outline-none transition-colors font-hanken disabled:opacity-60"
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
                            htmlFor="checkout-phone-number"
                            className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                        >
                            PHONE NUMBER
                        </label>
                        <input
                            id="checkout-phone-number"
                            type="tel"
                            disabled={isSubmitting}
                            value={formData.phoneNumber}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    phoneNumber: e.target.value,
                                }))
                            }
                            placeholder="Enter Phone Number"
                            className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3 text-white text-sm placeholder:text-neutral-500 focus:border-gold-400 focus:outline-none transition-colors font-hanken disabled:opacity-60"
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
                            htmlFor="checkout-email-address"
                            className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                        >
                            EMAIL ADDRESS
                        </label>
                        <input
                            id="checkout-email-address"
                            type="email"
                            disabled={isSubmitting}
                            value={formData.emailAddress}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    emailAddress: e.target.value,
                                }))
                            }
                            placeholder="Enter Email Address"
                            className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3 text-white text-sm placeholder:text-neutral-500 focus:border-gold-400 focus:outline-none transition-colors font-hanken disabled:opacity-60"
                        />
                        {errors.emailAddress && (
                            <span className="text-xs text-red-400 font-medium">
                                {errors.emailAddress}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoggedInPersonalInfo;
