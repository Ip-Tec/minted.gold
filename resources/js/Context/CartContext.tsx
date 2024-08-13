import React, { createContext, useState, useContext, ReactNode } from "react";
import { CartItem, CartItems } from "@/types/types";
import { useForm } from "@inertiajs/react";
import { useToast } from "@/Context/ToastContext";

interface CartContextProps {
    cartItems: CartItem[];
    setCartItems: (items: CartItem[] | CartItems) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
    loading: boolean;
    totalPrice: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { addToast } = useToast();
    const {
        data,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({ quantity: 1 });

    const [cartItems, setCartItemsState] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const normalizeCartItems = (items: CartItem[] | CartItems): CartItem[] => {
        return Array.isArray(items) ? items : items.data;
    };

    const setCartItems = (items: CartItem[] | CartItems) => {
        setCartItemsState(normalizeCartItems(items));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCartItemsState((prevItems) =>
            prevItems.map((item) =>
                item.product.id === id
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
        data.quantity = Math.max(1, quantity);

        put(route("cart.updateQuantity", { id }), {
            data: { quantity },
            preserveScroll: true,
            only: ["CartItems", "message"],
            onSuccess: (page) => {
                console.log(page.props);
                // addToast("Item updated in cart");
                if (page.props && "CartItems" in page.props) {
                    console.log(page.props.CartItems);

                    setCartItems(page.props.CartItems as CartItem[] | CartItems);
                }
                setLoading(false);
            },
            onError: (errors) => {
                console.log(errors);
                addToast(errors.product_slug || errors.quantity);
                setLoading(false);
            },
            onFinish: () => reset(),
        });
    };

    const removeItem = (id: number) => {
        setCartItemsState((prevItems) =>
            prevItems.filter((item) => item.product.id !== id)
        );

        destroy(route("cart.remove", { id }), {
            preserveScroll: true,
            only: ["CartItems", "message", "totalPrice"],
            onSuccess: (page) => {
                console.log({ page });
                addToast("Item removed from cart");
                if (page.props && "CartItems" in page.props) {
                    setCartItems(page.props.CartItems as CartItem[] | CartItems);
                    setTotalPrice(page.props.totalPrice as number);
                }
                setLoading(false);
            },
            onError: (errors) => {
                console.log(errors);
                addToast(errors.product_slug || errors.quantity);
                setLoading(false);
            },
            onFinish: () => reset(),
        });
    };

    return (
        <CartContext.Provider
            value={{
                cartItems: cartItems,
                setCartItems: setCartItems,
                updateQuantity: updateQuantity,
                removeItem: removeItem,
                loading: loading,
                totalPrice: totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
