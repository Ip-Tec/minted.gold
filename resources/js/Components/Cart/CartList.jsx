import { useContext } from "react";
import { Link } from "@inertiajs/react";
import Delete from "@/Components/icons/Delete";
import { CartContext } from "@/Store/CartContext";

function CartList() {
    const {
        cartProducts,
        removeProduct,
        moreOfThisProduct,
        lessOfThisProduct,
    } = useContext(CartContext);

    // Function to handle the deletion of a cart item
    const handleDeleteItem = (itemId) => {
        // Use the removeProduct function from CartContext to remove the item
        removeProduct(itemId);
    };

    const subtotal =
        cartProducts && cartProducts.length > 0
            ? cartProducts.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
              )
            : 0;

    return (
        <>
            <style>
                {`
                    /* Hide the scrollbar */
                    .cart-scroll-container::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>
            <div className="p-2 flex flex-col justify-center items-center">
                {/* Check if cartProducts is defined before mapping */}
                {cartProducts && cartProducts.length > 0 ? (
                    // Display a scrollable container for cart items
                    <div className="cart-scroll-container h-[22rem] overflow-y-auto">
                        {cartProducts.map((item) => (
                            <div
                                key={item.title}
                                className="p-2 flex flex-col justify-center align-middle max-h-screen items-start "
                            >
                                <div className="flex justify-between items-center text-black w-full">
                                    <img
                                        src={item.image[0] || "./logo.jpg"}
                                        width="70rem"
                                        height="70rem"
                                        className="rounded-full mr-2"
                                    />
                                    <div className="flex flex-col m-1 mr-2 justify-between">
                                        <h4 className="text-gray-500 text-sm">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() =>
                                                    lessOfThisProduct(item.slug)
                                                }
                                                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
                                            >
                                                -
                                            </button>
                                            <p className="mx-2">
                                                {item.quantity}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    moreOfThisProduct(item.slug)
                                                }
                                                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className="bg-rose-600 hover:border-rose-600 hover:bg-transparent border p-1 rounded-full w-12 cursor-pointer"
                                        onClick={() =>
                                            handleDeleteItem(item.slug)
                                        }
                                    >
                                        <Delete
                                            width={"1.5rem"}
                                            height={"1.5rem"}
                                            className="fill-slate-100 hover:fill-rose-600 stroke-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Render a message or fallback content when cartProducts is empty
                    <p>Your cart is empty</p>
                )}
                <div className="absolute flex flex-col justify-center bottom-0 w-full mt-2 p-2 align-bottom bg-white">
                    <div className="flex opacity-90 justify-between items-start align-middle p-2">
                        <p>Subtotal: </p>
                        {/* Calculate and display the subtotal based on the cart items */}
                        <p className="text-gray-400">
                            # {subtotal.toFixed(2)}{" "}
                            {/* Format to two decimal places */}
                        </p>
                    </div>
                    <Link
                        href="/cart"
                        className="w-full p-4 m-2 border-yellow-600 border hover:bg-yellow-600 rounded-lg hover:text-slate-100 text-center"
                    >
                        View Cart
                    </Link>
                    <button className="w-full p-4 m-2 bg-yellow-600 border hover:bg-transparent rounded-lg text-white hover:text-slate-500 hover:border-yellow-600">
                        Checkout
                    </button>
                </div>
            </div>
        </>
    );
}

export default CartList;
