import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export interface UserProfile {
    id?: string;
    customerId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    role?: string;
}

export interface AuthContextType {
    token: string | null;
    user: UserProfile | null;
    role: string;
    isAuthenticated: boolean;
    login: (token: string, userData?: UserProfile) => void;
    logout: () => void;
}

const TOKEN_KEY = "accessToken";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => {
        return Cookies.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || null;
    });

    const [user, setUser] = useState<UserProfile | null>(() => {
        const storedUser = localStorage.getItem("userData");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const cookieToken = Cookies.get(TOKEN_KEY);
        if (cookieToken && cookieToken !== token) {
            setToken(cookieToken);
        }
    }, [token]);

    const login = (newToken: string, userData?: UserProfile) => {
        // Store token in cookies (expires in 7 days)
        Cookies.set(TOKEN_KEY, newToken, { expires: 7, path: "/" });
        setToken(newToken);
        if (userData) {
            setUser(userData);
            localStorage.setItem("userData", JSON.stringify(userData));
        }
    };

    const logout = () => {
        Cookies.remove(TOKEN_KEY, { path: "/" });
        localStorage.removeItem("userData");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                role: user?.role || "guest",
                isAuthenticated: Boolean(token),
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
