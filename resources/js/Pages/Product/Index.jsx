// Pages/Product/Index.jsx

import React from "react";
import { Head } from "@inertiajs/react";

import NavBar from "@/Components/Navegation/NavBar";
import NewProducts from "@/Components/Product/NewProducts";
import Footer from "@/Components/Footer/Footer";
import Featured from "@/Components/Product/Featured";
import ProductDisplay from "@/Components/Product/ProductDisplay";
import Pagination from "@/Components/Navegation/Pagination";
import MyGuestLayout from "@/Layouts/MyGuestLayout";

const ProductIndex = ({
    products,
    productsDisplay,
    productsFeatured,
    auth,
}) => {
    return (
        <>
            <MyGuestLayout>
                <NavBar />
                <Head title="Product" />
                <div className="max-w-screen-m mx-auto mt-20 z-10">
                    <Featured products={productsFeatured.data} />
                    <ProductDisplay products={productsDisplay.data} />
                    <NewProducts products={products.data} />

                    <Pagination products={products} />
                </div>
                <Footer />
            </MyGuestLayout>
        </>
    );
};

export default ProductIndex;
