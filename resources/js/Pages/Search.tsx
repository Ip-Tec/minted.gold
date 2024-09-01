import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import MainProductList from "@/Components/User/MainProductList";
import { MainProductListProps } from "@/types/types";

const SearchPage: React.FC<MainProductListProps> = ({ products }) => {
    const { data, setData, get } = useForm({
        query: "",
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData("query", e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        get(route("search"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Search Products</h1>
            <form onSubmit={handleSearchSubmit} className="mb-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full md:w-3/4">
                        <input
                            type="text"
                            value={data.query}
                            onChange={handleSearchChange}
                            placeholder="Search for products..."
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="w-full md:w-1/4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </form>
            <MainProductList products={products} />
        </div>
    );
};

export default SearchPage;
