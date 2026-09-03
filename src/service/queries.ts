import { useQuery } from "@tanstack/react-query";
import { userProfileFunc } from "./api";

/**
 * Query Key Constants
 */
export const authQueryKeys = {
    all: ["auth"] as const,
    userProfile: ["userProfile"] as const,
};

/**
 * Hook for Fetching Current User Profile
 */
export const useGetUserProfile = () => {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: () => userProfileFunc(),
        staleTime: Infinity, // Data is always fresh, never auto-refetches
        retry: false,
    });
};

// Backward-compatibility alias
export const useGetCustomerProfile = useGetUserProfile;
