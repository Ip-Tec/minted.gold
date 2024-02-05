// AddCategoryForm.jsx

import React, { useState, useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import FlashMessage from "@/Components/FlashMessage";

const AddCategoryForm = ({ auth, categories, state }) => {
    const { data, setData, put, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
    });
    const [categoriesData, setCategoriesData] = useState(categories);

    const [imagePreviews, setImagePreviews] = useState([]);
    const [flashMessage, setFlashMessage] = useState(null);

    const handleSuccess = (message) => {
        setFlashMessage({ message, type: "success" });
    };

    const handleError = (message) => {
        setFlashMessage({ message, type: "error" });
    };

    const handleCloseFlashMessage = () => {
        setFlashMessage(null);
    };
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.title);
        formData.append("description", data.description);

        const routeName = state
            ? "admin.categories.update"
            : "admin.categories.create";
        const routeParams = state ? { id: state.id } : {};
        post(route(routeName, routeParams), {
            data: formData,
            onSuccess: (d) => {
                // Handle success, e.g., redirect or show a success message
                state
                    ? handleSuccess("Category Update successfully.")
                    : handleSuccess("Category created successfully.");
            },
            onError: (error) => {
                console.log(error);
                state
                    ? handleError("Error Updateing Category.")
                    : handleError("Error creating Category.");
            },
        });
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="w-full h-[88%] no-scrollbar overflow-y-auto mx-auto"
            >
                {/* Name */}
                <div className="mb-4">
                    <InputLabel value={"Category Name"} className="text-xl" />
                    <TextInput
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    <InputError
                        message={errors.name}
                        className="text-red-500 mt-2"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <InputLabel value={"Description"} className="text-xl" />
                    <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    ></textarea>
                    <InputError
                        message={errors.description}
                        className="text-red-500 mt-2"
                    />
                </div>

                {/* Submit Button */}
                <PrimaryButton
                    type="submit"
                    disabled={processing}
                    className="w-full p-10 h-10 text-center"
                >
                    {processing ? "Creating..." : "Create Category"}
                </PrimaryButton>
            </form>
            {flashMessage && (
                <FlashMessage
                    message={flashMessage.message}
                    type={flashMessage.type}
                    onClose={handleCloseFlashMessage}
                />
            )}
        </>
    );
};

export default AddCategoryForm;
