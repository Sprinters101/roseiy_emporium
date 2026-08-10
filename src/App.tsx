import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

function App() {
    return (
        <CartProvider>
            <WishlistProvider>
                <RouterProvider router={router} />
            </WishlistProvider>
        </CartProvider>
    );
}

export default App;
