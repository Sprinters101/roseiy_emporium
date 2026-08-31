import React, { useState } from "react";
import { Outlet } from "react-router";
import Container from "@/components/common/Container";
import { useAuth } from "@/context/AuthContext";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Menu, X } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

export const ClientDashboardLayout: React.FC = () => {
    const { user } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Dynamic greeting based on current time
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
                {/* Persistent Header Greeting Bar */}
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

                {/* Main 2-Column Persistent Content Layout */}
                <div className="flex flex-col md:flex-row gap-8 items-start w-full">
                    {/* Desktop Persistent Static Sidebar Navigation */}
                    <div className="hidden md:block w-64 shrink-0 sticky top-28">
                        <DashboardSidebar />
                    </div>

                    {/* Dynamic Page Content Outlet */}
                    <div className="flex-1 w-full min-w-0">
                        <Outlet />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ClientDashboardLayout;
