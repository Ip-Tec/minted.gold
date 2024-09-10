import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { User } from "@/types/index";
import ProductComponent from "@/Components/Admin/ProductComponent";
import { Product } from "@/types/types";

export default function ProductPage({
    auth,
    products,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    auth: { user: User };
    products: Product[];
}>) {
    console.log({ products });
    return (
        <>
            <AdminLayout auth={auth.user}>
                <Head title="Product Management" />
                <ProductComponent product={products} />
            </AdminLayout>
        </>
    );
}
