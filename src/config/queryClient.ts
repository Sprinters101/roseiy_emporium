import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 2,
            refetchOnWindowFocus: false,
            retry: 2,
        },
        mutations: {
            // Global error logging layout for data modifications
            onError: (error: any) => {
                console.error(
                    "Mutation Error Global Catch:",
                    error?.message || error,
                );
            },
        },
    },
});
