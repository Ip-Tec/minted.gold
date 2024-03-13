// Products.jsx

import React, { useState } from "react";
import AdminAuthenticated from "@/Admin/Layout/AdminAuthenticated";
import { Head, router, useForm } from "@inertiajs/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import AdminSearch from "@/Admin/AdminComponents/AdminSearch";
import Pagination from "@/Components/Navegation/Pagination";
import Cart from "@/Components/Product/Cart";
import AddProductForm from "@/Admin/AdminComponents/AddProductForm";
import CloseIcon from "@/Components/icons/CloseIcon";
import EditModal from "@/Admin/AdminComponents/EditModal";

function Products({ products, auth, categories }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [deleteProductImg, setDeleteProductImg] = useState("../logo.jpg");
    const [isAddProductVisible, setIsAddProductVisible] = useState(false);
    const {
        data: formData, // Rename 'data' to 'formData' to avoid conflicts
        setData,
        delete: destroy,
        processing,
        errors,
        progress,
        reset,
    } = useForm();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsEditModalVisible(true);
    };

    const closeEditModal = () => {
        setIsEditModalVisible(false);
        setEditingProduct(null);
    };
    const closeAddProductEditModal = () => {
        setIsAddProductVisible(false);
        setEditingProduct(null);
    };
    console.log(products);

    const handleDeleteClick = (productId, productImg) => {
        setDeleteProductId(productId);
        setDeleteProductImg(productImg);
    };

    const handleDeleteConfirm = () => {
        // Make your delete API call here
        router.delete(route("admin.product.destroy", { id: deleteProductId }), {
            onSuccess: (data) => {
                // Handle success if needed
                console.log({ data });
                console.log({
                    processing,
                    errors,
                    progress,
                });
            },
            onError: (errors) => {
                // Handle errors if needed
                console.log("{ errors }");
                console.log({ errors });
                console.log({
                    processing,
                    errors,
                    progress,
                });
            },
        });
        console.log(`Deleting product with ID: ${deleteProductId}`);
        setDeleteProductId(null); // Close the modal
    };

    const isAdminOwner = (product) => {
        // Replace 'your-admin-email@example.com' with the actual email of the logged-in admin
        return auth.email === product.adminName;
    };

    const truncateString = (str, maxLen) => {
        if (str.length <= maxLen) return str;
        return str.substr(0, maxLen) + "...";
    };

    const filteredProducts = products.data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProductClick = () => {
        setIsAddProductVisible(!isAddProductVisible);
    };

    // console.log({ products });
    return (
        <>
            <AdminAuthenticated user={auth}>
                <Head title="Product" />
                <div className="px-8 py-4 w-full">
                    <div className="flex flex-col justify-between items-end">
                        <button
                            type="button"
                            onClick={handleAddProductClick}
                            className="p-3 text-center bg-blue-400 rounded w-48 hover:border-blue-400 hover:text-blue-600 hover:bg-transparent border justify-end items-start "
                        >
                            Add Product
                        </button>
                        <AdminSearch setSearchTerm={setSearchTerm} />
                    </div>
                    <h1 className="text-2xl font-semibold mb-4">
                        Product List
                    </h1>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    S/N
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Image
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Price
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Stock
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Admin Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="p-1 whitespace-nowrap">
                                        <span>{product.id}</span>
                                    </td>
                                    <td className="p-2 whitespace-nowrap rounded-full">
                                        <img
                                            src={product.image[0]} // Update with your image field
                                            alt={product.title}
                                            className="w-16 h-16 object-cover rounded-full"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            <span title={product.title}>
                                                {truncateString(
                                                    product.title,
                                                    20
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            ${product.price}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {product.stock}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {product.adminName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {isAdminOwner(product) && (
                                            <>
                                                <button
                                                    className="text-blue-500 hover:underline"
                                                    onClick={() =>
                                                        handleEditClick(product)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            product.id,
                                                            product.image[0]
                                                        )
                                                    }
                                                    className="ml-2 text-red-500 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination products={products} />

                {/* Delete Confirmation Modal */}
                <Transition
                    appear
                    show={deleteProductId !== null}
                    as={Fragment}
                >
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
                        onClose={() => setDeleteProductId(null)}
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 z-10" />
                        <div className="min-h-screen z-20  px-4 text-center flex items-center justify-center h-40 p-8 ml-32 flex-col">
                            <div className="bg-slate-700 rounded-lg">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Title className="text-lg font-medium text-white text-left border-b mt-4 bg-slate-700 p-3">
                                        Confirm Deletion
                                    </Dialog.Title>
                                </Transition.Child>

                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Description className="text-white mt-2 bg-slate-700 p-3 flex flex-wrap justify-center items-center">
                                        <img
                                            src={deleteProductImg}
                                            className="w-40 rounded-full p-3"
                                        />
                                        <p>
                                            Are you sure you want to delete this
                                            product?
                                        </p>
                                    </Dialog.Description>
                                </Transition.Child>

                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <div className="mt-4 p-4">
                                        <button
                                            onClick={handleDeleteConfirm}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() =>
                                                setDeleteProductId(null)
                                            }
                                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </AdminAuthenticated>
            <EditModal
                isOpen={isEditModalVisible}
                onClose={closeEditModal}
                title="Edit Product"
                content={
                    <AddProductForm
                        categories={categories}
                        product={editingProduct}
                        auth={auth}
                    />
                }
            />
            <EditModal
                isOpen={isAddProductVisible}
                onClose={closeAddProductEditModal}
                title="Add Product"
                content={<AddProductForm categories={categories} auth={auth} />}
            />
        </>
    );
}

export default Products;
