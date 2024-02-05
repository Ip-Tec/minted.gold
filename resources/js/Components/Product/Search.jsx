import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchIcon from "@/Components/icons/SearchIcon";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useEffect, useState, Fragment } from "react";

function Search() {
    const cartRef = React.createRef();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data, setData, get, processing, errors, reset } = useForm({
        search: "",
    });

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // Define the closeCart function
    const closeCart = () => {
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            closeCart(); // Now closeCart is defined and can be called
        }
    };

    const submit = (e) => {
        e.preventDefault();

        get(route("products.search"));
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <div className="ms-3 relative mr-1" ref={cartRef}>
            <span onClick={toggleDropdown}>
                <SearchIcon className="cursor-pointer w-8 h-8 stroke-white stroke-[0.21rem]" />
            </span>

            <Transition
                as={Fragment}
                show={isDropdownOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                {(ref) => (
                    <div
                        ref={ref}
                        className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg"
                    >
                        {/* Dropdown content goes here */}
                        <div className="p-2 w-full">
                            <form
                                onSubmit={submit}
                                action=""
                                method="post"
                                className="flex justify-center items-center border rounded w-full p-0 m-0"
                            >
                                <TextInput
                                    id="search"
                                    type="search"
                                    name="search"
                                    value={data.search}
                                    className="mt-1 block w-full"
                                    placeholder="Search..."
                                    autoComplete="Search"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("search", e.target.value)
                                    }
                                />
                                <PrimaryButton
                                    className="ms-1 w-24 m-auto flex justify-center items-center bg-yellow-600"
                                    disabled={processing}
                                >
                                    <SearchIcon className="hover:scale-125 cursor-pointer w-9 h-9 stroke-slate-200 stroke-[0.21rem]" />
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    );
}

export default Search;
