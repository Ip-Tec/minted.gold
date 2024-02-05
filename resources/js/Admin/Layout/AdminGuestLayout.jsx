import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function AdminGuestLayout({ children, link }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 p-0">
            <nav className="w-10/12 flex justify-evenly items-center text-white bg-yellow-600 px-4 py-3 absolute top-0">
                <Link href={route("admin.login")}>Login</Link>
                <Link href={route("admin.register")}>Register</Link>
            </nav>
            <div className="mt-24">
                <Link href={link || "/"}>
                    <ApplicationLogo className="w-24 h-24 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
