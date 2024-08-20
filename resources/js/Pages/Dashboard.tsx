import { useState } from "react";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import AccountDetails from "@/Components/AccountDetails";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ShippingAddress from "@/Components/ShippingAddress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard({ auth, ziggy }: PageProps) {
    const [activeSection, setActiveSection] = useState<
        "account" | "shipping" | "payment"
    >("account");
    const {get, post, data, setData} = useForm()

    // State for storing the selected profile picture
    const [profilePicture, setProfilePicture] = useState<string>(
        auth.user.avatar || "https://via.placeholder.com/150"
    );

    // State for toggling the sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Reference to the hidden file input element
    let fileInputRef: HTMLInputElement | null = null;

    
    const handleProfilePictureChange = () => {
        if (fileInputRef) {
            fileInputRef.click(); // Trigger the file input click
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result as string); // Update the state with the preview URL
            };
            reader.readAsDataURL(file);
        }
    };

    const renderActiveSection = () => {
        switch (activeSection) {
            case "account":
                return <AccountDetails auth={auth} ziggy={ziggy} />;
            case "shipping":
                return <ShippingAddress auth={auth} ziggy={ziggy} />;
            case "payment":
                return <div>Payment Methods Component</div>;
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <div
                    className={`inset-y-0 left-0 z-30 w-64 transform lg:transform-none bg-white dark:bg-gray-800 shadow-lg lg:relative lg:static transition-transform duration-300 ease-in-out ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
                >
                    <div className="flex flex-col items-center p-4 border-r border-gray-200 dark:border-gray-700">
                        <div
                            className="relative cursor-pointer"
                            onClick={handleProfilePictureChange}
                        >
                            <img
                                src={profilePicture}
                                alt={auth.user.name}
                                className="w-32 h-32 rounded-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                <span className="text-white text-sm text-center">
                                    Click to change photo
                                </span>
                            </div>
                        </div>
                        {/* Hidden file input for profile picture */}
                        <input
                            type="file"
                            ref={(ref) => (fileInputRef = ref)}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        <nav className="mt-6 w-full">
                            <ul className="flex flex-col gap-4">
                                <li
                                    className={`cursor-pointer ${
                                        activeSection === "account"
                                            ? "text-blue-500 font-semibold"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                    onClick={() => setActiveSection("account")}
                                >
                                    Account Details
                                </li>
                                <li
                                    className={`cursor-pointer ${
                                        activeSection === "shipping"
                                            ? "text-blue-500 font-semibold"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                    onClick={() => setActiveSection("shipping")}
                                >
                                    Shipping Address
                                </li>
                                <li
                                    className={`cursor-pointer ${
                                        activeSection === "payment"
                                            ? "text-blue-500 font-semibold"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                    onClick={() => setActiveSection("payment")}
                                >
                                    Payment Methods
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col lg:ml-64">
                    <div className="flex-shrink-0 px-4 py-2 lg:hidden">
                        <button
                            className="text-gray-800 dark:text-gray-200"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <FontAwesomeIcon
                                icon={isSidebarOpen ? faTimes : faBars}
                                size="2x"
                            />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="py-12 max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                            {renderActiveSection()}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
