import { Navbar } from "@/components/common/Navbar";
import { Outlet } from "react-router";

export const PublicLayout = () => {
    return (
        <div className="flex min-h-screen flex-col  antialiased">
            <header className="sticky top-0 z-40 w-full ">
                <Navbar />
            </header>
            <main className="flex-1 ">
                <Outlet />
            </main>
        </div>
    );
};
