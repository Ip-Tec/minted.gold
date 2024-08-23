import { PageProps, User } from "@/types";
import { Link } from "@inertiajs/react";

const Profile = ({ auth }: PageProps) => {
    const fullName = auth.user.name || "";
    const nameParts = fullName.split(" ");

    const userState: User = {
        ...auth.user,
        first_name: nameParts[0],
        last_name: nameParts.slice(1).join(" "),
    };

    return (
        <div className="w-auto mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Profile Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        First Name
                    </label>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">
                        {userState.first_name}
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Last Name
                    </label>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">
                        {userState.last_name}
                    </p>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        E-Mail
                    </label>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">
                        {userState.email}
                    </p>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date of Birth
                    </label>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">
                        {`${userState.DOB}`}
                    </p>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Gender
                    </label>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">
                        {userState.gender}
                    </p>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Address
                    </label>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">
                        {userState.address}
                    </p>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Country
                    </label>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">
                        {userState.country}
                    </p>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        State
                    </label>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">
                        {userState.state}
                    </p>
                </div>
            </div>
            <Link
                href="/dashboard/?q=account"
                className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md"
            >
                Edit Profile
            </Link>
        </div>
    );
};

export default Profile;
