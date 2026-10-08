import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { AgeVerificationModal } from "@/components/common/AgeVerificationModal";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <AgeVerificationModal />
                    <RouterProvider router={router} />
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
