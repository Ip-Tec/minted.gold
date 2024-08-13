import React from "react";
import { ProductListProps } from "@/types/types";
import CategoryList from "@/Components/CategoryList";
import MainProductList from "@/Components/MainProductList";

const ProductList: React.FC<ProductListProps> = ({ products, categories }) => {
    return (
        <div className="w-full p-3 mx-auto">
            <CategoryList categories={categories} />
            <MainProductList products={products} />
        </div>
    );
};

export default ProductList;
