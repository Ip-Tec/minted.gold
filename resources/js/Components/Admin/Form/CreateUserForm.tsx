import React, { useState } from "react";

interface CreateUserFormProps {
    onClose: () => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "",
        password: "",
        isAdmin: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement the logic to create the user or admin
        console.log("User/Admin Created:", formData);
        onClose(); // Close the modal after submission
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h2 className="text-lg font-bold mb-4 text-white">
                Create User/Admin
            </h2>
            <div className="mb-4">
                <label className="block text-gray-100">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded text-black"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-gray-100">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-100">Phone Number</label>
                    <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full p-2 border rounded text-black"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-100">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded text-black"
                />
            </div>
            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        name="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleChange}
                        className="form-checkbox"
                    />
                    <span className="ml-2 text-gray-100">Is Admin</span>
                </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Create
                </button>
                <button
                    onClick={onClose}
                    type="submit"
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                    Close
                </button>
            </div>
        </form>
    );
};

export default CreateUserForm;
