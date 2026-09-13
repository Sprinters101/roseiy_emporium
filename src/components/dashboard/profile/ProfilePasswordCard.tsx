import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { ChangePasswordPayload } from "@/service/types";

export interface ProfilePasswordCardProps {
    onSave?: (payload: ChangePasswordPayload) => Promise<void> | void;
    isLoading?: boolean;
}

export const ProfilePasswordCard: React.FC<ProfilePasswordCardProps> = ({
    onSave,
    isLoading = false,
}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const [error, setError] = useState<string>("");
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const handleStartEditing = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        setIsEditing(true);
    };

    const handleCancel = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (!currentPassword) {
            setError("Current password is required");
            return;
        }
        if (!newPassword) {
            setError("New password cannot be empty");
            return;
        }
        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        setIsSaving(true);
        try {
            if (onSave) {
                await onSave({
                    currentPassword,
                    newPassword,
                    confirmPassword,
                });
            }
            setIsEditing(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setError("");
        } catch {
            // Handled in mutation onError
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-5 w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <h2 className="font-playfair font-bold text-xl sm:text-[1.25rem] text-white">
                    Password
                </h2>

                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            disabled={isSaving}
                            onClick={handleCancel}
                            className="bg-transparent border border-neutral-700/80 text-neutral-300 rounded-md text-xs font-hanken px-3 py-1.5 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            disabled={isSaving || isLoading}
                            onClick={handleSave}
                            className="bg-gold-gradient text-black-900 font-semibold rounded-md text-xs font-hanken px-4 py-1.5 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={handleStartEditing}
                        className="bg-black-900 border border-neutral-700/80 text-white rounded-md text-xs font-hanken px-4 py-1.5 hover:bg-neutral-800 hover:border-gold-400/40 transition-colors cursor-pointer"
                    >
                        Change Password
                    </button>
                )}
            </div>

            {/* Password Fields */}
            <div className="flex flex-col gap-4 pt-1 w-full">
                {!isEditing ? (
                    /* Display Masked Password */
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken">
                            PASSWORD
                        </label>
                        <div className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-neutral-400 text-sm font-mono tracking-widest cursor-default select-none">
                            ••••••••••••
                        </div>
                    </div>
                ) : (
                    /* Edit Password Inputs */
                    <>
                        {/* Current Password */}
                        <div className="flex flex-col gap-1.5 animate-in fade-in duration-150">
                            <label
                                htmlFor="profile-current-password"
                                className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                            >
                                CURRENT PASSWORD
                            </label>
                            <div className="relative w-full">
                                <input
                                    id="profile-current-password"
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter Current Password"
                                    className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 font-hanken transition-colors pr-11 focus:border-gold-400 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                                    aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="size-4 text-neutral-400" />
                                    ) : (
                                        <Eye className="size-4 text-neutral-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="flex flex-col gap-1.5 animate-in fade-in duration-150">
                            <label
                                htmlFor="profile-new-password"
                                className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                            >
                                NEW PASSWORD
                            </label>
                            <div className="relative w-full">
                                <input
                                    id="profile-new-password"
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter New Password (min 6 characters)"
                                    className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 font-hanken transition-colors pr-11 focus:border-gold-400 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword((prev) => !prev)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="size-4 text-neutral-400" />
                                    ) : (
                                        <Eye className="size-4 text-neutral-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div className="flex flex-col gap-1.5 animate-in fade-in duration-150">
                            <label
                                htmlFor="profile-confirm-password"
                                className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                            >
                                CONFIRM NEW PASSWORD
                            </label>
                            <div className="relative w-full">
                                <input
                                    id="profile-confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm New Password"
                                    className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 font-hanken transition-colors pr-11 focus:border-gold-400 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="size-4 text-neutral-400" />
                                    ) : (
                                        <Eye className="size-4 text-neutral-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {error && (
                    <span className="text-xs text-red-400 font-medium">
                        {error}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ProfilePasswordCard;

