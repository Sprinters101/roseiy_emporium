import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export interface ProfilePasswordCardProps {
    initialPassword?: string;
    onSave?: (newPassword: string) => void;
}

export const ProfilePasswordCard: React.FC<ProfilePasswordCardProps> = ({
    initialPassword = "IamaCustomer",
    onSave,
}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [password, setPassword] = useState<string>(initialPassword);
    const [confirmPassword, setConfirmPassword] = useState<string>(initialPassword);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleStartEditing = () => {
        setConfirmPassword(password);
        setError("");
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!password) {
            setError("Password cannot be empty");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (onSave) {
            onSave(password);
        }
        setIsEditing(false);
        setError("");
        toast.success("Password updated successfully!");
    };

    return (
        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-5 w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <h2 className="font-playfair font-bold text-xl sm:text-[1.25rem] text-white">
                    Password
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

            {/* Password Fields */}
            <div className="flex flex-col gap-4 pt-1 w-full">
                {/* Password Input */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="profile-password"
                        className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                    >
                        PASSWORD
                    </label>
                    <div className="relative w-full">
                        <input
                            id="profile-password"
                            type={showPassword ? "text" : "password"}
                            disabled={!isEditing}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className={`w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 font-hanken transition-colors pr-11 ${
                                isEditing
                                    ? "focus:border-gold-400 focus:outline-none"
                                    : "cursor-default"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="size-4 text-neutral-400" />
                            ) : (
                                <Eye className="size-4 text-neutral-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm Password Input (Only when Editing) */}
                {isEditing && (
                    <div className="flex flex-col gap-1.5 animate-in fade-in duration-200">
                        <label
                            htmlFor="profile-confirm-password"
                            className="text-[11px] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken"
                        >
                            CONFIRM PASSWORD
                        </label>
                        <div className="relative w-full">
                            <input
                                id="profile-confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="w-full bg-black-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-neutral-500 font-hanken transition-colors pr-11 focus:border-gold-400 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                                aria-label={
                                    showConfirmPassword ? "Hide password" : "Show password"
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="size-4 text-neutral-400" />
                                ) : (
                                    <Eye className="size-4 text-neutral-400" />
                                )}
                            </button>
                        </div>
                    </div>
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
