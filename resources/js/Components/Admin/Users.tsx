import React, { useState, useEffect } from "react";
import { User } from "@/types/index"; // Define your User type

interface AdminUserManagementProps {
    users: User[]; // Array of users to be managed
    onUpdateUser: (updatedUser: User) => void; // Callback for updating user state
}

const Users: React.FC<AdminUserManagementProps> = ({ users, onUpdateUser }) => {
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        setFilteredUsers(
            users.filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, users]);

    const handleActivateDeactivate = (user: User) => {
        const updatedUser = { ...user, isActive: !user.isActive };
        onUpdateUser(updatedUser);
    };

    const handleDeleteUndo = (user: User) => {
        const updatedUser = { ...user, isDeleted: !user.isDeleted };
        onUpdateUser(updatedUser);
    };

    return (
        <div className="admin-user-management">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">User Management</h2>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded"
                />
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr
                            key={user.id}
                            className={user.isDeleted ? "opacity-50" : ""}
                        >
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
