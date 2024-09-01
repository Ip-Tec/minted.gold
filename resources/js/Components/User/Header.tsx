// Header.tsx
import { CartItem } from "@/types/types";
import SideNav from "@/Components/User/SideNav";
import { usePage } from "@inertiajs/react";
import { useCart } from "@/Context/CartContext";
import SearchForm from "@/Components/User/SearchForm";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import ApplicationLogo from "@/Components/User/ApplicationLogo";
import React, { useState, useEffect, Suspense } from "react";

const appName = import.meta.env.VITE_APP_NAME || "Minted Golds";

interface HeaderProps {
    initialCartItems?: CartItem[];
}

const Header: React.FC<HeaderProps> = ({ initialCartItems }) => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { cartItems, setCartItems } = useCart();
    const { props } = usePage<{ auth: { user: any } }>();
    const isLoggedIn = props.auth?.user !== undefined;

    // Initialize cart items from props if necessary
    useEffect(() => {
        setCartItems(initialCartItems || []);
    }, [initialCartItems, setCartItems]);

    const updateLocalStorage = () => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle search logic here
        console.log("Searching for:", searchQuery);
    };

    return (
        <header className="fixed z-50 dark:bg-gray-800 bg-slate-300 dark:text-white text-black w-full top-0">
            <div className="mx-auto flex items-center justify-between py-4 px-6">
                <div className="flex items-center">
                    <ApplicationLogo className="w-8" />
                    <span className="font-bold text-xl sm:hidden md:block">
                        {appName}
                    </span>
                </div>
                <nav className="flex space-x-4">
                    <a href="/" className="hover:text-gray-400">
                        Home
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Shop
                    </a>
                </nav>
                <div className="flex items-center justify-between">
                    <div className="relative">
                        <button className="p-2" onClick={toggleSearch}>
                            <FaSearch className="text-xl text-gray-700 dark:text-gray-300" />
                        </button>
                        {isSearchOpen && (
                            <Suspense fallback={<div>Loading...</div>}>
                                <SearchForm                                  
                                    onClose={toggleSearch}
                                    isSearchOpen={isSearchOpen}
                                />
                            </Suspense>
                        )}
                    </div>
                    <button className="relative ml-8" onClick={toggleSideNav}>
                        <div>
                            <FaShoppingCart className="w-8 h-8 text-xl text-gray-700 dark:text-gray-300" />
                        </div>
                        {cartItems.length > 0 && (
                            <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-orange-600 rounded-full">
                                {cartItems.length}
                            </div>
                        )}
                    </button>
                </div>
            </div>

            <SideNav
                isOpen={isSideNavOpen}
                onClose={() => setIsSideNavOpen(false)}
            />
        </header>
    );
};

export default Header;
