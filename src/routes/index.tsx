import { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ProtectedRoute, AdminRoute } from "@/routes/guards";
import Home from "@/components/home/Home";
import Shop from "@/components/shop/Shop";
import ProductDetails from "@/components/produtcs/ProductDetails";
import Wishlist from "@/components/wishlist/wishlist";
import Privacy from "@/components/policy/Privacy";
import ContactUs from "@/components/contact/ContactUs";
import Checkout from "@/components/checkout/Checkout";
import TrackOrder from "@/components/track-order/TrackOrder";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import VerifyOtp from "@/components/auth/VerifyOtp";
import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";

import CustomerOverview from "@/components/dashboard/CustomerOverview";

// Placeholder Views (Replace with actual components)

const ClientOrders = () => <div>List of client orders</div>;

// Lazy Load Admin Views to drastically optimize initial bundle performance
// const AdminOverview = React.lazy(() => import("@/features/admin/Overview"));
const AdminProducts = () => <div>Admin Product Management Table</div>;

export const router = createBrowserRouter([
    // 1. Public Domain Paths
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "shop", element: <Shop /> },
            { path: "contact", element: <ContactUs /> },
            { path: "checkout", element: <Checkout /> },
            { path: "track-order", element: <TrackOrder /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "signup", element: <Register /> },
            { path: "verify-otp", element: <VerifyOtp /> },
            { path: "forgot-password", element: <ForgotPassword /> },
            { path: "reset-password", element: <ResetPassword /> },
            { path: "product/:id", element: <ProductDetails /> },
            { path: "wishlist", element: <Wishlist /> },
            { path: "whitelist", element: <Wishlist /> },
            { path: "privacy", element: <Privacy /> },
            { path: "terms", element: <Privacy /> },
            {
                path: "unauthorized",
                element: (
                    <div className="text-center py-12">
                        You do not have access to this page.
                    </div>
                ),
            },
        ],
    },

    // 2. Protected Client Dashboard Domain Paths
    {
        path: "/dashboard",
        element: <ProtectedRoute />, // Wrap inside the auth guard block
        children: [
            {
                element: <DashboardLayout isAdmin={false} />, // Inject standard client layout window
                children: [
                    { index: true, element: <CustomerOverview /> },
                    { path: "overview", element: <CustomerOverview /> },
                    { path: "orders", element: <ClientOrders /> },
                    { path: "addresses", element: <CustomerOverview /> },
                    { path: "profile", element: <CustomerOverview /> },
                ],
            },
        ],
    },
    {
        path: "/overview",
        element: <ProtectedRoute />,
        children: [
            {
                element: <DashboardLayout isAdmin={false} />,
                children: [{ index: true, element: <CustomerOverview /> }],
            },
        ],
    },

    // 3. Protected Admin Management Domain Paths
    {
        path: "/admin",
        element: <AdminRoute />, // Wrap inside the strict admin rule check
        children: [
            {
                element: <DashboardLayout isAdmin={true} />, // Inject heavy dashboard layout window
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense
                                fallback={
                                    <div className="p-6">
                                        Loading dashboard panels...
                                    </div>
                                }
                            >
                                {/* <AdminOverview /> */}
                            </Suspense>
                        ),
                    },
                    { path: "products", element: <AdminProducts /> },
                ],
            },
        ],
    },

    // Catch-all fallbacks
    {
        path: "*",
        element: (
            <div className="p-12 text-center text-xl">404 - Page Not Found</div>
        ),
    },
]);
