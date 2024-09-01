import React from "react";
import { ProductListProps } from "@/types/types";
import CategoryList from "@/Components/User/CategoryList";
import MainProductList from "@/Components/User/MainProductList";

const ProductList: React.FC<ProductListProps> = ({ products, categories }) => {
    return (
        <div className="w-full p-3 mx-auto">
            <CategoryList categories={categories} />
            <MainProductList products={products} />
        </div>
    );
};

export default ProductList;
