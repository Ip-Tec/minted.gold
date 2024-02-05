import { Link, Head, usePage, router } from "@inertiajs/react";
import AdminAuthenticated from "@/Admin/Layout/AdminAuthenticated";

export default function Welcome({
    canLogin,
    canRegister,
    laravelVersion,
    phpVersion,
}) {
    const { auth } = usePage().props;
    console.log(auth);
    // if (!auth.user) {
    //     router.visit('/admin/auth/login');
    //     return null;
    // }
    router.get('Admin/AdminDashboard')
    return (
        <>
            <AdminAuthenticated user={auth.user}>
                <Head title="Welcome" />
                <div className="relative">
                    <h1 className="w-full text-2xl mt-0 top-0 bsolute py-2">
                        Welcome{" "}
                    </h1>
                    <div className="flex justify-evenly items-center w-full">
                        <p className="mt20 p-2">
                            laravelVersion: {laravelVersion}
                        </p>
                        <p className="p-2">phpVersion: {phpVersion}</p>
                        <p className="p-2">canLogin: {canLogin}</p>
                        <p className="p-2">canRegister: {canRegister}</p>
                    </div>
                </div>
                {/* <p>{phpVersion}</p> */}
            </AdminAuthenticated>
        </>
    );
}
