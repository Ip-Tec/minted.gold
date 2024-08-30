import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachometerAlt,
    faBoxOpen,
    faUsers,
    faCubes,
    faTags,
    faStar,
    faCog,
    faSignOutAlt,
    faChevronDown,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link, usePage } from "@inertiajs/react";
import { User } from "@/types/index";

export default function SideNav({
    auth,
    activeSection,
    setActiveSection,
}: {
    auth: User;
    activeSection: string;
    setActiveSection: (section: string) => void;
}) {
    const [siteSettingsOpen, setSiteSettingsOpen] = useState(false);
    const { url } = usePage();

    const navItems = [
        { name: "Dashboard", icon: faTachometerAlt, path: "dashboard" },
        { name: "Orders", icon: faBoxOpen, path: "orders" },
        { name: "Users", icon: faUsers, path: "users" },
        { name: "Product", icon: faCubes, path: "product" },
        { name: "Categories", icon: faTags, path: "categories" },
        { name: "Reviews", icon: faStar, path: "reviews" },
        { name: "Setting", icon: faCog, path: "settings" },
    ];

    // Use useEffect to update activeSection when URL changes
    useEffect(() => {
        const currentPath = url.split("/").pop();
        const activeNavItem = navItems.find(
            (item) => item.path === currentPath
        );

        if (activeNavItem) {
            setActiveSection(activeNavItem.name);
        } else if (currentPath === "cart-settings") {
            setActiveSection("Cart");
            setSiteSettingsOpen(true);
        } else if (currentPath === "review-settings") {
            setActiveSection("Review");
            setSiteSettingsOpen(true);
        }
    }, [url, navItems, setActiveSection]);

    return (
        <div className="bg-gray-800 w-64 flex-shrink-0 fixed h-screen">
            <div className="p-4 flex items-center justify-center border-b border-gray-700 overflow-x-hidden relative">
                <img
                    src={
                        `/storage/${auth.avatar}` || "/image/default-avatar.png"
                    }
                    alt="Admin Avatar"
                    className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                    <h2 className="text-lg font-semibold">{auth.name}</h2>
                    <p className="text-sm">Admin</p>
                </div>
            </div>
            <nav className="mt-4 h-[calc(100vh-10rem)] overflow-y-scroll scroll-m-0 scroll-smooth scrollbar-hide">
                <ul className="space-y-2 relative overflow-x-hidden">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={`/admin-state/${item.path}`}
                                className={`flex items-center px-3 py-[0.375rem] hover:bg-gray-700 ${
                                    activeSection === item.name
                                        ? "bg-gray-700"
                                        : ""
                                }`}
                                onClick={() => setActiveSection(item.name)}
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className="mr-3"
                                />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    {/* Site Setting with Dropdown */}
                    <li>
                        <div
                            className="flex items-center p-3 hover:bg-gray-700 cursor-pointer"
                            onClick={() =>
                                setSiteSettingsOpen(!siteSettingsOpen)
                            }
                        >
                            <FontAwesomeIcon icon={faCog} className="mr-3" />
                            Site Setting
                            <FontAwesomeIcon
                                icon={
                                    siteSettingsOpen
                                        ? faChevronUp
                                        : faChevronDown
                                }
                                className="ml-auto"
                            />
                        </div>
                        {siteSettingsOpen && (
                            <ul className="ml-4 mt-2 space-y-2">
                                <li>
                                    <Link
                                        href="/admin-state/cart-settings"
                                        className={`flex items-center p-3 hover:bg-gray-700 ${
                                            activeSection === "Cart"
                                                ? "bg-gray-700"
                                                : ""
                                        }`}
                                        onClick={() => setActiveSection("Cart")}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="mr-3"
                                        />
                                        Cart
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin-state/review-settings"
                                        className={`flex items-center p-3 hover:bg-gray-700 ${
                                            activeSection === "Review"
                                                ? "bg-gray-700"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setActiveSection("Review")
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className="mr-3"
                                        />
                                        Review
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    {/* Logout */}
                    <li className="fixed bottom-0 w-64 bg-orange-700 hover:bg-gray-700 hover:text-orange-500 border-orange-700 border-t-2 text-white">
                        <button
                            onClick={() => {
                                // Handle logout functionality here
                            }}
                            className="flex items-center p-3 w-full text-left"
                        >
                            <FontAwesomeIcon
                                icon={faSignOutAlt}
                                className="mr-3"
                            />
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
