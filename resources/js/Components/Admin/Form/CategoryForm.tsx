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
    const [name, setName] = useState<string>(initialValues.name);
    const [image, setImage] = useState<string | Blob>(initialValues.image);
    const [description, setDescription] = useState<string | undefined>(
        initialValues.description
    );
    const [previewImage, setPreviewImage] = useState<string>(
        initialValues.image
    );
    const { data, setData, post, put, reset, errors } = useForm({
        name: name || "",
        image: image || "",
        description: description || "",
    });
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                setImage(file);
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
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                setImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();

        // Add the form fields to FormData
        formData.append("name", name);
        formData.append("description", description || "");
        if (image instanceof Blob) {
            formData.append("image", image);
        }

        if (isEditing) {
            put(
                route("admin.categories.update", {
                    _category: initialValues.id,
                }),
                {
                    data: formData, // Use FormData
                    preserveScroll: true,
                    preserveState: true,
                    forceFormData: true, // Force formData to ensure file uploads work
                    only: ["category", "success"],
                    onSuccess: (page: any) => {
                        onSubmit(page.props.category as Category);
                        onClose();
                        reset();
                    },
                    onError: (formErrors) => {
                        // Handle errors
                        errors.name = formErrors.name;
                        errors.description = formErrors.description;
                        errors.image = formErrors.image;
                        // setNameError(formErrors.name);
                        // setDescriptionError(formErrors.description);
                        // setImageError(formErrors.image);
                    },
                }
            );
        } else {
            post(route("admin.categories.store"), {
                data: formData, // Use FormData for new category
                preserveScroll: true,
                preserveState: true,
                forceFormData: true,
                only: ["category", "success"],
                onSuccess: (page) => {
                    onSubmit(page.props.category as Category);
                    reset();
                    onClose();
                },
                onError: (formErrors) => {
                    // Handle errors
                    errors.name = formErrors.name;
                    errors.description = formErrors.description;
                    errors.image = formErrors.image;
                    // setNameError(formErrors.name);
                    // setDescriptionError(formErrors.description);
                    // setImageError(formErrors.image);
                },
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md mt-6"
        >
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Category Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                    className={`w-full p-2 border rounded text-gray-700 ${
                        errors.name ? "border-red-500" : ""
                    }`}
                    required
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter category description"
                    className={`w-full p-2 border rounded text-gray-700 ${
                        errors.description ? "border-red-500" : ""
                    }`}
                    required
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
                >
                    {isEditing ? "Update" : "Add"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;
