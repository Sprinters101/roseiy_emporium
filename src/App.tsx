import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <RouterProvider router={router} />
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
