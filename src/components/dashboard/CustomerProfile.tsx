import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProfilePersonalInfoCard, type ProfilePersonalInfoData } from "./profile/ProfilePersonalInfoCard";
import { ProfilePasswordCard } from "./profile/ProfilePasswordCard";
import { ProfileSkeleton } from "./profile/ProfileSkeleton";

export interface CustomerProfileProps {
    isLoading?: boolean;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({
    isLoading: propIsLoading,
}) => {
    const { user, login, token } = useAuth();

    const [simulatedLoading, setSimulatedLoading] = useState<boolean>(
        propIsLoading === undefined
    );

    // Personal Info state (initialized from user context or design defaults)
    const [personalInfo, setPersonalInfo] = useState<ProfilePersonalInfoData>(() => {
        const saved = localStorage.getItem("roseiy_user_profile");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                // Ignore parse errors
            }
        }
        return {
            firstName: user?.firstName || "Roseiy",
            lastName: user?.lastName || "Bola",
            phoneNumber: "090 123 456 7890",
            emailAddress: user?.email || "Rosebola@gmail.com",
        };
    });

    const [password, setPassword] = useState<string>(() => {
        return localStorage.getItem("roseiy_user_password") || "IamaCustomer";
    });

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
        return <ProfileSkeleton />;
    }

    const handleSavePersonalInfo = (updatedData: ProfilePersonalInfoData) => {
        setPersonalInfo(updatedData);
        localStorage.setItem("roseiy_user_profile", JSON.stringify(updatedData));

        // Also update AuthContext user profile if logged in
        if (token) {
            login(token, {
                ...user,
                firstName: updatedData.firstName,
                lastName: updatedData.lastName,
                email: updatedData.emailAddress,
            });
        }
    };

    const handleSavePassword = (newPassword: string) => {
        setPassword(newPassword);
        localStorage.setItem("roseiy_user_password", newPassword);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Section Header */}
            <h2 className="font-playfair font-bold text-2xl md:text-3xl text-white">
                Profile
            </h2>

            {/* Personal Information Card */}
            <ProfilePersonalInfoCard
                initialData={personalInfo}
                onSave={handleSavePersonalInfo}
            />

            {/* Password Card */}
            <ProfilePasswordCard
                initialPassword={password}
                onSave={handleSavePassword}
            />
        </div>
    );
};

export default CustomerProfile;
