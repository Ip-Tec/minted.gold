import { Link, Head } from "@inertiajs/react";
import Footer from "@/Components/Footer/Footer";
import NavBar from "@/Components/Navegation/NavBar";
import Featured from "@/Components/Product/Featured";
import NewProducts from "@/Components/Product/NewProducts";
import ProductIndex from "./Product/Index";
import Guest from "@/Layouts/GuestLayout";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    Featureds,
    newProducts,
}) {
    
    return (
        <>
            <Guest>
                <Head title="Welcome" />

                <NavBar />
                <p className="mt-20 p-2">{laravelVersion}</p>
                {/* <p>{phpVersion}</p> */}
                {/* <ProductIndex products={newProducts} /> */}
                <Footer />
            </Guest>
        </>
    );
}
