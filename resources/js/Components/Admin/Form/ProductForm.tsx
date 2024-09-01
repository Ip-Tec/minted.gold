import React, { useState } from "react";
import { Product } from "@/types/types";

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
    const [imagePreviews, setImagePreviews] = useState<string[]>(
        initialValues.images ? initialValues.images.split(",") : []
    );

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
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const product: Product = {
            ...initialValues,
            name: formData.get("name") as string,
            price: Number(formData.get("price")),
            rating: Math.min(Number(formData.get("rating")), 5),
            main_image: imagePreviews[0] || "",
            description: formData.get("description") as string,
            slang_price: Number(formData.get("slang_price")),
            category_id: formData.get("category_id") as string,
            images: imagePreviews.join(","),
        };
        onSubmit(product);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full h-full pb-8 overflow-y-auto"
        >
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={initialValues.name}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={initialValues.price}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Slang Price
                    </label>
                    <input
                        type="number"
                        name="slang_price"
                        defaultValue={initialValues.slang_price}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Rating
                    </label>
                    <input
                        type="number"
                        name="rating"
                        defaultValue={initialValues.rating}
                        className="w-full p-2 border rounded"
                        min="0"
                        max="5"
                        required
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Images</label>
                <div className="flex overflow-x-scroll scroll-m-0 scrollbar-hide space-x-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="relative">
                            {imagePreviews[index] ? (
                                <img
                                    src={imagePreviews[index]}
                                    alt={`Preview ${index + 1}`}
                                    className="h-24 w-24 object-cover border rounded"
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

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Description
                </label>
                <textarea
                    name="description"
                    defaultValue={initialValues.description}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Category
                </label>
                <input
                    type="text"
                    name="category_id"
                    defaultValue={initialValues.category_id}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
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
