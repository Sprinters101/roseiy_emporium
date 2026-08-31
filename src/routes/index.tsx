import { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout";
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
import CustomerOrders from "@/components/dashboard/CustomerOrders";
import CustomerOrderDetails from "@/components/dashboard/CustomerOrderDetails";
import DashboardTrackOrder from "@/components/dashboard/DashboardTrackOrder";

// Lazy Load Admin Views to drastically optimize initial bundle performance
// const AdminOverview = React.lazy(() => import("@/features/admin/Overview"));
// const AdminProducts = () => <div>Admin Product Management Table</div>;

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
            { path: "privacy-policy", element: <Privacy /> },
            {
                path: "*",
                element: (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                        <h1 className="text-4xl font-serif text-gold-500 mb-4">
                            404 - Page Not Found
                        </h1>
                        <p className="text-neutral-400 mb-6">
                            The vintage or page you are searching for does not
                            exist in our cellar.
                        </p>
                        <a
                            href="/"
                            className="px-6 py-2 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-colors rounded-sm"
                        >
                            Return Home
                        </a>
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
                    {
                        element: <ClientDashboardLayout />,
                        children: [
                            { index: true, element: <CustomerOverview /> },
                            { path: "overview", element: <CustomerOverview /> },
                            { path: "orders", element: <CustomerOrders /> },
                            {
                                path: "orders/details",
                                element: <CustomerOrderDetails />,
                            },
                            {
                                path: "orders/:orderId",
                                element: <CustomerOrderDetails />,
                            },
                            {
                                path: "order-details",
                                element: <CustomerOrderDetails />,
                            },
                            {
                                path: "track-order",
                                element: <DashboardTrackOrder />,
                            },
                            {
                                path: "orders/track",
                                element: <DashboardTrackOrder />,
                            },
                            {
                                path: "addresses",
                                element: <CustomerOverview />,
                            },
                            { path: "profile", element: <CustomerOverview /> },
                        ],
                    },
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
                children: [
                    {
                        element: <ClientDashboardLayout />,
                        children: [
                            { index: true, element: <CustomerOverview /> },
                        ],
                    },
                ],
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
                    // { path: "products", element: <AdminProducts /> },
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
