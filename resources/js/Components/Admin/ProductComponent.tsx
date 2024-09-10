import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faSearch,
    faEdit,
    faTrash,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/types/types";
import ProductForm from "@/Components/Admin/Form/ProductForm";
import { Link, useForm, usePage } from "@inertiajs/react";
import Modal from "@/Components/User/Modal";

interface ProductsProp {
    product: Product[];
}

const ProductComponent: React.FC<ProductsProp> = ({ product }) => {
    const { post, get, put, delete: destory, data, setData } = useForm();
    const [products, setProducts] = useState(product);

    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [productToDelete, setProductToDelete] = useState<Product | null>(
        null
    );

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = (newProduct: Product) => {
        setProducts([...products, newProduct]);
        setIsSidebarOpen(false);
    };

    const handleEditProduct = (updatedProduct: Product) => {
        setProducts(
            products.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
        setIsEditModalOpen(false);
    };

    const handleDeleteProduct = (id: number) => {
        setProducts(products.filter((product) => product.id !== id));
        setIsDeleteModalOpen(false);
    };

    const openEditModal = (product: Product) => {
        setProductToEdit(product);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (product: Product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const closeSidebar = () => setIsSidebarOpen(false);
    const closeEditModal = () => {
        setProductToEdit(null);
        setIsEditModalOpen(false);
    };
    const closeDeleteModal = () => {
        setProductToDelete(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="p-4 relative">
            <h2 className="text-2xl font-bold mb-4">Products</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-10 border rounded text-gray-700"
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-3 text-gray-500"
                    />
                </div>
            </div>

            {/* Product List */}
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2">Name</th>
                        <th className="border-b p-2">Category</th>
                        <th className="border-b p-2">Price</th>
                        <th className="border-b p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td className="border-b p-2">{product.name}</td>
                            <td className="border-b p-2">
                                {product.category_id}
                            </td>
                            <td className="border-b p-2">${product.price}</td>
                            <td className="border-b p-2 flex space-x-2">
                                <button
                                    onClick={() => openEditModal(product)}
                                    className="text-blue-500 hover:underline"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    onClick={() => openDeleteModal(product)}
                                    className="text-red-500 hover:underline"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Add Product Sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 z-10 flex justify-end"
                    onClick={closeSidebar}
                >
                    <div
                        className="bg-gray-800 w-[45%] p-6 text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold mb-4">Add Product</h3>
                        <ProductForm
                            initialValues={{
                                id: products.length + 1,
                                name: "",
                                price: 0,
                                rating: 0,
                                main_image: "",
                                description: "",
                                slang_price: 0,
                                category_id: "",
                                images: "",
                                slug: "",
                            }}
                            onSubmit={handleAddProduct}
                            onClose={closeSidebar}
                            isEditing={false}
                        />
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {isEditModalOpen && productToEdit && (
                <Modal
                    show={isEditModalOpen}
                    maxWidth="lg"
                    closeable={isEditModalOpen}
                    onClose={closeEditModal}
                >
                    <div
                        className="bg-gray-800 mt-8 my-4 p-6 text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold mb-4">Edit Product</h3>
                        <ProductForm
                            initialValues={productToEdit}
                            onSubmit={handleEditProduct}
                            onClose={closeEditModal}
                            isEditing={true}
                        />
                    </div>
                </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && productToDelete && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 z-10 flex justify-center items-center"
                    onClick={closeDeleteModal}
                >
                    <div
                        className="bg-gray-800 w-1/3 p-6 text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold mb-4">
                            Confirm Deletion
                        </h3>
                        <p className="mb-4">
                            Are you sure you want to delete{" "}
                            {productToDelete.name}?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() =>
                                    handleDeleteProduct(productToDelete.id)
                                }
                                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <button
                                onClick={closeDeleteModal}
                                className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Product Button */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="fixed bottom-4 right-4 bg-blue-500 py-4 px-5 rounded-full text-white shadow-lg hover:bg-blue-600"
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
};
export default ProductComponent;
