import { Link, Head, usePage } from "@inertiajs/react";
import ApplicationLogo from "../ApplicationLogo";
import Search from "../Product/Search";
import Cart from "../Product/Cart";

function NavBar() {
    const { auth } = usePage().props;
    return (
        <>
            <Head title="Navigation" />
            <div className="w-full fixed top-0 right-0 p-3 bg-yellow-600 flex justify-between items-center h-20 z-50">
                <div className="flex justify-between items-center w-auto">
                    <Link href={"/"}>
                        <img src="../logo.jpg" className="w-12" />
                    </Link>
                    <p className="text-xs sm:text-md text-white font-bold mx-1 sm:mx-2 sm:flex">
                        <span className="hidde sm:flex">
                            Current Gold Price{" "}
                        </span>
                        <span> $1200</span>
                    </p>
                </div>
                <div className="flex justify-between items-center w-auto">
                    {auth ? (
                        // Render content for authenticated user
                        <Link
                            href="/dashboard"
                            className="font-semibold text-gray-200 hover:scale-110 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            {auth.name}
                        </Link>
                    ) : (
                        // Render login and register links for non-authenticated user
                        <div className="flex w-auto md:w-1/2 justify-center items-center">
                            <Link
                                href={"/login"}
                                className="text-center ms-4 p-2 font-semibold text-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline focus:outline-2 rounded-lg focus:outline-gray-200"
                            >
                                Login
                            </Link>

                            <Link
                                href={route("register")}
                                className="text-center ms-4 p-2 font-semibold text-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline focus:outline-2 rounded-lg focus:outline-gray-200"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                    <div className="flex justify-between align-middle items-center">
                        <Search />
                        <Cart />
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;
