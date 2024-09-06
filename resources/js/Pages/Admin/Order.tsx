import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { User } from "@/types/index";
import Orders from "@/Components/Admin/Orders";
import { OrderProp } from "@/types/types";

type OrderPageProps = {
    orders: OrderProp[];
    auth: { user: User };
};
export default function Order({ orders, auth }: OrderPageProps) {
    return (
        <>
            <AdminLayout auth={auth.user}>
                <Head title="Order Management" />
                <Orders orders={orders} />
            </AdminLayout>
        </>
    );
}
