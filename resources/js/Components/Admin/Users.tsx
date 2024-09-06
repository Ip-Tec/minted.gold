import React from "react";
import { User } from "@/types/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@inertiajs/react";
interface AdminUserManagementProps {
    users: User[];
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onUpdateUser: (updatedUser: User) => void;
}

const Users: React.FC<AdminUserManagementProps> = ({
    users,
    searchQuery,
    onSearchChange,
    onUpdateUser,
}) => {
    const { post, get } = useForm({ search: null });
    const handleActivateDeactivate = (user: User) => {
        const updatedUser = { ...user, isActive: !user.isActive };
        onUpdateUser(updatedUser);
    };

    const handleDeleteUndo = (user: User) => {
        const updatedUser = { ...user, isDeleted: !user.isDeleted };
        onUpdateUser(updatedUser);
    };

    const handleSearchSubmit = () => {
        get(route("admin.users")); // Triggers a GET request with the search query
    };

    return (
        <div className="admin-user-management">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">User Management</h2>
                <div className="flex border rounded text-black bg-white">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={onSearchChange}
                        className="bg-transparent border-none focus:outline-none focus:border-none"
                    />

                    <button
                        onClick={handleSearchSubmit}
                        className="py-2 px-3 bg-orange-500 text-white rounded hover:bg-white hover:text-orange-500 hover:border-orange-500 border"
                    >
                        <FontAwesomeIcon icon={faSearch} className="w-4" />
                    </button>
                </div>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Avatar</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border p-1 w-28 h-28">
                                <img
                                    src={`/storage/${user.avatar}`}
                                    className="w-full h-full object-cover rounded-full"
                                    alt={`${user.name} avatar`}
                                />
                            </td>
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">
                                {user.isDeleted
                                    ? "Deleted"
                                    : user.isActive
                                    ? "Active"
                                    : "Inactive"}
                            </td>
                            <td className="border p-2">
                                <button
                                    onClick={() =>
                                        handleActivateDeactivate(user)
                                    }
                                    className={`px-4 py-2 rounded mr-2 ${
                                        user.isActive
                                            ? "bg-red-500"
                                            : "bg-green-500"
                                    } text-white`}
                                >
                                    {user.isActive ? "Deactivate" : "Activate"}
                                </button>
                                <button
                                    onClick={() => handleDeleteUndo(user)}
                                    className={`px-4 py-2 rounded ${
                                        user.isDeleted
                                            ? "bg-blue-500"
                                            : "bg-gray-500"
                                    } text-white`}
                                >
                                    {user.isDeleted ? "Undo Delete" : "Delete"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default Users;
