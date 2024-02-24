import { useEffect, useRef } from "react";
import AdminGuestLayout from "@/Admin/Layout/AdminGuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Footer from "./Footer";
import Toast from "@/Components/Toast";

export default function Register({ user, message }) {
    console.log({ message });

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const toast = useRef(null);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        try {
            await post(route("admin.register"));
            console.log({ errors });
            console.log(Object.keys(errors).length);
            if (Object.keys(errors).length == 0) {
                // Show success message or perform any other action as needed
                toast.current.showSuccess("Registration successful!");

                // Redirect to the login page after a delay
                setTimeout(() => {
                    window.location.href = route("admin.login");
                    route("admin.login");
                    console.log(route("admin.login"));
                }, 200);
            }
        } catch (error) {
            toast.current.showError(`Registration error: ${error.message}`);
            // Handle errors if necessary
        }
    };

    return (
        <AdminGuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className="">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-evenly mt-4">
                    <Link
                        href={route("admin.login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        {processing ? "Loading..." : "Register"}
                    </PrimaryButton>
                </div>
            </form>
            {/* Toast component */}
            <Toast ref={toast} />
            <Footer />
        </AdminGuestLayout>
    );
}
