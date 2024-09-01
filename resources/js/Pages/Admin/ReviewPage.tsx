// src/Pages/Admin/reviewsPage.tsx

import { Link, Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Review, Category } from "@/types/types";
import { useState } from "react";
import ReviewManagement from "@/Components/Admin/Review/ReviewManagement";

interface ReviewPageProps extends PageProps {
    reviews: Review[];
    // categories: Category[];
}

export default function ReviewPage({ auth, reviews }: ReviewPageProps) {
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

    const [_reviews, setReviews] = useState(reviews);

    console.log({ reviews });

    const handleAddReview = (newReview: Review) => {
        post(route("admin.reviews.store"), {
            data: {
                name: newReview.comment,
                image: newReview.rating,
                isDeleted: newReview.isDeleted,
            },
            only: ["reviews"],
            onSuccess: () => {
                // Optionally show a success message or perform other actions
            },
            onError: () => {
                // Handle errors
            },
        });
    };

    const handleUpdateReview = (updatedReview: Review) => {
        put(route("admin.reviews.update", updatedReview.id), {
            data: {
                name: updatedReview.comment,
                image: updatedReview.rating,
            },
            only: ["reviews"],
            onSuccess: () => {
                // Optionally show a success message or perform other actions
            },
            onError: () => {
                // Handle errors
            },
        });
    };

    const handleDeleteReview = (reviewId: number) => {
        destroy(route("admin.review.destroy", reviewId), {
            only: ["reviews"],
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
                <Head title="Admin Review Management" />
                <ReviewManagement
                    reviews={_reviews}
                    onAddReview={handleAddReview}
                    onUpdateReview={handleUpdateReview}
                    onDeleteReview={handleDeleteReview}
                />
            </AdminLayout>
        </>
    );
}
