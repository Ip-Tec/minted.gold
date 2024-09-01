import React from "react";
import { CategoryListProps } from "@/types/types";

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
    return (
        <div className="p-4 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="relative rounded-lg overflow-hidden bg-cover bg-center h-48"
                        style={{ backgroundImage: `url(${category.image})` }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <a
                                href="#"
                                className="text-white text-xl font-bold bg-black bg-opacity-50 py-3 px-6 rounded-full hover:bg-opacity-70"
                            >
                                {category.name}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
