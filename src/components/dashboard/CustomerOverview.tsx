import React, { useState, useEffect } from "react";
import Container from "@/components/common/Container";
import { useAuth } from "@/context/AuthContext";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardStatsCard } from "./DashboardStatsCard";
import { RecentOrdersList } from "./RecentOrdersList";
import { CustomerOverviewSkeleton } from "./CustomerOverviewSkeleton";
import { Menu, X } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

export interface CustomerOverviewProps {
    isLoading?: boolean;
}

export const CustomerOverview: React.FC<CustomerOverviewProps> = ({
    isLoading: propIsLoading,
}) => {
    const { user } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(
        propIsLoading !== undefined ? propIsLoading : true
    );

    useEffect(() => {
        if (propIsLoading !== undefined) {
            setLoading(propIsLoading);
            return;
        }

        // Simulate data fetching delay so skeleton displays before data populates
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, [propIsLoading]);

    if (loading) {
        return <CustomerOverviewSkeleton />;
    }

    // Dynamic greeting based on hour of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    const userName = user?.firstName || "Bola";

    return (
        <div className="w-full bg-black-900 min-h-screen text-white pt-8 pb-24">
            <Container>
                {/* Header Greeting Bar */}
                <div className="flex items-center justify-between w-full mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-white tracking-tight">
                            {getGreeting()}, {userName} 🥂
                        </h1>
                        <p className="text-xs sm:text-sm text-neutral-400 font-hanken mt-1">
                            Here's what's happening with your account today
                        </p>
                    </div>

                    {/* Mobile Sidebar Sheet Trigger Button */}
                    <div className="md:hidden">
                        <Sheet
                            open={mobileMenuOpen}
                            onOpenChange={setMobileMenuOpen}
                        >
                            <SheetTrigger>
                                <button
                                    type="button"
                                    className="p-2.5 rounded-lg bg-black-700 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                                    aria-label="Open Navigation Menu"
                                >
                                    <Menu className="size-5" />
                                </button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="bg-black-900 border-r border-neutral-800 text-white p-6 pt-8 w-72"
                                showCloseButton={false}
                            >
                                <div className="flex items-center justify-between w-full mb-6 pb-4 border-b border-neutral-800">
                                    <span className="font-playfair font-bold text-lg text-white">
                                        Account Navigation
                                    </span>
                                    <SheetClose className="text-neutral-400 hover:text-white transition-colors">
                                        <X className="size-5" />
                                    </SheetClose>
                                </div>

                                <DashboardSidebar
                                    onItemClick={() => setMobileMenuOpen(false)}
                                />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                {/* Main 2-Column Content Layout */}
                <div className="flex flex-col md:flex-row gap-8 items-start w-full">
                    {/* Desktop Sidebar Navigation */}
                    <div className="hidden md:block w-64 shrink-0 sticky top-28">
                        <DashboardSidebar />
                    </div>

                    {/* Main Overview Dashboard View */}
                    <div className="flex-1 w-full min-w-0 flex flex-col gap-6">
                        {/* Section Header */}
                        <h2 className="font-playfair font-bold text-2xl md:text-3xl text-white">
                            Overview
                        </h2>

                        {/* Top Stats Cards Row */}
                        <DashboardStatsCard
                            activeOrdersCount={1}
                            completedOrdersCount={15}
                            savedAddressesCount={3}
                        />

                        {/* Recent Orders List Card Container */}
                        <RecentOrdersList />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CustomerOverview;
