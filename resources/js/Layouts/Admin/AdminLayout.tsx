import { useState } from "react";
import { User } from "@/types/index";
import SideNav from "@/Components/Admin/SideNav";

export default function AdminLayout({
    children,
    auth,
}: {
    children: React.ReactNode;
    auth: User;
}) {
    const [activeSection, setActiveSection] = useState("Dashboard");

    return (
        <div className="flex min-h-screen h-auto bg-gray-900 text-white">
            <SideNav
                auth={auth}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Top Nav */}
                <div className="bg-gray-800 shadow fixed w-full top-0 z-10">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        {/* <h1 className="text-xl font-bold text-white">
                            Admin Panel
                        </h1> */}
                        <div>
                            <p className="text-gray-400">
                                Welcome, {auth.name}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="pt-20 px-4 h-auto">{children}</div>
            </div>
        </div>
    );
}
