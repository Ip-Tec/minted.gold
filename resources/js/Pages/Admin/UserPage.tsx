import { Link, Head, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import Users from "@/Components/Admin/Users";
import { PageProps } from "@/types";
import { User } from "@/types/index";

export default function UserPage({
    auth,
    users,
    searchQuery,
}: PageProps<{ auth: { user: User }; users: User[]; searchQuery: string }>) {
    const { setData, get, post, setError } = useForm({ search: searchQuery });

    // Search handler
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData("search", e.target.value);
        get(route("admin.users")); // Triggers a GET request with the updated search query
    };

    // Handle updating user activation/deletion status
    const handleUpdateUser = (updatedUser: User) => {
        // Send request to update the user
        post(route("admin.users.update", updatedUser.id), {
            data: { ...updatedUser },
            preserveScroll: true,
            preserveState: true,
            only: ["users", "searchQuery"],

            onSuccess: (data) => {
                // Optionally, you can do something after the request succeeds
            },
            onError: (errors) => {
                // Handle any validation errors
                // setError(errors.searchQuery);
            },
        });
    };

    return (
        <>
            <AdminLayout auth={auth.user}>
                <Head title="Admin User Management" />
                <Users
                    users={users}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onUpdateUser={handleUpdateUser} // Pass the handler to the component
                />
            </AdminLayout>
        </>
    );
}
