import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachometerAlt,
    faBoxOpen,
    faUsers,
    faCubes,
    faTags,
    faComments,
    faCog,
    faSignOutAlt,
    faTools,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [activeMenu, setActiveMenu] = useState("Dashboard");

    const menuItems = [
        { name: "Dashboard", icon: faTachometerAlt, path: "dashboard" },
        { name: "Orders", icon: faBoxOpen, path: "orders" },
        { name: "Users", icon: faUsers, path: "users" },
        { name: "Product", icon: faCubes, path: "product" },
        { name: "Categories", icon: faTags, path: "categories" },
        { name: "Reviews", icon: faComments, path: "reviews" },
        { name: "Site Setting", icon: faTools, path: "site-setting" },
        { name: "Setting", icon: faCog, path: "setting" },
        { name: "Logout", icon: faSignOutAlt, path: "logout" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
                <div className="p-4 text-center text-lg font-bold dark:text-white">
                    Admin Panel
                </div>
                <nav className="mt-4">
                    <ul>
                        {menuItems.map((item) => (
                            <li
                                key={item.name}
                                className={`p-4 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer ${
                                    activeMenu === item.name
                                        ? "bg-gray-200 dark:bg-gray-700"
                                        : ""
                                }`}
                                onClick={() => setActiveMenu(item.name)}
                            >
                                <Link
                                    href={`/admin/${item.path}`}
                                    className="flex items-center"
                                >
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className="mr-3"
                                    />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
};

export default AdminLayout;
