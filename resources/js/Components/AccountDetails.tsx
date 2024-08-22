import { useState } from "react";
import { PageProps, User } from "@/types";
import { useForm } from "@inertiajs/react";

const AccountDetails = ({ auth }: PageProps) => {
    const fullName = auth.user.name || "";
    const nameParts = fullName.split(" ");
    const [userState, setUserState] = useState<User>({
        ...auth.user,
        first_name: nameParts[0],
        last_name: nameParts.slice(1).join(" "),
    });

    const { post, setData, data } = useForm({
        first_name: userState.first_name,
        last_name: userState.last_name,
        email: userState.email,
        gender: userState.gender,
        day: userState.day,
        month: userState.month,
        year: userState.year,
        avatar: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setUserState({
            ...userState,
            [name]: value,
        });
        setData(
            name as
                | "email"
                | "month"
                | "day"
                | "year"
                | "gender"
                | "avatar"
                | "first_name"
                | "last_name",
            value
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fullName = `${data.first_name} ${data.last_name}`;

        // Submit the updated user details to the server
        try {
            post("/user/settings", {
                data: {
                    name: fullName,
                    email: data.email,
                    gender: data.gender,
                    day: data.day,
                    month: data.month,
                    year: data.year,
                    avatar: data.avatar,
                },
                preserveScroll: true,
                only: [
                    "phone_number",
                    "address",
                    "city",
                    "state",
                    "country",
                    "postal_code",
                ],
                onSuccess: (page) => {
                    console.log({ page });

                    console.log("User details updated successfully!");
                },
                onError: (errors) => {
                    console.error("Failed to update user details:", errors);
                },
            });
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        }
    };

    return (
        <div className="w-auto mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Account Details
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            First Name *
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            value={userState.first_name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={userState.last_name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            E-Mail *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={userState.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Date of Birth *
                        </label>
                        <div className="flex gap-4">
                            <select
                                name="day"
                                value={userState.day}
                                onChange={handleInputChange}
                                className="block w-1/3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                            >
                                <option value="">10</option>
                                {/* Add more days */}
                            </select>
                            <select
                                name="month"
                                value={userState.month}
                                onChange={handleInputChange}
                                className="block w-1/3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                            >
                                <option value="">June</option>
                                {/* Add more months */}
                            </select>
                            <select
                                name="year"
                                value={userState.year}
                                onChange={handleInputChange}
                                className="block w-1/3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                            >
                                <option value="">1990</option>
                                {/* Add more years */}
                            </select>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Gender *
                        </label>
                        <select
                            name="gender"
                            value={userState.gender}
                            onChange={handleInputChange}
                            className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                        >
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
                    >
                        Update Details
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountDetails;
