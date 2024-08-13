import React from "react";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface Product {
    id: number;
    name: string;
    price: number;
    main_image: string;
}

interface RelatedProductsProps {
    products: Product[];
    wishlist: number[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
    products,
    wishlist,
}) => {
    console.log({ products, wishlist });

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/view/${product.id}`}
                        className="bg-gray-100 rounded-lg shadow-sm relative overflow-hidden"
                    >
                        <img
                            src={product.main_image}
                            alt={product.name}
                            className="w-full h-48 object-cover mb-4 rounded-lg"
                        />
                        <div className="absolute top-2 right-2 cursor-pointer">
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={`w-6 h-6 ${
                                    wishlist.includes(product.id)
                                        ? "text-orange-600"
                                        : "text-gray-300"
                                }`}
                            />
                        </div>
                        <h3 className="text-xl font-bold mb-2 px-4">
                            {product.name}
                        </h3>
                        <div className="flex items-center mb-2 px-4">
                            <span className="text-lg text-gray-700">
                                {new Intl.NumberFormat("en-NG", {
                                    style: "currency",
                                    currency: "NGN",
                                }).format(product.price)}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
