import React from "react";
import Footer from "@/Components/User/Footer";
import Header from "@/Components/User/Header";
import { HomeProps } from "@/types/types";
import Newsletter from "@/Components/User/Newsletter";
import HeroSection from "@/Components/User/HeroSection";
import ProductList from "@/Components/User/ProductList";
import WhyBuyFromUs from "@/Components/User/WhyBuyFromUs";
import { CartProvider } from "@/Context/CartContext";
import { ToastProvider } from "@/Context/ToastContext";

const Home: React.FC<HomeProps> = ({ products, categories, CartItems }) => {
    console.log({ CartItems, products });

    return (
        <div className="w-full overflow-x-hidden">
            <ToastProvider>
                <CartProvider>
                    <Header initialCartItems={CartItems?.data || []} />
                    <HeroSection />
                    <ProductList products={products} categories={categories} />
                    <WhyBuyFromUs />
                    <Newsletter />
                    <Footer />
                </CartProvider>
            </ToastProvider>
        </div>
    );
};

export default Home;
