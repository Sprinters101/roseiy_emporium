// src/layouts/DashboardLayout.tsx (Shared by Client & Admin, or adapt into two separate files)
import { Outlet, Link, useNavigate } from "react-router";

interface DashboardLayoutProps {
    isAdmin?: boolean;
}

export const DashboardLayout = ({ isAdmin = false }: DashboardLayoutProps) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-muted/40">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center border-b px-6 font-semibold tracking-tight">
                    {isAdmin ? "Admin Portal" : "Client Account"}
                </div>
                <nav className="flex-1 space-y-1 px-4 py-4">
                    {isAdmin ? (
                        <>
                            <Link
                                to="/admin"
                                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                            >
                                Overview
                            </Link>
                            <Link
                                to="/admin/products"
                                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                            >
                                Manage Inventory
                            </Link>
                            <Link
                                to="/admin/orders"
                                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                            >
                                All Orders
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/dashboard"
                                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                            >
                                Profile Home
                            </Link>
                            <Link
                                to="/dashboard/orders"
                                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                            >
                                Order History
                            </Link>
                        </>
                    )}
                </nav>
                <div className="p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col sm:pl-64">
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
