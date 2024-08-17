import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useForm } from "@inertiajs/react";
import { Product, SearchResults } from "@/types/types";

interface SearchFormProps {
    isSearchOpen: boolean;
    onClose: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ isSearchOpen, onClose }) => {
    const { data, setData, get } = useForm({
        query: "",
    });
    const [searchQueryData, setSearchQueryData] = useState<SearchResults>();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData("query", e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        get(route("search"), {
            preserveScroll: true,
            preserveState: true,
            only: ["products"],
            onSuccess: (data) => {
                if (data.props && "products" in data.props) {
                    setSearchQueryData(data.props.products as SearchResults);
                }
                setData("query", "");
            },
        });
    };

    return (
        <>
            <form
                onSubmit={handleSearchSubmit}
                className={`absolute top-12 w-screen md:w-[30rem] dark:bg-gray-800 bg-white shadow-lg py-4 md:px-6 -right-[5.3rem] h-auto md:right-0 transform rounded-b-xl ${
                    isSearchOpen ? "md:translate-x-0" : "md:-translate-x-full"
                } md:transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="flex items-center rounded-3xl border border-gray-300 dark:border-gray-600 focus-within:ring-2 dark:focus-within:ring-gray-600 ring-gray-300 md:pl-2">
                    <input
                        type="text"
                        value={data.query}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="px-4 py-2 w-full rounded-l-3xl bg-transparent dark:text-white text-black focus:outline-none focus:ring-0 border-none"
                    />
                    <button type="submit" className="p-2">
                        <FaSearch className="text-xl text-gray-400 dark:text-gray-300 hover:text-gray-500" />
                    </button>
                </div>

                <div className="my- h-screen overflow-y-scroll">
                    <h3 className="text-lg font-semibold text-center dark:text-white text-black">
                        Most Frequently Searched
                    </h3>
                    <div className="flex justify-center pt-2">
                        <span
                            onClick={onClose}
                            className="text-center text-gray-700 dark:text-gray-200 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer flex items-center justify-center"
                        >
                            X
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-3 mb-36 text-black dark:text-white h-auto overflow-auto w-full rounded-b-xl">
                        {searchQueryData &&
                            searchQueryData.data &&
                            searchQueryData.data.length > 0 && (
                                <>
                                    {searchQueryData.data.map(
                                        (product: Product) => (
                                            <Link
                                                href={`/view/${product.slug}`}
                                                key={product.id}
                                                className="flex flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-150 ease-in-out"
                                            >
                                                <img
                                                    src={product.main_image}
                                                    alt={product.name}
                                                    className="h-32 w-32 object-contain mb-2"
                                                />
                                                <h3 className="text-center text-sm font-medium dark:text-gray-200">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                        )
                                    )}
                                </>
                            )}
                    </div>
                </div>
            </form>
        </>
    );
};

export default SearchForm;
