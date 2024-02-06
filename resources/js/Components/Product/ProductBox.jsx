// Components/Product/ProductBox.js

import { Link } from "@inertiajs/react";
import React, { useContext } from "react";
import Button from "@/Components/Product/Button";
import CartIcon from "@/Components/icons/CartIcon";
import { CartContext } from "@/Store/CartContext";
import ReviewStar from "@/Components/Product/review/ReviewStar";
import AddToCart from "./Cart/AddToCart";

const ProductBox = ({ slug, title, description, price, image }) => {
    let product = { slug, title, description, price, image };
    const { addProduct } = useContext(CartContext);
    const url = "/product/" + slug;
    let images;
    if (Array.isArray(image)) {
        images = image;
    } else {
        images = JSON.parse(image);
    }

    return (
        <div className="mb-6 m-4 text-black rounded-md shadow-md hover:shadow-lg w-[15rem] bg-gray-50 z-10">
            <Link
                href={route("product.show", `${slug}`)}
                className="bg-white h-32 flex items-center justify-center rounded relative"
            >
                {/* <h1>Image_URL{images[0]}</h1> */}
                <img
                    alt={title}
                    width={300}
                    height={400}
                    className="max-w-full max-h-40 mb-3 rounded-2xl"
                    src={`${image[0]}` || "/logo.png"}
                />
                {/* <div className="text-sm font-normal absolute bg-gray-600 text-gray-50 rounded-full bg-opacity-75 -bottom-4 right-1 p-2">
          ${price}
        </div> */}
            </Link>
            <div className="mt-2 flex flex-col">
                <Link
                    href={route("product.show", `${slug}`)}
                    className="font-normal text-base text-black mt-2 mx-1 divide-solid border-b border-b-gray-500"
                >
                    {title}
                    <p>{slug}</p>
                </Link>
                <Link
                    href={route("product.show", url)}
                    className="font-normal text-base text-black mt-2 mx-1 divide-solid border-b border-b-gray-500 flex"
                >
                    <ReviewStar
                        product={{ slug, title, description, price, image }}
                    />{" "}
                    ({(((!isNaN(price) ? price : 20) / 8) * 2 + 1).toFixed(2)})
                </Link>
                <Link
                    href={route("product.show", `${slug}`)}
                    className="font-normal flex justify-between text-base text-black my-2 mx-1 px-2 divide-solid border-b border-b-gray-500"
                >
                    <span className="text-base">₦{price}</span>
                    <del className="opacity-90 text-gray-400">
                        ₦{(!isNaN(price) ? price : 0 + 20).toFixed(2)}
                    </del>
                </Link>

                <div className="sm:block flex justify-center mb-1 flex-col items-center w-[98%] text-xs mx-1 my-1">
                    <Link
                        href={route("product.show", `${slug}`)}
                        className=" w-[95%] flex justify-evenly border-gray-500
                        hover:bg-transparent
                        hover:text-gray-600 border-2 p-2 rounded-md hover:shadow-md bg-gray-500 text-gray-50 "
                    >
                        Learn More
                    </Link>

                    <AddToCart
                        product={{ slug, title, description, price, image }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductBox;
