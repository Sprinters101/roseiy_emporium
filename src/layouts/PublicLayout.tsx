import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { BackToTop } from "@/components/common/BackToTop";
import { Outlet, useLocation } from "react-router";

const AUTH_PATHS = [
    "/login",
    "/register",
    "/signup",
    "/verify-otp",
    "/forgot-password",
    "/reset-password",
];

export const PublicLayout = () => {
    const location = useLocation();
    const isAuthPage = AUTH_PATHS.includes(location.pathname);

    return (
        <div className="flex min-h-screen flex-col antialiased">
            {!isAuthPage && (
                <header className="sticky top-0 z-40 w-full">
                    <Navbar />
                </header>
            )}
            <main className="flex-1">
                <Outlet />
            </main>
            {!isAuthPage && <BackToTop />}
            <Footer isAuthPage={isAuthPage} />
        </div>
    );
};
