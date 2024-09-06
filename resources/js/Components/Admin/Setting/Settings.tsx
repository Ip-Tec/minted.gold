import React, { useState, useEffect } from "react";
import { User } from "@/types/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/User/Modal";
import CreateUserForm from "@/Components/Admin/Form/CreateUserForm";

interface AdminSettingsProps {
    user: User;
    onUpdateUser: (updatedUser: FormData) => void;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({
    user,
    onUpdateUser,
}) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        password: "",
    });
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    useEffect(() => {
        if (user.avatar) {
            setAvatarPreview(`/storage/${user.avatar}`);
        } else {
            setAvatarPreview("https://via.placeholder.com/130");
        }
    }, [user.avatar]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatar(file);

            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        if (formData.phone_number !== undefined) {
            formDataToSend.append(
                "phone_number",
                formData.phone_number.toString()
            );
        }
        if (formData.password) {
            formDataToSend.append("password", formData.password);
        }
        if (avatar) {
            formDataToSend.append("avatar", avatar);
        }

        onUpdateUser(formDataToSend);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="admin-settings container">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit Profile</h2>
                <button
                    className="text-white bg-blue-500 px-3 py-2 rounded-full absolute bottom-4 right-4"
                    onClick={openModal}
                >
                    <FontAwesomeIcon icon={faPlus} className="text-3xl" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="container max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Avatar</label>
                    <div className="relative">
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="h-24 w-24 object-cover border rounded-full"
                            />
                        ) : (
                            <div className="h-24 w-24 flex items-center justify-center border rounded-full bg-gray-100">
                                <span className="text-gray-400">Preview</span>
                            </div>
                        )}
                        <div className="absolute bottom-0 left-20 rounded-full bg-opacity-50 bg-gray-700 transform -translate-x-1/2">
                            <label
                                htmlFor="avatar"
                                className="cursor-pointer flex items-center justify-center text-white p-2 rounded-full"
                            >
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="h-5 w-5"
                                />
                            </label>
                            <input
                                id="avatar"
                                type="file"
                                name="avatar"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded text-black"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Phone Number
                        </label>
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
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded text-black"
                        placeholder="Leave blank to keep current password"
                    />
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Update Profile
                </button>
            </form>

            <Modal
                show={isModalOpen}
                maxWidth="md"
                closeable={true}
                onClose={closeModal}
            >
                <CreateUserForm onClose={closeModal} />
            </Modal>
        </div>
    );
};

export default AdminSettings;
