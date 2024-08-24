import React, { useEffect, useState } from "react";
import { WishListProps } from "@/types/types";
import { Link, useForm, usePage } from "@inertiajs/react";

function Wishlist() {
    const { get, post, delete: destroy } = useForm();
    const { props } = usePage<{ auth: { user: any } }>();
    const [wishlistItems, setWishlistItems] = useState<WishListProps[]>([]);

    useEffect(() => {
        // Fetch wishlist items when the component mounts
        get(route("wishlist.index"), {
            preserveScroll: true,
            only: ["wishlists"],
            onSuccess: (page) => {
                const wishlists = page.props.wishlists as WishListProps[];
                setWishlistItems(wishlists);
            },
        });
    }, []);

    // Function to remove an item from the wishlist
    const removeFromWishlist = (itemId: number) => {
        destroy(route("wishlist.destroy", itemId), {
            onSuccess: () => {
                setWishlistItems((prevItems) =>
                    prevItems.filter((item) => item.product_id !== itemId)
                );
            },
        });
    };

    // Function to add an item to the wishlist
    const addToWishlist = (productId: number) => {
        post(route("wishlist.store"), {
            data: { product_id: productId },
            onSuccess: (page) => {
                const wishlists = page.props.wishlists as WishListProps[];
                setWishlistItems(wishlists);
            },
        });
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Your Wishlist
            </h2>
            {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                        <div
                            key={item.product_id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
                        >
                            <img
                                src={item.products.images}
                                alt={item.products.name}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {item.products.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                ${item.products.price}
                            </p>
                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                                    onClick={() =>
                                        removeFromWishlist(item.product_id)
                                    }
                                >
                                    Remove
                                </button>
                                <Link
                                    href="/cart"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                                >
                                    Add to Cart
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Your wishlist is empty.
                    </p>
                    <Link
                        href="/products"
                        className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md"
                    >
                        Continue Shopping
                    </Link>
                </div>
            )}
        </div>
    );
}
export default Wishlist;
