import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faPlus,
    faMinus,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/Context/CartContext";
import { router } from "@inertiajs/react";

interface SideNavProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ isOpen, onClose }) => {
    const { cartItems, updateQuantity, removeItem } = useCart();

    const handleCheckout = () => {
        router.visit("/checkout");
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const currencyFormat = (total: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
        }).format(total);
    };

    const calculateTotalPrice = () => {
        const total = cartItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
        return currencyFormat(total);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-end h-screen overflow-hidden  ${
                isOpen ? "visible" : "invisible"
            }`}
            onClick={handleBackdropClick}
        >
            <div
                className="absolute inset-0 bg-black opacity-65 h-screen w-screen"
                onClick={onClose}
            ></div>

            <div
                className={`transform top-0 right-0 w-96 bg-gray-400 dark:bg-gray-800 dark:text-white text-black shadow-md overflow-y-auto transition-transform duration-300 ease-in-out  h-screen ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b top-0 fixed w-full">
                    <h2 className="text-xl font-semibold">
                        Cart Item: {cartItems.length}
                    </h2>
                    <button onClick={onClose} className="text-red-500 w-8 h-8 border border-red-500 rounded-full p-1 hover:scale-125">
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="font-bold text-2xl "
                        />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto mb-4 mt-16 h-[70%] scrollbar-hide">
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.product.id}
                                className="flex justify-between items-center mb-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={item.product.main_image}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold">
                                            {item.product.name}
                                        </h3>
                                        <p>
                                            {currencyFormat(item.product.price)}
                                        </p>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:scale-110"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faMinus}
                                                />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded  hover:scale-110"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-600 hover:scale-125"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="fixed bottom-0 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-400 dark:bg-gray-800 dark:text-white text-black w-full">
                        <h3 className="text-xl font-bold mb-4">
                            Total: {calculateTotalPrice()}
                        </h3>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-300"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SideNav;
