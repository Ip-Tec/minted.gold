import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { useToast } from "@/Context/ToastContext";
import { useCart } from "@/Context/CartContext"; // Import the CartContext
import { CartItem, CartItems } from "@/types/types";

interface AddToCartButtonProps {
    productSlug: string;
    quantity: number;
    prop?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    productSlug,
    quantity,
    prop,
}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        product_slug: productSlug,
        quantity: quantity,
    });

    const { props } = usePage<{ auth: { user: any } }>();
    const isLoggedIn = props.auth?.user !== undefined;
    const { addToast } = useToast();
    const { setCartItems, cartItems } = useCart(); // Use the CartContext

    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();

        if (isLoggedIn) {
            post(route("cart.add"), {
                data,
                replace: true,
                preserveScroll: true,
                only: ["CartItems", "message"],
                onSuccess: (page) => {
                    console.log(page.props);
                    console.log(page.props.message);
                    if (page.props && "CartItems" in page.props) {
                        setCartItems(page.props.CartItems as CartItem[] | CartItems);
                    }
                },
                onError: (errors) => {
                    console.log(errors);
                    addToast(errors.product_slug || errors.quantity);
                },
                onFinish: () => reset(),
            });
        } else {
            // Add to local storage
            let cart = JSON.parse(localStorage.getItem("cart") || "[]");

            // Check if the product already exists in the cart
            const existingProduct = cart.find(
                (item: any) => item.product_slug === productSlug
            );

            if (existingProduct) {
                // Update quantity
                existingProduct.quantity += quantity;
            } else {
                // Add new product
                cart.push({ product_slug: productSlug, quantity: quantity });
            }

            // Save updated cart to local storage
            localStorage.setItem("cart", JSON.stringify(cart));
            setCartItems(cart); // Update the cart items in the context
            addToast("Item added to cart");
        }
    };

    return (
        <form onSubmit={handleAddToCart}>
            <button type="submit" disabled={processing} className={prop}>
                Add to Cart
            </button>
        </form>
    );
};

export default AddToCartButton;
