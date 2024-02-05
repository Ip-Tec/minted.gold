import Footer from "@/Components/Footer/Footer";
import NavBar from "@/Components/Navegation/NavBar";
import Pagination from "@/Components/Navegation/Pagination";
import ProductDisplay from "@/Components/Product/ProductDisplay";
import ProductsGrid from "@/Components/Product/ProductsGrid";
import MyGuestLayout from "@/Layouts/MyGuestLayout";
import { Head } from "@inertiajs/react";
import React from "react";

function search({ products, newProducts, searchTerm }) {
    console.log({ products });
    console.log({ newProducts });
    console.log({ searchTerm });

    return (
        <MyGuestLayout>
            <Head title={`Search`} />
            <NavBar />
            <wbr />
            <span className="mt-20 block">
                Found {products.total} item for {searchTerm}
            </span>
            <ProductsGrid products={products.data} />
            <Pagination products={products} />
            <ProductDisplay
                HeadingName={"Newly Add Products"}
                products={newProducts.data}
            />
            <Footer />
        </MyGuestLayout>
    );
}

export default search;
