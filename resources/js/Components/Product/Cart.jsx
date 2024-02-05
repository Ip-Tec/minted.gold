import Delete from "../icons/Delete";
import { Head } from "@inertiajs/react";
import CartIcon from "../icons/CartIcon";
import CloseIcon from "../icons/CloseIcon";
import { Transition } from "@headlessui/react";
import { CartContext } from "@/Store/CartContext";
import React, { Fragment, useState, useEffect, useContext } from "react";
import CartList from "../Cart/CartList";

function Cart() {
    const cartRef = React.createRef();
    const { cartProducts } = useContext(CartContext);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    const toggleCart = (event) => {
        // Prevent the event propagation if the click occurred inside the cart content
        if (event.target.closest(".cart-content")) {
            event.stopPropagation(); // Prevent further propagation
            return;
        }

        setIsCartOpen((prev) => !prev);
    };

    // Define the closeCart function
    const closeCart = () => {
        setIsCartOpen(false);
    };

    const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            closeCart(); // Now closeCart is defined and can be called
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="ms-3 relative mr-1" ref={cartRef}>
            <Head title="Cart List" />
            <div
                className={` ${
                    isCartOpen
                        ? "fixed inset-0 z-40 overlay-active"
                        : "relative right-0"
                }`}
            >
                <div
                    className={`${
                        isCartOpen
                            ? "absolute inset-0 bg-gray-600 bg-opacity-75"
                            : ""
                    }`}
                    onClick={closeCart}
                ></div>

                <div
                    // className="cursor-pointer  right-1 mx-1 "

                    className={`${
                        isCartOpen
                            ? "absolute top-6 right-3"
                            : "cursor-pointer right-1 mx-1"
                    }`}
                    onClick={toggleCart}
                >
                    <sup
                        className={`${
                            !cartProducts
                                ? "hidden"
                                : "text-white absolute text-center flex items-center justify-end rounded-full bg-yellow-800 w-auto h-auto p-[0.6rem] -right-[0.51rem] -top-[0.51rem] mt-0"
                        }`}
                    >
                        {!!cartProducts && cartProducts.length}
                    </sup>
                    <CartIcon className="w-8 h-8 fill-white" />
                </div>

                <Transition
                    as={Fragment}
                    show={isCartOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    {(isCartOpen) => (
                        <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white overflow-y-auto transition-transform duration-300 ease-in-out cart-content">
                            {/* Cart content goes here */}
                            <div className="">
                                {/* Display cart items */}
                                <div className="flex bg-gray-200 justify-between items-center p-4">
                                    <h3 className="text-black">
                                        Shopping Cart
                                    </h3>
                                    <span onClick={closeCart}>
                                        <CloseIcon
                                            width={"1.5rem"}
                                            height={"1.5rem"}
                                            className="hover:scale-125 cursor-pointer"
                                            onClick={closeCart}
                                        />
                                    </span>
                                </div>

                               <CartList />
                            </div>
                        </div>
                    )}
                </Transition>
            </div>
        </div>
    );
}

export default Cart;
