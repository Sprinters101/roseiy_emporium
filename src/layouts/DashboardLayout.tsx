import { BackToTop } from "@/components/common/BackToTop";
import { Footer } from "@/components/common/Footer";
import { Hero } from "@/components/common/Hero";
import { Navbar } from "@/components/common/Navbar";
import ScrollToTop from "@/components/common/ScrollToTop";
import { Outlet } from "react-router";

interface DashboardLayoutProps {
    isAdmin?: boolean;
}

export const DashboardLayout = ({ isAdmin = false }: DashboardLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col antialiased bg-black-900 text-white">
            <ScrollToTop />
            <header className="sticky top-0 z-40 w-full">
                <Navbar />
            </header>
            <Hero
                title={isAdmin ? "Admin Portal" : "My Account"}
                subtitle={
                    <div className="mt-1 font-hanken text-sm sm:text-base">
                        Manage your orders, addresses and personal information all in one place.
                    </div>
                }
            />

            {/* Main Content Area */}
            <main className="flex-1 w-full bg-black-900">
                <Outlet />
            </main>

            <BackToTop />
            <Footer />
        </div>
    );
};
