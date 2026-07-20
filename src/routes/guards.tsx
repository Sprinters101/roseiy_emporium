import { Navigate, Outlet, useLocation } from "react-router";

// Mock helper to fetch auth state (replace this with your actual useAuth hook/Zustand store later)
const useAuth = () => {
    const token = localStorage.getItem("accessToken");
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;

    return {
        isAuthenticated: !!token,
        role: user?.role || "guest", // roles: 'guest' | 'client' | 'admin'
    };
};

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
