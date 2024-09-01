import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { User } from "@/types/index";
import ProductComponent from "@/Components/Admin/ProductComponent";

export default function Order({
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
                <Head title="Product Management" />
                <ProductComponent />
            </AdminLayout>
        </>
    );
}
