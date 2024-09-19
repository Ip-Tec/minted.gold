import React, { useState } from "react";
import { Category } from "@/types/types";
import { useForm } from "@inertiajs/react";

interface CategoryFormProps {
    initialValues: Category;
    onSubmit: (category: Category) => void;
    onClose: () => void;
    isEditing: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
    initialValues,
    onSubmit,
    onClose,
    isEditing,
}) => {
    const { data, setData, post, put, reset, errors, processing } = useForm({
        id: initialValues.id,
        name: initialValues.name || "",
        description: initialValues.description || "",
        image: null as File | null,
    });

    const [previewImage, setPreviewImage] = useState<string>(
        initialValues.image || ""
    );
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleImageChange");
        const file = e.target.files?.[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        if (data.image instanceof File) {
            formData.append("image", data.image);
        }

        console.log("Form data being sent:", Object.fromEntries(formData));

        if (isEditing) {
            post(route("admin.categories.update", initialValues.id), {
                preserveScroll: true,
                preserveState: true,
                forceFormData: true,
                only: ["category", "success"],
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onSuccess: (page) => {
                    console.log({ page });
                    onSubmit(page.props.category as Category);
                    reset();
                    onClose();
                },
                onError: (error) => {
                    console.log({ error });
                },
            });
        } else {
            post(route("admin.categories.store"), {
                preserveScroll: true,
                preserveState: true,
                forceFormData: true,
                only: ["category", "success"],
                onSuccess: (page) => {
                    onSubmit(page.props.category as Category);
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="bg-white p-6 rounded shadow-md mt-6"
        >
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Category Name
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Enter category name"
                    className={`w-full p-2 border rounded text-gray-700 ${
                        errors.name ? "border-red-500" : ""
                    }`}
                    required
                    disabled={processing}
                />
                {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Category Description
                </label>
                <textarea
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    placeholder="Enter category description"
                    className={`w-full p-2 border rounded text-gray-700 ${
                        errors.description ? "border-red-500" : ""
                    }`}
                    required
                    disabled={processing}
                />
                {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.description}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Category Image
                </label>
                <div
                    className={`w-full p-4 border-2 border-dashed rounded ${
                        isDragOver
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300"
                    } flex flex-col items-center justify-center cursor-pointer`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() =>
                        document.getElementById("category-image-input")?.click()
                    }
                >
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt="Category Preview"
                            className="w-40 h-40 object-cover rounded"
                        />
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-500">
                                Drag & drop an image here, or click to select
                                one
                            </p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        id="category-image-input"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={processing}
                    />
                </div>
                {errors.image && (
                    <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                )}
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="submit"
                    className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
                    disabled={processing}
                >
                    {isEditing ? "Update" : "Add"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-600"
                    disabled={processing}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;
