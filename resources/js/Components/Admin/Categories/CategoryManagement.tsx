import React, { useState, useEffect } from "react";
import { Category } from "@/types/types";
import CategoryForm from "@/Components/Admin/Form/CategoryForm";
import Modal from "@/Components/User/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faSearch,
    faEdit,
    faTrash,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@inertiajs/react";

interface AdminCategoryManagementProps {
    categories: Category[]; // Array of categories to be managed
    onAddCategory: (newCategory: Category) => void;
    onUpdateCategory: (updatedCategory: Category) => void;
    onDeleteCategory: (categoryId: number) => void;
}

const CategoryManagement: React.FC<AdminCategoryManagementProps> = ({
    categories,
    onAddCategory,
    onUpdateCategory,
    onDeleteCategory,
}) => {
    // Initialize form data with default values
    const {
        post,
        get,
        put,
        delete: destory,
        data,
        setData,
        errors,
    } = useForm({
        id: "",
        name: "",
        image: "",
        description: "",
    });

    const [filteredCategories, setFilteredCategories] =
        useState<Category[]>(categories);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(
        null
    );
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    // New states for delete modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
        null
    );

    useEffect(() => {
        setFilteredCategories(
            categories.filter((category) =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, categories]);

    const handleEdit = (category: Category) => {
        setIsEditing(true);
        setCurrentCategory(category);
        setIsFormVisible(true);
    };

    const handleDelete = (categoryId: number) => {
        const categoryToDelete = categories.find(
            (cat) => cat.id === categoryId
        );
        if (categoryToDelete) {
            setIsDeleteModalOpen(true);
            // Corrected to setCategoryToDelete
            setCategoryToDelete(categoryToDelete);
        }
    };

    const confirmDelete = (id: number) => {
        console.log({ id });
        destory(route("admin.categories.destroy", id), {
            preserveScroll: true,
            preserveState: true,
            only: ["category", "success"],
            onSuccess: (page: any) => {
                console.log({ page });
                setFilteredCategories(
                    filteredCategories.filter((category) => category.id !== id)
                );
                setIsDeleteModalOpen(false); // Close modal after deletion
            },
            onError: (errors) => {
                console.log({ errors });
            },
        });
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setCategoryToDelete(null);
    };

    const handleFormSubmit = (category: Category) => {
        if (isEditing) {
            onUpdateCategory(category);
        } else {
            onAddCategory(category);
        }
        setIsEditing(false);
        setCurrentCategory(null);
        setIsFormVisible(false);
    };

    const handleFormClose = () => {
        setIsEditing(false);
        setCurrentCategory(null);
        setIsFormVisible(false);
    };

    const handleAddNew = () => {
        setIsEditing(false);
        setCurrentCategory(null);
        setIsFormVisible(true);
    };

    return (
        <div className="admin-category-management p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Category Management</h2>
                <form className="flex items-start ">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border rounded w-[20rem] text-black"
                    />
                    <button className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Image</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories && filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <tr key={category.id}>
                                <td className="border p-2">{category.name}</td>
                                <td className="border p-2 w-[10rem] m-auto">
                                    <img
                                        src={category.image || undefined}
                                        alt={category.name}
                                        className="w-auto h-20 object-cover rounded"
                                    />
                                </td>
                                <td className="border p-2">
                                    {category.description}
                                </td>
                                <td className="border p-2 gap-2">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="bg-yellow-500 px-4 py-2 rounded mr-2 text-white hover:bg-yellow-600"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                        className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="border p-2 text-center">
                                No categories found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="my-4">
                <button
                    onClick={handleAddNew}
                    className="fixed bottom-4 right-4 bg-blue-500 py-4 px-5 rounded-full text-white shadow-lg hover:bg-blue-600"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <Modal
                children={
                    isFormVisible && (
                        <CategoryForm
                            initialValues={
                                currentCategory || {
                                    id: 0,
                                    name: "",
                                    image: "",
                                }
                            }
                            onSubmit={handleFormSubmit}
                            onClose={handleFormClose}
                            isEditing={isEditing}
                        />
                    )
                }
                show={isFormVisible}
                onClose={handleFormClose}
            ></Modal>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && categoryToDelete && (
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
                            {categoryToDelete.name}?
                        </p>
                        <div className="font-bold text-base bg-red-500 rounded py-1 px-3 m-2">
                            All product in {categoryToDelete.name} category will
                            be deleted
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() =>
                                    confirmDelete(categoryToDelete.id)
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
        </div>
    );
};

export default CategoryManagement;
