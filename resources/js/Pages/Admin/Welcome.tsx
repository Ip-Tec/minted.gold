import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { User } from "@/types/index";
import Dashboard from "@/Components/Admin/Dashboard";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    auth: { user: User };
}>) {
    return (
        <>
            <AdminLayout auth={auth.user}>
                <Head title="Dashboard" />
                <Dashboard />
            </AdminLayout>
        </>
    );
}
