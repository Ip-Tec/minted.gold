import { CartItem, Product } from "@/types/types";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useCart } from "@/Context/CartContext";
// import { PaystackButton } from "react-paystack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface CheckoutProps {
    product: Product;
    relatedProducts: Product[];
    wishlist: Product[];
    totalPrice: number;
    CartItems: CartItem[];
}

const Checkout: React.FC<CheckoutProps> = ({
    product,
    relatedProducts,
    wishlist,
    totalPrice,
    CartItems,
}) => {
    const {
        data,
        put,
        post,
        get,
        delete: destroy,
        reset,
        processing,
    } = useForm({ quantity: 1 });

    const {
        cartItems,
        loading,
        setCartItems,
        removeItem,
        totalPrice: contextTotalPrice,
    } = useCart();

    const [useTotalPrice, setUseTotalPrice] = useState<number>(totalPrice);

    useEffect(() => {
        if (CartItems && CartItems.length > 0) {
            setCartItems(CartItems);
            setUseTotalPrice(totalPrice);
        }
    }, [CartItems, totalPrice, setCartItems]);

    if (cartItems.length === 0 && !loading) {
        console.log(cartItems.length);

        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-500">Loading cart...</p>
            </div>
        );
    }

    const makePayment = async () => {
        await post(route("makePayment"), {
            data,
            preserveScroll: true,
            only: ["CartItems", "totalPrice", "wishlist"],
            onSuccess: (page) => {
                setCartItems(page.props.CartItems as CartItem[]);
                // Total price is now handled by the context, so no need to update it manually
            },
            onError: (errors) => {
                console.error(errors);
            },
            onFinish: () => reset(),
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        const newQuantity = Math.max(1, quantity);
        data.quantity = newQuantity;

        put(route("cart.updateQuantity", { id }), {
            data: { quantity: newQuantity },
            preserveScroll: true,
            only: ["CartItems", "totalPrice"],
            onSuccess: (page) => {
                setCartItems(page.props.CartItems as CartItem[]);
                // Total price is now handled by the context, so no need to update it manually
            },
            onError: (errors) => {
                console.error(errors);
            },
            onFinish: () => reset(),
        });
    };

    const currencyFormat = (total: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
        }).format(total);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 dark:text-white">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <div className="p-4 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 bg-white dark:bg-gray-700 p-4">
                    Cart Items
                </h2>
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">
                        Your cart is empty.
                    </p>
                ) : (
                    <ul className="container m-auto">
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between mb-4 border-b pb-2 border-orange-400"
                            >
                                <img
                                    src={item.product.main_image}
                                    alt={item.product.name}
                                    className="w-16 h-16 object-cover mr-4 rounded-lg"
                                />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold">
                                        {item.product.name}
                                    </h3>
                                    <p>
                                        {item.quantity} x{" "}
                                        {currencyFormat(item.product.price)}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-lg font-bold">
                                        {currencyFormat(
                                            item.quantity * item.product.price
                                        )}
                                    </span>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="ml-4 text-red-500 hover:text-red-800"
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="container m-auto">
                    <div className="flex justify-between items-center mt-4">
                        <h3 className="text-xl font-bold">Total:</h3>
                        <span className="text-xl font-bold">{totalPrice}</span>
                    </div>
                    <div className="w-full flex justify-around items-center">
                        {/* <PaystackButton
                            publicKey="pk_test_a8604c76e4fbca7414a3efc98f220481883e5e62"
                            {...paystackConfig}
                            onSuccess={onSuccess}
                            onClose={onClose}
                            className="bg-orange-500 text-white py-3 px-8 w-1/3 justify-items-star lex rounded-lg mt-4 hover:bg-orange-600"
                        >
                            Pay with PayStack
                        </PaystackButton> */}

                        <button
                            onClick={makePayment}
                            className="bg-orange-500 text-white py-3 px-8 w-1/3 justify-items-star lex rounded-lg mt-4 hover:bg-orange-600"
                        >
                            Pay with Others
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
