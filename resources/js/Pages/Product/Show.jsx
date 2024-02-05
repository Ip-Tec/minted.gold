// Pages/Product/Show.jsx

import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Footer from "@/Components/Footer/Footer";
import NavBar from "@/Components/Navegation/NavBar";
import AddToCart from "@/Components/Product/Cart/AddToCart";
import ReviewStar from "@/Components/Product/review/ReviewStar";
import MyGuestLayout from "@/Layouts/MyGuestLayout";

function Show({ product }) {
    const [activeImage, setActiveImage] = useState(product.image[0]);

    const handleImageClick = (image) => {
        setActiveImage(image);
    };

    return (
        <MyGuestLayout>
            <Head title={`Product - ${product.title}`} />
            <NavBar />

            <div className="mt-20 container mx-auto my-8 p-8 bg-white rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div>
                        <img
                            src={activeImage}
                            alt={product.title}
                            className="w-full h-auto rounded-md"
                        />
                        <div className="mt-4 flex flex-wrap gap-2">
                            {product.image.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={product.title}
                                    className="w-20 h-auto rounded-md cursor-pointer"
                                    onClick={() => handleImageClick(image)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>
                        <h1 className="text-3xl font-semibold mb-4">
                            {product.title}
                        </h1>
                        <p className="text-gray-600">{product.description}</p>

                        {/* Price */}
                        <div className="flex w-full justify-center sm:justify-between items-center flex-wrap">
                            <div className="mt-4 flex items-center justify-between w-1/2">
                                <span className="text-xl font-semibold">
                                    ₦{product.price}
                                </span>
                                <del className="ml-2 text-gray-500">
                                    ₦{(product.price + 20).toFixed(2)}
                                </del>
                            </div>

                            {/* Add to Cart Button */}
                            <AddToCart
                                product={product}
                                className="w-[12rem]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-8 w-full sm:w-2/4 px-2 py-3">
                <h2 className="text-2xl font-semibold mb-4">
                    Reviews From Users
                </h2>
                {product.reviews.map((review) => (
                    <div key={review.id} className="mb-4 border-b bo">
                        <span className="text-gray-900 flex justify-between items-center">
                            <span> by: {"Anonymous"}</span>
                            <span className="text-slate-400 text-sm">
                                {review.created_at}
                            </span>
                        </span>
                        <ReviewStar key={review.id} rating={review.rating} />
                        <p className="text-gray-400 mb-2">{review.comment}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </MyGuestLayout>
    );
}

export default Show;
