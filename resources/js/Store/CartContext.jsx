// Store/CartContext.js

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem("cart", JSON.stringify(cartProducts));
        }
    }, [cartProducts]);

    useEffect(() => {
        if (ls && ls.getItem("cart")) {
            setCartProducts(JSON.parse(ls.getItem("cart")));
        }
    }, [ls]);

    function addProduct(product) {
        // Check if the product is already in the cart
        const existingProductIndex = cartProducts.findIndex(
            (p) => p.slug === product.slug
        );

        if (existingProductIndex !== -1) {
            // Update the quantity of the existing product
            setCartProducts((prev) => {
                const updatedProducts = [...prev];
                updatedProducts[existingProductIndex].quantity += 1;
                return updatedProducts;
            });
        } else {
            // Add the product to the cart with an initial quantity of 1
            setCartProducts((prev) => [...prev, { ...product, quantity: 1 }]);
        }
    }

    function removeProduct(productId) {
        // Check if the product is already in the cart
        const existingProductIndex = cartProducts.findIndex(
            (p) => p.slug === productId
        );

        if (existingProductIndex !== -1) {
            setCartProducts((prev) => {
                const updatedProducts = [...prev];

                // Remove the product entirely
                updatedProducts.splice(existingProductIndex, 1);

                return updatedProducts;
            });
        }
    }

    useEffect(() => {
        // Remove products with quantity 0 after the state has been updated
        setCartProducts((prev) =>
            prev.filter((product) => product.quantity > 0)
        );
    }, []);

    function clearCart() {
        setCartProducts([]);
    }

    function moreOfThisProduct(id) {
        const productToUpdate = cartProducts.find((p) => p.slug === id);
        if (productToUpdate) {
            addProduct({
                ...productToUpdate,
                quantity: productToUpdate.quantity + 1,
            });
        }
    }

    function lessOfThisProduct(id) {
        const productToUpdate = cartProducts.find((p) => p.slug === id);
        if (productToUpdate && productToUpdate.quantity > 1) {
            removeProduct({
                ...productToUpdate,
                quantity: productToUpdate.quantity - 1,
            });
        }
    }

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                setCartProducts,
                addProduct,
                removeProduct,
                moreOfThisProduct,
                lessOfThisProduct,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
