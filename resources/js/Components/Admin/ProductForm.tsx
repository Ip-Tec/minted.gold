import React from "react";
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
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const images: string[] = [];
        const main_image = formData.get("images-0");
        for (let i = 0; i < 4; i++) {
            const image = formData.get(`images-${i}`) as string;
            if (image) images.push(image);
        }
        const product: Product = {
            ...initialValues,
            name: formData.get("name") as string,
            price: Number(formData.get("price")),
            rating: Math.min(Number(formData.get("rating")), 5),
            main_image: main_image as string,
            description: formData.get("description") as string,
            slang_price: Number(formData.get("slang_price")),
            category_id: formData.get("category_id") as string,
            images: images.join(","),
        };
        onSubmit(product);
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                    type="number"
                    name="price"
                    defaultValue={initialValues.price}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
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
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Main Image
                </label>
                <input
                    type="text"
                    name="images-0"
                    defaultValue={initialValues.main_image}
                    className="w-full p-2 border rounded"
                />
            </div>
            {/* Add additional image fields */}
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Image {index + 1}
                    </label>
                    <input
                        type="text"
                        name={`images-${index + 1}`}
                        defaultValue={
                            initialValues.images?.split(",")[index] || ""
                        }
                        className="w-full p-2 border rounded"
                    />
                </div>
            ))}
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
                    className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
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
    );};

export default ProductForm;
