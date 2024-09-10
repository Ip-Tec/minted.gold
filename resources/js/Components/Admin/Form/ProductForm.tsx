import React, { useState } from "react";
import { Product } from "@/types/types";
import { useForm } from "@inertiajs/react";

interface ProductFormProps {
    initialValues: Product;
    onSubmit: (product: Product) => void;
    onClose: () => void;
    isEditing: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
    initialValues,
    onSubmit,
    onClose,
    isEditing,
}) => {
    const { data, setData, post, get, put, reset, errors } = useForm({
        name: initialValues?.name || "",
        price: initialValues?.price || "",
        rating: initialValues?.rating || "",
        features: initialValues?.features || [],
        description: initialValues?.description || "",
        category_id: initialValues?.category_id || "",
        slang_price: initialValues?.slang_price || "",
        main_image: initialValues?.main_image || null,
        images: initialValues?.images ? initialValues?.images.split(",") : [],
    });
    const [imagePreviews, setImagePreviews] = useState<string[]>(
        initialValues.images ? initialValues.images.split(",") : []
    );
    const [mainImagePreview, setMainImagePreview] = useState<string | null>(
        initialValues.main_image || null
    );

    // Handle file input changes for regular images
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                const updatedImages = [...imagePreviews];
                updatedImages[index] = reader.result as string;
                setImagePreviews(updatedImages);
                setData("images", updatedImages);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // Handle file input change for main image
    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setMainImagePreview(reader.result as string);
                setData("main_image", reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setData(data);

        if (isEditing) {
            // Update product
            put(route("admin.products.update"), {
                data: { id: initialValues.id },
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            // Create product
            post(route("admin.products.store"), {
                preserveScroll: true,
                preserveState: true,
                only: ["product"],
                onSuccess: (page) => {
                    console.log({ page });

                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full h-full pb-6 overflow-y-auto scrollbar-hide"
        >
            {/* Name Input */}
            <div className="mb-3">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={initialValues.name}
                    className="w-full p-2 border rounded text-black"
                    required
                    onChange={(e) => setData("name", e.target.value)}
                />
            </div>

            {/* Price and Slang Price */}
            <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={initialValues.price}
                        className="w-full p-2 border rounded text-black"
                        required
                        onChange={(e) => setData("price", e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-2">
                        Slang Price
                    </label>
                    <input
                        type="number"
                        name="slang_price"
                        defaultValue={initialValues.slang_price}
                        className="w-full p-2 border rounded text-black"
                        required
                        onChange={(e) => setData("slang_price", e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-2">
                        Rating
                    </label>
                    <input
                        type="number"
                        name="rating"
                        defaultValue={initialValues.rating}
                        className="w-full p-2 border rounded text-black"
                        min="0"
                        max="5"
                        required
                        onChange={(e) => setData("rating", e.target.value)}
                    />
                </div>
            </div>

            {/* Main Image Input */}
            <div className="mb-3">
                <label className="block text-sm font-medium mb-2">
                    Main Image
                </label>
                <div className="relative">
                    {mainImagePreview ? (
                        <img
                            src={mainImagePreview}
                            alt="Main Image Preview"
                            className="h-20 w-24 object-cover border rounded mb-2"
                        />
                    ) : (
                        <div className="h-20 w-24 flex items-center justify-center border rounded bg-gray-100 mb-2">
                            <span className="text-gray-400">
                                Main Image Preview
                            </span>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
            </div>

            {/* Additional Images Input */}
            <div className="mb-3">
                <label className="block text-sm font-medium mb-2">Images</label>
                <div className="flex overflow-x-scroll scroll-m-0 scrollbar-hide space-x-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="relative">
                            {imagePreviews[index] ? (
                                <img
                                    src={imagePreviews[index]}
                                    alt={`Preview ${index + 1}`}
                                    className="h-20 w-24 object-cover border rounded"
                                />
                            ) : (
                                <div className="h-24 w-24 flex items-center justify-center border rounded bg-gray-100">
                                    <span className="text-gray-400">
                                        Preview
                                    </span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, index)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Description Input */}
            <div className="mb-3">
                <label className="block text-sm font-medium mb-2">
                    Description
                </label>
                <textarea
                    name="description"
                    defaultValue={initialValues.description}
                    className="w-full p-2 border rounded text-black"
                    required
                    onChange={(e) => setData("description", e.target.value)}
                />
            </div>

            {/* Category Input */}
            <div className="mb-3">
                <label className="block text-sm font-medium mb-2">
                    Category
                </label>
                <input
                    type="text"
                    name="category_id"
                    defaultValue={initialValues.category_id}
                    className="w-full p-2 border rounded text-black"
                    required
                    onChange={(e) => setData("category_id", e.target.value)}
                />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end space-x-4">
                <button
                    type="submit"
                    className="bg-blue-500 px-6 py-2 rounded text-white hover:bg-blue-600"
                >
                    {isEditing ? "Update" : "Add"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 px-6 py-2 rounded text-white hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
