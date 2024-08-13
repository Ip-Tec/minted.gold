import React from "react";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { HomeProps } from "@/types/types";
import Newsletter from "@/Components/Newsletter";
import HeroSection from "@/Components/HeroSection";
import ProductList from "@/Components/ProductList";
import WhyBuyFromUs from "@/Components/WhyBuyFromUs";
import { CartProvider } from "@/Context/CartContext";
import { ToastProvider } from "@/Context/ToastContext";

const Home: React.FC<HomeProps> = ({ products, categories, CartItem }) => {
    console.log({ CartItem });

    return (
        <div className="w-full overflow-x-hidden">
            <ToastProvider>
                <CartProvider>
                    <Header initialCartItems={CartItem.data} />
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
