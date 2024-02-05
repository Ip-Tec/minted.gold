import { Link, Head, usePage, router } from "@inertiajs/react";
import AdminAuthenticated from "@/Admin/Layout/AdminAuthenticated";

export default function Settings({ canLogin, laravelVersion, phpVersion }) {
    const { auth } = usePage().props;
    console.log(auth);
    // if (!auth.user) {
    //     router.visit('/admin/auth/login');
    //     return null;
    // }
    return (
        <>
            <AdminAuthenticated user={auth.user}>
                <Head title="Settings" />
                <p className="mt-20 p-2">{laravelVersion}</p>
                <h1>Settings</h1>
                {/* <p>{phpVersion}</p> */}
            </AdminAuthenticated>
        </>
    );
}
