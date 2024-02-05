import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

function AdminSearch({ setSearchTerm }) {
    const { data, setData, get, processing, errors, reset } = useForm({
        search: "",
    });

    const SearchQuery = (e) => {
        setSearchTerm(e);
        setData("search", e);
    };
    const submit = (e) => {
        e.preventDefault();

        get(route("admin.product.search"));
    };

    return (
        <>
            <form onSubmit={submit} className="flex items-center mb-4 w-full">
                <div className="mx-2 flex flex-col items-start mb-4 w-full">
                    <InputLabel
                        children={true}
                        value="Search Product"
                        className="mr-0 text-xl"
                    />
                    <TextInput
                        id="search"
                        type="text"
                        value={data.search}
                        autoComplete="text"
                        isFocused={true}
                        onChange={(e) => SearchQuery(e.target.value)}
                        className="border rounded-md p-3 mt-1 block w-[75%] /4"
                        placeholder="Search products..."
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <PrimaryButton
                    className="w-[6rem] h-[3rem] text-center hover:bg-transparent hover:border-gray-800 hover:text-gray-800"
                    disabled={processing}
                >
                    Search
                </PrimaryButton>
            </form>
        </>
    );
}

export default AdminSearch;
