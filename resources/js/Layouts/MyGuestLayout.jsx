import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { CartContextProvider, CartContext } from "@/Store/CartContext";
import React, { useContext } from "react";

export default function MyGuestLayout({ children }) {
    const { addProduct, setCartProducts } = useContext(CartContext);
    return (
        <CartContextProvider>
            <div className="max-w-screen-xl m-auto">
                {children}
            </div>
        </CartContextProvider>
    );
}
