/* eslint-disable @next/next/no-html-link-for-pages */
// component/Header.js

import { useContext } from "react";
import { Link, router } from "@inertiajs/react";
import CartIcon from "@/components/icons/CartIcon";
import React, { useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import SearchIcon from "@/components/icons/SearchIcon";

const Header = () => {
    // const  = useRouter();
    const { cartProducts } = useContext(CartContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [currentGold, setCurrentGold] = useState(null);
    const [mobileNavActive, setMobileNavActive] = useState(false);

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        const fetchGoldPrice = async () => {
            const goldPrice = "gold price function"
            setCurrentGold(goldPrice);
        };

        fetchGoldPrice();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSearchToggle = () => {
        setShowSearch((prev) => !prev);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        // Get the input value from the form
        const searchTerm = e.target.elements.searchInput.value.trim();

        // Check if the input value is not empty
        if (searchTerm) {
            // Update the URL with the search query parameter
            router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <header className="bg-yellow-700 px-3 h-20 w-full overflow-x-hidden">
            <div
                className={`absolute z-50 mt-[5rem] right-0 sm:w-full md:w-[20rem] bg-yellow-700 rounded-b px-[2rem] flex overflow-hidden transition-all max-h-40 ${
                    showSearch ? "max-h-96 py-8" : "max-h-0 -p-16 opacity-0"
                }`}
            >
                <form
                    onSubmit={handleSearchSubmit}
                    className="bg-white flex rounded-l-full rounded-r-full px-2"
                >
                    <input
                        type="search"
                        name="searchInput"
                        placeholder="Search..."
                        className="border-none outline-none text-black bg-transparent p-2 rounded"
                    />
                    <button>
                        <SearchIcon className="w-10 hover:scale-110 stroke-black cursor-pointer" />
                    </button>
                </form>
            </div>
            <div className="flex justify-between w-auto items-center">
                <div className="flex items-center space-x-4">
                    <div className="flex-grow">
                        <Link href="/" className="text-white text-lg font-bold">
                            <img
                                src="/logo.png"
                                width={200}
                                height={200}
                                className="w-20 p-0 m-0"
                                alt="Minted Gold"
                            />
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <a
                            href={"/"}
                            className="transition-transform hover:border-b-gray-100 hover:border-b-2 hover:scale-110"
                        >
                            Home
                        </a>
                    </div>
                    <div className="flex items-center">
                        <p className="">
                            Current Gold Price {currentGold || "$200"}
                        </p>
                    </div>
                </div>
                {/* <div className="md:hidden">
            <button
              className="text-white"
              onClick={() => setMobileNavActive((prev) => !prev)}
            >
              <BarsIcon />
            </button>
          </div> */}
                <div className="flex">
                    <div className="mr-0 bottom-2 contents">
                        <span
                            href="/cart"
                            onClick={handleSearchToggle}
                            className="text-white pr-2 hover:scale-110"
                        >
                            <SearchIcon className="cursor-pointer w-10 text-white stroke-orange-50 hover:scale-110" />
                        </span>
                    </div>
                    <div className="w-[3rem] h-[3rem] mr-[1rem]">
                        <a
                            href="/cart"
                            className="text-white relative w-full h-full flex flex-nowrap pr-2 hover:scale-110 cursor-pointer"
                        >
                            <span className="absolute text-xs rounded-full w-4 h-4 p-3 right-1">
                                {cartProducts.length}
                            </span>
                            <CartIcon className="absolute right-3 bottom-2 w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
            {/* <div
          className="flex items-center"
          style={{ borderBottom: isScrolled ? "1px solid #ccc" : "none" }}
        >
          <div className="flex-grow sm:block">
             <input
              type="text"
              placeholder="Search"
              className="py-2 px-4 border border-gray-300 rounded"
            /> 
          </div>
        </div> */}
        </header>
    );
};

export default Header;
