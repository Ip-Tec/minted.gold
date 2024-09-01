import { useState, useEffect, useRef } from "react";
import { PageProps } from "@/types";
import { Head, usePage, useForm } from "@inertiajs/react";
import AccountDetails from "@/Components/User/AccountDetails";
import ShippingAddress from "@/Components/User/ShippingAddress";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faShippingFast,
    faCreditCard,
    faBoxOpen,
    faHeart,
    faUserEdit,
    faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Orders from "@/Components/User/Orders";
import Wishlist from "@/Components/User/Wishlist";
import Profile from "@/Components/User/Profile";

export default function Dashboard({ auth, ziggy }: PageProps) {
    const { url } = usePage(); // Access page properties including URL
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const sectionQuery = queryParams.get("q");

    const [activeSection, setActiveSection] = useState<
        "profile" | "account" | "shipping" | "orders" | "payment" | "wishlist"
    >(
        (sectionQuery as
            | "profile"
            | "account"
            | "shipping"
            | "orders"
            | "payment"
            | "wishlist") || "profile"
    );

    const [profilePicture, setProfilePicture] = useState<string>(
        auth.user.avatar
            ? `/storage/${auth.user.avatar}`
            : "https://via.placeholder.com/150"
    );

    const { post, setData } = useForm({
        avatar: null,
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (sectionQuery) {
            setActiveSection(
                sectionQuery as
                    | "account"
                    | "shipping"
                    | "orders"
                    | "payment"
                    | "wishlist"
            );
        }
    }, [sectionQuery]);

    const handleProfilePictureChange = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result as string);
            };
            reader.readAsDataURL(file);

            setData("avatar", file as any); // Set the file in the form data
            handleSubmit();
        }
    };
    const handleSubmit = () => {
        post(route("user.settings.update"), {
            forceFormData: true,
            only: ["data", "success", "error"],
            onSuccess: (page) => {
                if (
                    page.props.data &&
                    typeof page.props.data === "object" &&
                    "avatar" in page.props.data
                ) {
                    console.log({ page });
                    setProfilePicture(`/storage/${page.props.data.avatar}?${new Date().getTime()}`);
                    // setProfilePicture(page.props.data.avatar as string);
                }
            },
            onError: (error) => {
                console.error(error);
            },
        });
    };
    const renderActiveSection = () => {
        switch (activeSection) {
            case "profile":
                return <Profile auth={auth} ziggy={ziggy} />;
            case "account":
                return <AccountDetails auth={auth} ziggy={ziggy} />;
            case "shipping":
                return <ShippingAddress auth={auth} ziggy={ziggy} />;
            case "payment":
                return <div>Payment Methods Component</div>;
            case "orders":
                return <Orders auth={auth} ziggy={ziggy} />;
            case "wishlist":
                return <Wishlist />;
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="flex flex-col md:flex-row min-h-screen w-full">
                {/* Sidebar */}
                <div
                    className={`bg-white dark:bg-gray-800 shadow-lg lg:relative md:w-64 flex-shrink-0 transition-transform duration-300 ease-in-out md:static ${
                        isSidebarOpen ? "block" : "hidden md:block"
                    }`}
                >
                    <div className="flex flex-col items-center p-4 border-b border-gray-200 dark:border-gray-700">
                        <div
                            className="relative cursor-pointer"
                            onClick={handleProfilePictureChange}
                        >
                            <img
                                src={profilePicture}
                                alt={auth.user.name}
                                className="w-32 h-32 rounded-full object-cover"
                            />
                            <div className="absolute flex items-center justify-center bg-black bg-opacity-50 rounded-full h-8 w-8 bottom-0 right-0.5">
                                <span className="text-white text-sm text-center">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="text-white text-sm text-center"
                                    />
                                </span>
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        <nav className="mt-6 w-full overflow-x-hidden">
                            <ul className="flex md:flex-col gap-3 flex-nowrap overflow-auto">
                                <li
                                    className={`cursor-pointer flex items-center gap-2 py-4 ${
                                        activeSection === "profile"
                                            ? "text-blue-500 font-semibold"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                    onClick={() => setActiveSection("profile")}
                                >
                                    <FontAwesomeIcon
                                        title="Profile"
                                        icon={faUserEdit}
                                        className="text-5xl md:text-base"
                                    />
                                    <span className="hidden md:block">
                                        Profile
                                    </span>
                                </li>
                                <li
                                    className={`cursor-pointer flex items-center gap-2 py-4 ${
                                        activeSection === "account"
                                            ? "text-blue-500 font-semibold"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                    onClick={() => setActiveSection("account")}
                                >
                                    <FontAwesomeIcon
                                        title="Account Details"
                                        icon={faUser}
                                        className="text-5xl md:text-base"
                                    />
                                    <span className="hidden md:block">
                                        Account Details
                                    </span>
                                </li>
                                <li
                                    className={`cursor-pointer flex items-center gap-2 py-4 ${
                                        activeSection === "shipping"
                                            ? "text-blue-500 font-semibold"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                    onClick={() => setActiveSection("shipping")}
                                >
                                    <FontAwesomeIcon
                                        title="Shipping Address"
                                        icon={faShippingFast}
                                        className="text-5xl md:text-base"
                                    />
                                    <span className="hidden md:block">
                                        Shipping Address
                                    </span>
                                </li>
                                <li
                                    className={`cursor-pointer flex items-center gap-2 py-4 ${
                                        activeSection === "payment"
                                            ? "text-blue-500 font-semibold"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                    onClick={() => setActiveSection("payment")}
                                >
                                    <FontAwesomeIcon
                                        title="Payment Methods"
                                        icon={faCreditCard}
                                        className="text-5xl md:text-base"
                                    />
                                    <span className="hidden md:block">
                                        Payment Methods
                                    </span>
                                </li>
                                <li
                                    className={`cursor-pointer flex items-center gap-2 py-4 ${
                                        activeSection === "orders"
                                            ? "text-blue-500 font-semibold"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                    onClick={() => setActiveSection("orders")}
                                >
                                    <FontAwesomeIcon
                                        title="Orders"
                                        icon={faBoxOpen}
                                        className="text-5xl md:text-base"
                                    />
                                    <span className="hidden md:block">
                                        Orders
                                    </span>
                                </li>
                                <li
                                    className={`cursor-pointer flex items-center gap-2 py-4 ${
                                        activeSection === "wishlist"
                                            ? "text-blue-500 font-semibold"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                    onClick={() => setActiveSection("wishlist")}
                                >
                                    <FontAwesomeIcon
                                        title="My Wishlist"
                                        icon={faHeart}
                                        className="text-5xl md:text-base"
                                    />
                                    <span className="hidden md:block">
                                        My Wishlist
                                    </span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 md:p-6">{renderActiveSection()}</div>
            </div>
        </AuthenticatedLayout>
    );
}
