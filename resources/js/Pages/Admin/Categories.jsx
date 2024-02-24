import { Link, Head, usePage, router, useForm } from "@inertiajs/react";
import AdminAuthenticated from "@/Admin/Layout/AdminAuthenticated";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import AdminSearch from "@/Admin/AdminComponents/AdminSearch";
import Pagination from "@/Components/Navegation/Pagination";
import EditModal from "@/Admin/AdminComponents/EditModal";
import AddCategoryForm from "@/Admin/AdminComponents/AddCategoryForm";
import FlashMessage from "@/Components/FlashMessage";

function Categories({ canLogin, categories, phpVersion }) {
    const { auth } = usePage().props;
    // auth(auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteCategories, setDeleteCategories] = useState(null);
    const [deleteCategoriesId, setDeleteCategoriesId] = useState(null);
    const [deleteCategoriesImg, setDeleteCategoriesImg] = useState(null);
    const [isAddCategoriesVisible, setIsAddCategoriesVisible] = useState(false);

    const { data, setData, post, errors } = useForm({
        name: "",
        description: "",
    });
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
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingCategories, setEditingCategories] = useState(null);
    // console.log(categories);
    const closeEditModal = () => {
        setIsEditModalVisible(false);
        setEditingCategories(null);
    };
    const closeAddCategoriesEditModal = () => {
        setIsAddCategoriesVisible(false);
        setEditingCategories(null);
    };
    const handleDeleteClick = (categories) => {
        setDeleteCategories(categories);
        setDeleteCategoriesId(categories.id);
        setDeleteCategoriesImg(categories.name);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await delete router.delete(
                route("admin.categories.destroy", { id: deleteCategories.id }),
                {
                    onStart: (d) => {
                        console.log(d);
                    },
                    onProgress: (d) => {
                        console.log(d);
                    },
                    onSuccess: (d) => {
                        handleSuccess("Category Delete successfully.");
                    },
                    onError: (d) => {
                        handleError("Error Deleteing Category.");
                    },
                    onFinish: (d) => {
                        console.log(d);
                    },
                }
            );

            setDeleteCategoriesId(null); // Close the modal
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const isAdminOwner = (product) => {
        // Replace 'your-admin-email@example.com' with the actual email of the logged-in admin
        return (
            auth.email === "your-admin-email@example.com" &&
            auth.id === product.adminId
        );
    };

    const truncateString = (str, maxLen) => {
        if (str.length <= maxLen) return str;
        return str.substr(0, maxLen) + "...";
    };

    const filteredProducts = categories.data
        ? categories.data.filter((category) =>
              category.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    const handleAddProductClick = () => {
        setIsAddCategoriesVisible(!isAddCategoriesVisible);
    };

    return (
        <>
            <AdminAuthenticated user={auth}>
                <Head title="Category" />
                <div className="px-8 py-4 w-full">
                    <div className="flex flex-col justify-between items-end">
                        <button
                            type="button"
                            onClick={handleAddProductClick}
                            className="p-3 text-center bg-blue-400 rounded w-48 hover:border-blue-400 hover:text-blue-600 hover:bg-transparent border justify-end items-start "
                        >
                            Add Categories
                        </button>

                        <AdminSearch setSearchTerm={setSearchTerm} />
                    </div>
                    <h1 className="text-2xl font-semibold mb-4">
                        Categories List
                    </h1>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    N/S
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
                                    description
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    created at
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    updated at
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
                            {filteredProducts.map((category) => (
                                <tr key={category.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            <span title={category.name}>
                                                {category.id}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            <span title={category.name}>
                                                {truncateString(
                                                    category.name,
                                                    15
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            <span title={category.description}>
                                                {truncateString(
                                                    category.description,
                                                    20
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            <span title={category.created_at}>
                                                {category.created_at}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            <span title={category.updated_at}>
                                                {category.updated_at}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {/* {isAdminOwner(product) && ( */}
                                        <>
                                            <button
                                                className="text-blue-500 hover:underline"
                                                onClick={() =>
                                                    setIsEditModalVisible(
                                                        category
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(category)
                                                }
                                                className="ml-2 text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </>
                                        {/* )} */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <Pagination products={categories} /> */}

                {/* Delete Confirmation Modal */}
                <Transition
                    appear
                    show={deleteCategoriesId !== null}
                    as={Fragment}
                >
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
                        onClose={() => setDeleteCategoriesId(null)}
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
                                    <Dialog.Description className="text-white mt-2 bg-slate-700 p-3 flex flex-col justify-center items-center">
                                        <h3 className="text-lg">
                                            {deleteCategoriesImg}
                                        </h3>
                                        <p>
                                            Are you sure you want to delete this
                                            Category?
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
                                                setDeleteCategoriesId(null)
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
                    <AddCategoryForm categories={categories} auth={auth} />
                }
            />
            <EditModal
                isOpen={isAddCategoriesVisible}
                onClose={closeAddCategoriesEditModal}
                title="Add Product"
                content={
                    <AddCategoryForm categories={categories} auth={auth} />
                }
            />
            {flashMessage && (
                <FlashMessage
                    message={flashMessage.message}
                    type={flashMessage.type}
                    onClose={handleCloseFlashMessage}
                />
            )}
        </>
    );
}

export default Categories;
