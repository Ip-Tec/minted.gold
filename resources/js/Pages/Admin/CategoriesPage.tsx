// src/Pages/Admin/CategoriesPage.tsx

import { Link, Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Category } from "@/types/types";
import CategoryManagement from "@/Components/Admin/Categories/CategoryManagement";
import { useState } from "react";

interface CategoriesPageProps extends PageProps {
    categories: Category[];
}

export default function CategoriesPage({
    auth,
    categories,
}: CategoriesPageProps) {
    const {
        post,
        put,
        delete: destroy,
        data,
        setData,
    } = useForm({
        name: "",
        image: "",
        isDeleted: false,
        createdAt: "",
        updatedAt: "",
    });

    const [_categories, setCategories] = useState(categories)

    const handleAddCategory = (newCategory: Category) => {
        post(route("admin.categories.store"), {
            data: {
                name: newCategory.name,
                image: newCategory.image,
                isDeleted: newCategory.isDeleted,
            },
            only: ["categories"],
            onSuccess: () => {
                // Optionally show a success message or perform other actions
            },
            onError: () => {
                // Handle errors
            },
        });
    };

    const handleUpdateCategory = (updatedCategory: Category) => {
        put(route("admin.categories.update", updatedCategory.id), {
            data: {
                name: updatedCategory.name,
                image: updatedCategory.image,
            },
            only: ["categories"],
            onSuccess: () => {
                // Optionally show a success message or perform other actions
            },
            onError: () => {
                // Handle errors
            },
        });
    };

    const handleDeleteCategory = (categoryId: number) => {
        destroy(route("admin.categories.destroy", categoryId), {
            only: ["categories"],
            onSuccess: () => {
                // Optionally show a success message or perform other actions
            },
            onError: () => {
                // Handle errors
            },
        });
    };

    return (
        <>
            <AdminLayout auth={auth.user}>
                <Head title="Admin Categories Management" />
                <CategoryManagement
                    categories={_categories}
                    onAddCategory={handleAddCategory}
                    onUpdateCategory={handleUpdateCategory}
                    onDeleteCategory={handleDeleteCategory}
                />
            </AdminLayout>
        </>
    );
}