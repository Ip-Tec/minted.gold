import React from "react";
import NewsLetter from "../../Components/Footer/NewsLetter";
import { Link } from "@inertiajs/react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className="text-white bg-yellow-950 p-3 h-rem] flex justify-center items-center mt-4">
                <div className="md:flex justify-evenly items-center text-white">
                    <ul className="mx-3">
                        <h2 className="text-xl">Contact Us</h2>
                        <li className="px-3 py-2">
                            Phone: <span>+234 (0) 909 1234 234</span>
                        </li>
                        <li className="px-3 py-2">
                            Email: <span>mail@mintedgold.com.ng</span>
                        </li>
                    </ul>

                    <ul className="mx-3">
                        <h2 className="text-xl">Our Services</h2>
                        <li className="px-3 py-2">Sale of Gold</li>
                        <li className="px-3 py-2">Gold Bar</li>
                        <li className="px-3 py-2"></li>
                    </ul>
                </div>
            </div>
            <div className="text-white bg-yellow-800 p-3 flex justify-center items-center">
                <p className="p-3 text-center">
                    Copyright &copy; {currentYear}. All Rights Reserved
                </p>
            </div>
        </>
    );
}

export default Footer;
