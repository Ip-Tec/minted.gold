// Components/Featured.js

import AddToCart from "./Cart/AddToCart";
import { useState, useEffect } from "react";
import ButtonLink from "@/Components/Product/ButtonLink";

export default function Featured({ products }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(
        Array(products.length).fill(false)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [currentIndex, products.length]);

    useEffect(() => {
        // Preload all images
        const imagePromises = products.map((product, index) => {
            return new Promise((resolve, reject) => {
                const img = new window.Image();
                img.src = product.image; // Update this line to use the product.image directly
                img.onload = () => {
                    setImageLoaded((prev) => {
                        const newLoaded = [...prev];
                        newLoaded[index] = true;
                        return newLoaded;
                    });
                    resolve();
                };
                img.onerror = reject;
            });
        });
    
        // Wait for all images to be loaded
        Promise.all(imagePromises);
    }, [products]);
    

    const product = products[currentIndex];
    const slideStyle = {
        display: "flex",
        width: `${products.length * 100}%`,
        transform: `translateX(${-currentIndex * (100 / products.length)}%)`,
        transition: "transform 1.5s ease-in-out", // Add smooth transition effect
    };

    return (
        <div
            className={`text-gray-900 bg-gray-100 p-px max-h-max relative featured-slide z-10`}
        >
            <div className="relative max-w-full overflow-x-hidden  z-10">
                <div className="relative w-full  z-10" style={slideStyle}>
                    {products.map((product, index) => (
                        <div key={product.id} className="w-full">
                            <div className="flex items-center justify-center relative w-full z-10">
                                {imageLoaded[index] && (
                                    <div className="image-overlay-container w-full z-10">
                                        <div className="flex flex-wrap justify-center items-center m-auto absolute z-10 w-full h-full p-2 left-0">
                                            <div className="bg-gray-900 text-gray-300 bg-opacity-70 w-3/4 rounded-md p-6">
                                                <h1 className="m-0 text-3xl md:text-5xl">
                                                    {product.title ||
                                                        "No Title"}
                                                </h1>
                                                <p className="text-sm md:text-base md:w-3/4">
                                                    {product.description ||
                                                        "No Description"}
                                                </p>

                                                <div className="bottom-0 left-0 right-0 p-10">
                                                    <ButtonLink
                                                        href={route(
                                                            "product.show",
                                                            `${product.slug}`
                                                        )}
                                                        className="border-2 hover:bg-transparent"
                                                    >
                                                        Read more
                                                    </ButtonLink>
                                                    <AddToCart
                                                        className={
                                                            "bg-white text-black border-0 border-none hover:bg-slate-900"
                                                        }
                                                        product={product}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <img
                                            src={`${product?.image?.[0]}`}
                                            alt=""
                                            width={1200}
                                            height={800}
                                            style={{
                                                height: "32rem",
                                                width: "100%",
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-4 absolute bottom-0 flex justify-center items-center m-auto w-full px-2 py-4">
                    <div className="bg-gray-700 bg-opacity-60 p-2 rounded-full pt-3">
                        {products.map((_, index) => (
                            <span
                                key={index}
                                className={`dot hover:cursor-pointer ${
                                    index === currentIndex ? "active" : ""
                                }`}
                                onClick={() => setCurrentIndex(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
