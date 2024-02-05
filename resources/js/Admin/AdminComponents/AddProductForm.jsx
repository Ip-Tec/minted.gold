// AddProductForm.jsx

import React, { useState, useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

const AddProductForm = ({ auth, categories, product }) => {
    const { data, setData, put, post, processing, errors, reset } = useForm({
        title: "",
        stock: "",
        price: "",
        category: "",
        description: "",
        images: [],
        adminName: auth.user.email,
    });
    const [categoriesData, setCategoriesData] = useState(categories);

    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        if (product) {
            setData(product);
            // Set image previews when the product changes
            // setImagePreviews(
            //     product.images.map((image) => URL.createObjectURL(image))
            // );
        }
    }, [product]);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleImageChange = (e) => {
        setData("images", e.target.files);

        // Set image previews when new images are selected
        const previews = Array.from(e.target.files).map((file) =>
            URL.createObjectURL(file)
        );
        setImagePreviews(previews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("stock", data.stock);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("description", data.description);
        for (let i = 0; i < data.images.length; i++) {
            formData.append("images[]", data.images[i]);
        }
        formData.append("adminName", data.adminName);

        const routeName = product
            ? "admin.product.update"
            : "admin.product.create";
        const routeParams = product ? { id: product.id } : {};
        post(route(routeName, routeParams), {
            data: formData,
            onSuccess: () => {
                // Handle success, e.g., redirect or show a success message
                console.log("Product created/update successfully");
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full h-[88%] no-scrollbar overflow-y-auto mx-auto"
        >
            {/* Title */}
            <div className="mb-4">
                <InputLabel value={"Product Name"} className="text-xl" />
                <TextInput
                    type="text"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <InputError
                    message={errors.title}
                    className="text-red-500 mt-2"
                />
            </div>

            <div className="flex justify-between items-center mb-4">
                {/* Stock */}
                <div className="flex-1 mr-4">
                    <InputLabel value={"Stock"} className="text-xl" />
                    <TextInput
                        type="number"
                        id="stock"
                        name="stock"
                        value={data.stock}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    <InputError
                        message={errors.stock}
                        className="text-red-500 mt-2"
                    />
                </div>

                {/* Price */}
                <div className="flex-1">
                    <InputLabel value={"Product Price"} className="text-xl" />
                    <TextInput
                        type="text"
                        id="price"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    <InputError
                        message={errors.price}
                        className="text-red-500 mt-2"
                    />
                </div>
            </div>

            {/* Category */}
            <div className="mb-4">
                <InputLabel value={"Category"} className="text-xl" />
                <select
                    id="category"
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="">Select Category</option>
                    {categoriesData.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {/* <InputError
                    message={errors.category.id}
                    className="text-red-500 mt-2"
                /> */}
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

            {/* Image */}
            <div className="mb-4">
                <InputLabel value="Images" className="text-xl" />
                <TextInput
                    type="file"
                    id="images"
                    name="images"
                    onChange={handleImageChange}
                    className="w-full border p-2 rounded"
                    multiple
                />
                <InputError
                    message={errors.images}
                    className="text-red-500 mt-2"
                />

                {imagePreviews.length > 0 && (
                    <div className="mt-2 flex flex-wrap">
                        {imagePreviews.map((preview, index) => (
                            <img
                                key={index}
                                src={preview}
                                alt={`Product Image ${index + 1}`}
                                width={"2rem"}
                                className="w-24 h-24 object-cover rounded-full mr-2"
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* AdminName */}
            <div className="mb-4">
                <InputLabel value={"Admin Email"} className="text-xl" />
                <p
                    type="text"
                    id="adminName"
                    name="adminName"
                    value={data.adminName}
                    className="border p-2 rounded"
                    readOnly
                >
                    {data.adminName}
                </p>
                <InputError
                    message={errors.adminName}
                    className="text-red-500 mt-2"
                />
            </div>

            {/* Submit Button */}
            <PrimaryButton
                type="submit"
                disabled={processing}
                className="w-full p-10 h-10 text-center"
            >
                {processing ? "Creating..." : "Create Product"}
            </PrimaryButton>
        </form>
    );
};

export default AddProductForm;
