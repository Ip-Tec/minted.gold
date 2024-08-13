import React, { useEffect, useState } from "react";
import ProductGallery from "@/Components/ProductGallery";
import ProductDetails from "@/Components/ProductDetails";
import RelatedProducts from "@/Components/RelatedProducts";
import Header from "@/Components/Header";
import { ToastProvider } from "@/Context/ToastContext";
import { CartProvider } from "@/Context/CartContext";

interface ProductImage {
    id: number;
    src: string;
}

interface Product {
    id: number;
    slug: string;
    name: string;
    price: number;
    slang_price: number;
    description: string;
    features: string[];
    images: string;
    rating: number;
    main_image: string;
}

interface ViewPageProps {
    product: Product;
    relatedProducts: Product[];
    wishlist: number[];
    CartItems: any[]; // Adjust type as per your cart item structure
}

const ViewPage: React.FC<ViewPageProps> = ({
    product,
    relatedProducts,
    wishlist,
    CartItems,
}) => {
    const categories = [];
    const imageArray = JSON.parse(product.images);
    const transformedImages: ProductImage[] = imageArray.map(
        (url: string, index: number) => ({
            id: index,
            src: url,
        })
    );

    console.log({ product, relatedProducts, wishlist, CartItems });

    return (
        <>
            <ToastProvider>
                <CartProvider>
                    <Header initialCartItems={CartItems} />
                    <div className="container mx-auto p-4 mt-12">
                        <ProductGallery
                            images={transformedImages}
                            mainImage={product.main_image}
                        />
                        <div className="mt-6">
                            <ProductDetails
                                slug={product.slug}
                                name={product.name}
                                price={product.price}
                                slang_price={product.slang_price}
                                description={product.description}
                                features={product.features}
                                rating={product.rating}
                            />
                        </div>
                        <div className="mt-6">
                            <RelatedProducts
                                products={relatedProducts}
                                wishlist={wishlist}
                            />
                        </div>
                    </div>
                </CartProvider>
            </ToastProvider>
        </>
    );
};

export default ViewPage;
