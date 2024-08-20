import { useState } from "react";
import { PageProps, User } from "@/types";
import axios from "axios";
import { useForm, usePage } from "@inertiajs/react";

const AccountDetails = ({ auth }: PageProps) => {
    const [userState, setUserState] = useState<User>(auth.user);
    const { get, post, setData, data } = useForm({
        name: userState.name,
        email: userState.email,
        gender: userState.gender,
        day: userState.day,
        month: userState.month,
        year: userState.year,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setUserState({
            ...userState,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Submit the updated user details to the server
        try {
            post("/user/update", {
                preserveScroll: true,
                only: [
                    "name",
                    "email",
                    "gender",
                    "day",
                    "month",
                    "year",
                    "avatar",
                    "message",
                ],
                onSuccess: () => {
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
        <>
            {/* Form */}
            <div className="lg:w-2/3 p-6">
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
                                value={userState.name}
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
                                value={userState.name}
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
                                    <option>10</option>
                                    {/* Add more days */}
                                </select>
                                <select
                                    name="month"
                                    value={userState.month}
                                    onChange={handleInputChange}
                                    className="block w-1/3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                                >
                                    <option>June</option>
                                    {/* Add more months */}
                                </select>
                                <select
                                    name="year"
                                    value={userState.year}
                                    onChange={handleInputChange}
                                    className="block w-1/3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                                >
                                    <option>1990</option>
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
                                {/* Add more gender options */}
                            </select>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AccountDetails;
