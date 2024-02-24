import { Link, Head } from "@inertiajs/react";
import Footer from "@/Components/Footer/Footer";
import NavBar from "@/Components/Navegation/NavBar";
import Featured from "@/Components/Product/Featured";
import NewProducts from "@/Components/Product/NewProducts";
import ProductIndex from "./Product/Index";
import Guest from "@/Layouts/GuestLayout";
import ProductDisplay from "@/Components/Product/ProductDisplay";
import Pagination from "@/Components/Navegation/Pagination";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    Featureds,
    newProducts,
    products,
    productsDisplay,
    productsFeatured,
}) {
    console.log({ products, productsDisplay, productsFeatured });
    return (
        <>
            {/* <Guest> */}
              <ProductIndex auth={auth} products={products} productsDisplay={productsDisplay} productsFeatured={productsFeatured}/>
            {/* </Guest> */}
        </>
    );
}
