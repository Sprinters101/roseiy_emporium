import React from "react";
import { useAuth } from "@/context/AuthContext";
import {
    ProfilePersonalInfoCard,
    type ProfilePersonalInfoData,
} from "./profile/ProfilePersonalInfoCard";
import { ProfilePasswordCard } from "./profile/ProfilePasswordCard";
import { ProfileSkeleton } from "./profile/ProfileSkeleton";
import { useGetAccountProfile } from "@/service/queries";
import {
    useUpdateAccountProfile,
    useChangePassword,
} from "@/service/mutation";
import type { ChangePasswordPayload } from "@/service/types";

export interface CustomerProfileProps {
    isLoading?: boolean;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({
    isLoading: propIsLoading,
}) => {
    const { user, login, token } = useAuth();
    const { data: profileResponse, isLoading: queryLoading } =
        useGetAccountProfile();

    const updateProfileMutation = useUpdateAccountProfile();
    const changePasswordMutation = useChangePassword();

    const loading =
        propIsLoading !== undefined ? propIsLoading : queryLoading;

    if (loading) {
        return <ProfileSkeleton />;
    }

    const profile = profileResponse?.data;

    const personalInfo: ProfilePersonalInfoData = {
        firstName: profile?.firstName || user?.firstName || "",
        lastName: profile?.lastName || user?.lastName || "",
        phoneNumber: profile?.phoneNumber || user?.phoneNumber || "",
        emailAddress: profile?.email || user?.email || "",
    };

    const handleSavePersonalInfo = async (
        updatedData: ProfilePersonalInfoData,
    ) => {
        const res = await updateProfileMutation.mutateAsync({
            firstName: updatedData.firstName,
            lastName: updatedData.lastName,
            phoneNumber: updatedData.phoneNumber,
        });

        // Sync AuthContext user profile
        if (token) {
            login(token, {
                ...user,
                email: personalInfo.emailAddress,
                firstName: res?.data?.firstName || updatedData.firstName,
                lastName: res?.data?.lastName || updatedData.lastName,
                phoneNumber: res?.data?.phoneNumber || updatedData.phoneNumber,
            });
        }
    };

    const handleSavePassword = async (payload: ChangePasswordPayload) => {
        await changePasswordMutation.mutateAsync(payload);
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
                isLoading={updateProfileMutation.isPending}
            />

            {/* Password Card */}
            <ProfilePasswordCard
                onSave={handleSavePassword}
                isLoading={changePasswordMutation.isPending}
            />
        </div>
    );
};

export default CustomerProfile;

