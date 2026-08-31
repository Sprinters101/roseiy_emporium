import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { LayoutGrid, ShoppingBag, MapPin, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export interface DashboardSidebarProps {
    className?: string;
    onItemClick?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
    className = "",
    onItemClick,
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menuItems = [
        {
            name: "Overview",
            href: "/dashboard",
            icon: LayoutGrid,
            exact: true,
        },
        {
            name: "Orders",
            href: "/dashboard/orders",
            icon: ShoppingBag,
        },
        {
            name: "Addresses",
            href: "/dashboard/addresses",
            icon: MapPin,
        },
        {
            name: "Profile",
            href: "/dashboard/profile",
            icon: User,
        },
    ];

    const isActive = (href: string, exact?: boolean) => {
        if (exact) {
            return location.pathname === href || location.pathname === `${href}/`;
        }
        if (href === "/dashboard/orders") {
            return (
                location.pathname.startsWith("/dashboard/orders") ||
                location.pathname.startsWith("/dashboard/order-details") ||
                location.pathname.startsWith("/dashboard/track-order")
            );
        }
        return location.pathname.startsWith(href);
    };

    const handleLogout = () => {
        logout();
        if (onItemClick) onItemClick();
        navigate("/login");
    };

    return (
        <div
            className={`bg-black-700 rounded-xl p-5 border border-neutral-800/60 shadow-xl flex flex-col gap-2 ${className}`}
        >
            {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href, item.exact);

                return (
                    <Link
                        key={item.name}
                        to={item.href}
                        onClick={onItemClick}
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-hanken transition-all cursor-pointer ${
                            active
                                ? "bg-white/5 text-gold-500 font-semibold border-l-2 border-gold-500 pl-3.5"
                                : "text-neutral-300 hover:text-white font-medium hover:bg-white/5"
                        }`}
                    >
                        <Icon
                            className={`size-4.5 shrink-0 ${
                                active ? "text-gold-500" : "text-neutral-400"
                            }`}
                        />
                        <span>{item.name}</span>
                    </Link>
                );
            })}

            {/* Logout Option */}
            <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-hanken font-medium text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer mt-4 border-t border-neutral-800/80 pt-4 text-left w-full"
            >
                <LogOut className="size-4.5 text-red-500 shrink-0" />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default DashboardSidebar;
