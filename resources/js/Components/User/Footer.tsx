import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faLinkedin,
    faXTwitter,
    faTiktok,
    faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
    return (
        <footer className="text-white w-full">
            <div className="bg-gray-700 m-auto p-3 mx-auto w-full flex flex-col flex-nowrap items-center justify-center">
                <h2 className="text-center p-2">FOLLOW US</h2>
                <div className="w-full m-auto grid grid-cols-5 gap-4 container text-center">
                    <i>
                        <FontAwesomeIcon
                            icon={faFacebookF}
                            className="text-4xl"
                        />
                    </i>
                    <i>
                        <FontAwesomeIcon
                            icon={faXTwitter}
                            className="text-4xl"
                        />
                    </i>
                    <i>
                        <FontAwesomeIcon
                            icon={faInstagram}
                            className="text-4xl"
                        />
                    </i>
                    <i>
                        <FontAwesomeIcon
                            icon={faLinkedin}
                            className="text-4xl"
                        />
                    </i>
                    <i>
                        <FontAwesomeIcon icon={faTiktok} className="text-4xl" />
                    </i>
                </div>
            </div>
            <div className="px-6 py-12 bg-gray-800 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-bold mb-4">About Us</h3>
                    <p className="text-gray-400">
                        Oraimo is a leading provider of smart accessories and
                        innovative solutions to enhance your digital lifestyle.
                        Our mission is to bring high-quality, affordable
                        products to our customers.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Customer Service</h3>
                    <ul>
                        <li className="mb-2">
                            <a
                                href="#"
                                className="text-gray-400 hover:underline"
                            >
                                Help Center
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="#"
                                className="text-gray-400 hover:underline"
                            >
                                Returns
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="#"
                                className="text-gray-400 hover:underline"
                            >
                                Shipping
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="#"
                                className="text-gray-400 hover:underline"
                            >
                                Track Order
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul>
                        <li className="mb-2">
                            <a
                                href="#"
                                className="text-gray-400 hover:underline"
                            >
                                Home
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="#"
                                className="text-gray-400 hover:underline"
                            >
                                Shop
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="#"
                                className="text-gray-400 hover:underline"
                            >
                                About
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="#"
                                className="text-gray-400 hover:underline"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                    <p className="text-gray-400 mb-2">
                        123 Oraimo Street, Lagos, Nigeria
                    </p>
                    <p className="text-gray-400 mb-2">
                        Email: support@oraimo.com
                    </p>
                    <p className="text-gray-400 mb-2">
                        Phone: +234 123 456 7890
                    </p>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon
                                icon={faFacebookF}
                                className="text-xl"
                            />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon
                                icon={faXTwitter}
                                className="text-xl"
                            />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className="text-xl"
                            />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon
                                icon={faLinkedin}
                                className="text-xl"
                            />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon
                                icon={faTiktok}
                                className="text-xl"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-gray-700 text-center m-auto px-3 py-6">
                <p className="text-gray-400">
                    &copy; 2024 Oraimo. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
