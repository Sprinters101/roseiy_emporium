import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/context/AuthContext";

/* Auth Guard: Protects client views from guests */
export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login, but save the current URL so we can bounce them back after logging in
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

/* Admin Guard: Protects admin dashboard from clients and guests */
export const AdminRoute = () => {
    const { isAuthenticated, role } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role !== "admin") {
        // If authenticated but not an admin, send them to an unauthorized error page or client dashboard
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};
