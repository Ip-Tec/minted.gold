// src/Components/ProductDetails.tsx

import React from "react";
import ProductRating from "./ProductRating";
import AddToCartButton from "./AddToCartButton";

interface ProductDetailsProps {
    slug: string;
    name: string;
    price: number;
    slang_price: number;
    description: string;
    features?: string[];
    rating: number;
}

const currencyFormat = (total: number) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    }).format(total);
};
const ProductDetails: React.FC<ProductDetailsProps> = ({
    slug,
    name,
    price,
    slang_price,
    description,
    features,
    rating,
}) => {
    console.log({
        slug,
        name,
        price,
        slang_price,
        description,
        features,
        rating,
    });

    return (
        <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-700">{description}</p>
            <div className="text-lg font-semibold">
                <div className="flex items-center mb-2 gap-4">
                    <span className="text-lg text-gray-700">
                        {currencyFormat(price)}
                    </span>
                    <span className="text-gray-500 line-through ml-2">
                        {currencyFormat(slang_price)}
                    </span>
                </div>
            </div>
            <p className="text-yellow-500">
                <ProductRating rating={rating} />
            </p>
            {features && (
                <ul className="list-disc list-inside">
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            )}
            <AddToCartButton
                productSlug={slug}
                quantity={1}
                prop="bg-orange-500 text-white hover:bg-orange-700 px-4 py-2 mt-4 rounded-md w-full cursor-pointer md:w-[30%] text-center"
            />
        </div>
    );
};

export default ProductDetails;
