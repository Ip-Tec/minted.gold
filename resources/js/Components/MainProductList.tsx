import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, usePage, useForm } from "@inertiajs/react";
import ProductRating from "@/Components/ProductRating";
import { MainProductListProps } from "@/types/types";
import AddToCartButton from "./AddToCartButton";
import { useToast } from "@/Context/ToastContext";

const currencyFormat = (total: number) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    }).format(total);
};

const MainProductList: React.FC<MainProductListProps> = ({ products }) => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const { addToast } = useToast();

    const [wishlist, setWishlist] = useState<number[]>(() => {
        const storedWishlist = localStorage.getItem("wishlist");
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    });

    const { props } = usePage<{ auth: { user: any } }>();
    const {
        data,
        post,
        delete: destroy,
        processing,
        setData,
    } = useForm({ product_id: 0 });
    const isLoggedIn = props.auth?.user !== undefined;

    const handleRatingChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value
            ? parseFloat(event.target.value)
            : null;
        setSelectedRating(value);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
            ? parseFloat(event.target.value)
            : null;
        setMaxPrice(value);
    };

    const handleWishlistToggle = (product_id: number) => {
        setData("product_id", product_id);
        const isProductInWishlist = wishlist.includes(product_id);
        const newWishlist = isProductInWishlist
            ? wishlist.filter((id) => id !== product_id)
            : [...wishlist, product_id];

        localStorage.setItem("wishlist", JSON.stringify(newWishlist));

        if (isLoggedIn) {
            if (isProductInWishlist) {
                // Remove from wishlist in the backend
                destroy(route("wishlist.destroy", product_id), {
                    data: { product_id },
                    preserveScroll: true,
                    only: ["success", "message"],
                    onSuccess: (page) => {
                        console.log(page.props);
                        if (typeof page.props.message === "string") {
                            addToast(page.props.message);
                        }
                    },
                    onFinish: () => {
                        setWishlist(newWishlist);
                    },
                });
            } else {
                // Add to wishlist in the backend
                console.log({ data });

                post(route("wishlist.store", product_id), {
                    data: { product_id },
                    preserveScroll: true,
                    only: ["success", "message"],
                    onSuccess: (page) => {
                        console.log(page.props);
                        if (typeof page.props.message === "string") {
                            addToast(page.props.message);
                        }
                        console.log({ newWishlist });

                        setWishlist(newWishlist);
                    },
                    onError: (errors) => {
                        console.log(errors);
                        addToast(
                            errors.product_id || "Failed to add to wishlist"
                        );
                    },
                });
            }
        } else {
            // Use newWishlist directly as it's already an array
            setWishlist(newWishlist);
        }
    };

    const filteredProducts = products.data.filter((product) => {
        return (
            (selectedRating === null || product.rating >= selectedRating) &&
            (maxPrice === null || product.price <= maxPrice)
        );
    });

    return (
        <div className="bg-white p-4">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                    Filter by Rating:
                    <select
                        value={selectedRating ?? ""}
                        onChange={handleRatingChange}
                        className="ml-2 p-2 border rounded"
                    >
                        <option value="">All Ratings</option>
                        <option value="1">1 & Up</option>
                        <option value="2">2 & Up</option>
                        <option value="3">3 & Up</option>
                        <option value="4">4 & Up</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label className="block text-gray-700 mb-2">
                    Filter by Max Price:
                    <input
                        type="number"
                        value={maxPrice ?? ""}
                        onChange={handlePriceChange}
                        className="ml-2 p-2 border rounded"
                    />
                </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-gray-100 rounded-lg shadow-sm relative overflow-hidden"
                    >
                        <Link href={`/view/${product.slug}`}>
                            <img
                                src={product.main_image}
                                alt={product.name}
                                className="w-full h-48 object-cover mb-4 rounded-lg"
                            />
                        </Link>
                        <div
                            className="absolute top-2 right-2 cursor-pointer"
                            onClick={() => {
                                setData("product_id", product.id);
                                handleWishlistToggle(product.id);
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={`w-6 h-6 ${
                                    wishlist.includes(product.id)
                                        ? "text-orange-600"
                                        : "text-gray-300"
                                }`}
                            />
                        </div>
                        <Link href={`/view/${product.slug}`}>
                            <h3 className="text-xl font-bold mb-2 px-4">
                                {product.name}
                            </h3>
                            <div className="flex items-center mb-2 px-4">
                                <span className="text-lg text-gray-700">
                                    {currencyFormat(product.price)}
                                </span>
                                <span className="text-gray-500 line-through ml-2">
                                    {currencyFormat(product.slang_price)}
                                </span>
                            </div>
                            <div className="flex items-center mb-2 px-4">
                                <ProductRating rating={product.rating} />
                                <span className="text-gray-600 ml-2">
                                    {product.rating}
                                </span>
                            </div>
                        </Link>
                        <AddToCartButton
                            productSlug={product.slug}
                            quantity={1}
                            prop="bg-orange-600 w-full hover:bg-orange-500 text-white py-2 px-4 inline-block text-center"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {products.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url ?? "#"}
                        preserveScroll
                        className={`mx-1 px-3 py-2 border rounded ${
                            link.active
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                ))}
            </div>
        </div>
    );
};

export default MainProductList;
