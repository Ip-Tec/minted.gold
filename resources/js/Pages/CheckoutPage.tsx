// src/pages/CheckoutPage.tsx
import React from "react";
import Checkout from "@/Components/User/Checkout";
import Footer from "@/Components/User/Footer"; // Assuming you have a Footer component
import Header from "@/Components/User/Header";
import { Head } from "@inertiajs/react";
import { CartProvider } from "@/Context/CartContext";
import { ToastProvider } from "@/Context/ToastContext";
import { Product, CartItems } from "@/types/types";

interface ViewPageProps {
    product: Product;
    relatedProducts: Product[];
    wishlist: Product[];
    totalPrice: number;
    CartItems: CartItems; // Adjust type as per your cart item structure
}

const CheckoutPage: React.FC<ViewPageProps> = ({
    product,
    relatedProducts,
    wishlist,
    totalPrice,
    CartItems,
}) => {
    console.log({ product, relatedProducts, wishlist, totalPrice, CartItems });
    return (
        <ToastProvider>
            <CartProvider>
                <Head title="Checkout" />
                <Header initialCartItems={CartItems?.data || []} />

                <Checkout
                    product={product}
                    totalPrice={totalPrice}
                    relatedProducts={relatedProducts}
                    wishlist={wishlist}
                    CartItems={CartItems.data}
                />
                <Footer />
            </CartProvider>
        </ToastProvider>
    );
};

export default CheckoutPage;
