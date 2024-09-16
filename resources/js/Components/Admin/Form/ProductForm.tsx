import React, { useState, useEffect } from "react";
import { Product, Category } from "@/types/types";
import { router, useForm, usePage } from "@inertiajs/react";

interface ProductFormProps {
    initialValues: Product;
    onSubmit: (product: Product) => void;
    onClose: () => void;
    isEditing: boolean;
    Categories?: Category;
}

const ProductForm: React.FC<ProductFormProps> = ({
    initialValues,
    onSubmit,
    onClose,
    isEditing,
    Categories,
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
    const { categories } = usePage<{ categories: Category[] }>().props;
    // console.log({ categories });

    const [imagePreviews, setImagePreviews] = useState<string[]>(() => {
        if (typeof initialValues.images === "string") {
            try {
                // Attempt to parse the string as JSON
                const parsedImages = JSON.parse(initialValues.images);
                return Array.isArray(parsedImages) ? parsedImages : [];
            } catch (error) {
                // If parsing fails, fallback to splitting the string by commas
                return initialValues.images.split(",");
            }
        } else if (Array.isArray(initialValues.images)) {
            return initialValues.images; // If it's already an array, use it directly
        }
        return [];
    });

    const [mainImagePreview, setMainImagePreview] = useState<string | null>(
        initialValues.main_image || null
    );

    // Handle file input changes for regular images
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.target.files && e.target.files[0]) {
            const updatedImages = [...imagePreviews];
            updatedImages[index] = URL.createObjectURL(e.target.files[0]); // Preview image
            setImagePreviews(updatedImages);

            const files = [...data.images]; // Get previous files (not URLs, but actual files)
            files[index] = e.target.files[0]; // Add the new file as the actual file object
            setData("images", files); // Store actual files, not URLs
        }
    };

    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData("main_image", e.target.files[0]); // Store actual file
            const reader = new FileReader();
            reader.onload = () => setMainImagePreview(reader.result as string);
            reader.readAsDataURL(e.target.files[0]); // Preview the file
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEditing) {
            // Update product
            router.post("products/", {
                ...data,
                _method: "put",
                preserveScroll: true,
                preserveState: true,
                forceFormData: true, // Ensure that FormData is used
                only: ["product"],
            }, {
                onSuccess: (page) => {
                    console.log({ page }); // Log the response from the server
                    onSubmit(page.props.product as Product); // Call the onSubmit callback with the updated product
                    reset(); // Reset the form data
                    onClose(); // Call the onClose callback to close the modal
                },
            });
        } else {
            // Create product
            post(route("admin.products.store"), {
                ...data,
                preserveScroll: true,
                preserveState: true,
                forceFormData: true, // Ensure FormData is used
                only: ["product", "success"],
            }, {
                onSuccess: (page) => {
                    console.log({ page });
                    onSubmit(page.props.product as Product);
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
            encType="multipart/form-data"
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
                {errors.name && (
                    <div className="text-red-500 text-sm mt-1">
                        {errors.name}
                    </div>
                )}
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
                    {errors.price && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.price}
                        </div>
                    )}
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
                    {errors.slang_price && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.slang_price}
                        </div>
                    )}
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
                    {errors.rating && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.rating}
                        </div>
                    )}
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
                {errors.main_image && (
                    <div className="text-red-500 text-sm mt-1">
                        {errors.main_image}
                    </div>
                )}
            </div>

            {/* Additional Images Input */}
            <div className="mb-3">
                <label className="block text-sm font-medium mb-2">Images</label>
                <div className="flex overflow-x-scroll scroll-m-0 scrollbar-hide space-x-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="relative">
                            {imagePreviews[index] ? (
                                <img
                                    src={
                                        imagePreviews[index]
                                            ? imagePreviews[index].startsWith(
                                                  "blob:"
                                              )
                                                ? imagePreviews[index] // If it's a blob, use it directly
                                                : `${window.location.origin}/storage/${imagePreviews[index]}` // Otherwise, use the storage URL
                                            : ""
                                    }
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
                {errors.images && (
                    <div className="text-red-500 text-sm mt-1">
                        {errors.images}
                    </div>
                )}
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
                {errors.description && (
                    <div className="text-red-500 text-sm mt-1">
                        {errors.description}
                    </div>
                )}
            </div>

            {/* Category Input */}
            <div className="mb-3">
                <label className="block text-sm font-medium mb-2">
                    Category
                </label>
                <select
                    name="category_id"
                    value={data.category_id}
                    className="w-full p-2 border rounded text-black"
                    required
                    onChange={(e) => setData("category_id", e.target.value)}
                >
                    {categories &&
                        Array.isArray(categories) &&
                        categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                </select>
                {errors.category_id && (
                    <div className="text-red-500 text-sm mt-1">
                        {errors.category_id}
                    </div>
                )}
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
