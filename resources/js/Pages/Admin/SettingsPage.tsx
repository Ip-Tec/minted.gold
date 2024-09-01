import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { User } from "@/types/index";
import AdminSettings from "@/Components/Admin/Setting/Settings";

export default function SettingsPage({
    auth,
}: PageProps<{ auth: { user: User } }>) {
    const handleUpdateUser = (updatedUser: FormData) => {
        // You can send a request to the server to update the user information.
        // Example using Inertia POST request
        // auth.post("/admin/update", updatedUser);
    };

    return (
        <>
            <AdminLayout auth={auth.user}>
                <Head title="Admin Settings Management" />
                <AdminSettings
                    user={auth.user} // Pass the current user (admin) to the AdminSettings component
                    onUpdateUser={handleUpdateUser} // Pass the update callback
                />
            </AdminLayout>
        </>
    );
}
