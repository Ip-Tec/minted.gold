// src/Components/Admin/Categories/CategoryManagement.tsx

import React, { useState, useEffect } from "react";
import { Category } from "@/types/types";
import CategoryForm from "@/Components/Admin/Form/CategoryForm";
import Modal from "@/Components/User/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
    const [filteredCategories, setFilteredCategories] =
        useState<Category[]>(categories);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(
        null
    );
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

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

    const [deletedCategories, setDeletedCategories] = useState<Category[]>([]);

    const handleDelete = (categoryId: number) => {
        const categoryToDelete = categories.find(
            (cat) => cat.id === categoryId
        );
        if (
            categoryToDelete &&
            confirm("Are you sure you want to delete this category?")
        ) {
            onDeleteCategory(categoryId);
            setDeletedCategories([...deletedCategories, categoryToDelete]);

            // Set a timeout to remove the category permanently after, say, 5 seconds
            setTimeout(() => {
                setDeletedCategories((prev) =>
                    prev.filter((cat) => cat.id !== categoryId)
                );
            }, 5000);
        }
    };

    const handleUndoDelete = (categoryId: number) => {
        const category = deletedCategories.find((cat) => cat.id === categoryId);
        if (category) {
            // Implement the logic to restore the category
            // This might involve sending a request to the backend to restore
            setDeletedCategories((prev) =>
                prev.filter((cat) => cat.id !== categoryId)
            );
        }
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
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-1/3 text-black"
                />
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Image</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories && filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <tr
                                key={category.id}
                                className={
                                    category.isDeleted ? "opacity-50" : ""
                                }
                            >
                                <td className="border p-2">{category.name}</td>
                                <td className="border p-2">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                </td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="bg-yellow-500 px-4 py-2 rounded mr-2 text-white hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                        className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                                    >
                                        Delete
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
                {/* <button
                    onClick={handleAddNew}
                    className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
                >
                    Add New Category
                </button> */}
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
        </div>
    );
};

export default CategoryManagement;
