import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { User } from "@/types/index";
import Users from "@/Components/Admin/Users";

export default function UserPage({
    auth,
}: PageProps<{ auth: { user: User } }>) {
    return (
        <>
            <AdminLayout auth={auth.user}>
                <Head title="Admin User Management" />
                <Users
                    users={[]}
                    onUpdateUser={function (updatedUser: User): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            </AdminLayout>
        </>
    );
}
