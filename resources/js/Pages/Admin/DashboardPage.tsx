import { Link, Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { User } from "@/types/index";
import Dashboard from "@/Components/Admin/Dashboard";
import { DashboardProps } from "@/types/types";

type WelcomeProps = DashboardProps & {
    auth: { user: User };
};

export default function DashboardPage({
    totalUsers,
    totalProducts,
    totalOrders,
    productData,
    orderData,
    reviewData,
    auth,
}: WelcomeProps) {
    return (
        <>
            <AdminLayout auth={auth.user}>
                <Head title="Dashboard" />
                <Dashboard
                    totalOrders={totalOrders}
                    totalProducts={totalProducts}
                    totalUsers={totalUsers}
                    productData={productData}
                    orderData={orderData}
                    reviewData={reviewData}
                />
            </AdminLayout>
        </>
    );
}
