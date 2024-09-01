import React, { useState, useEffect } from "react";
import { Review } from "@/types/types";
import ReviewForm from "@/Components/Admin/Form/ReviewForm";
import Modal from "@/Components/User/Modal";

interface ReviewManagementProps {
    reviews: Review[];
    onAddReview: (newReview: Review) => void;
    onUpdateReview: (updatedReview: Review) => void;
    onDeleteReview: (reviewId: number) => void;
}

const ReviewManagement: React.FC<ReviewManagementProps> = ({
    reviews,
    onAddReview,
    onUpdateReview,
    onDeleteReview,
}) => {
    const [filteredReviews, setFilteredReviews] = useState<Review[]>(reviews);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentReview, setCurrentReview] = useState<Review | null>(null);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    useEffect(() => {
        setFilteredReviews(
            reviews.filter((review) =>
                review?.product?.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, reviews]);

    const handleEdit = (review: Review) => {
        setIsEditing(true);
        setCurrentReview(review);
        setIsFormVisible(true);
    };

    const [deletedReviews, setDeletedReviews] = useState<Review[]>([]);

    const handleDelete = (reviewId: number) => {
        const reviewToDelete = reviews.find((rev) => rev.id === reviewId);
        if (
            reviewToDelete &&
            confirm("Are you sure you want to delete this review?")
        ) {
            onDeleteReview(reviewId);
            setDeletedReviews([...deletedReviews, reviewToDelete]);

            setTimeout(() => {
                setDeletedReviews((prev) =>
                    prev.filter((rev) => rev.id !== reviewId)
                );
            }, 5000);
        }
    };

    const handleUndoDelete = (reviewId: number) => {
        const review = deletedReviews.find((rev) => rev.id === reviewId);
        if (review) {
            setDeletedReviews((prev) =>
                prev.filter((rev) => rev.id !== reviewId)
            );
        }
    };

    const handleFormSubmit = (review: Review) => {
        if (isEditing) {
            onUpdateReview(review);
        } else {
            onAddReview(review);
        }
        setIsEditing(false);
        setCurrentReview(null);
        setIsFormVisible(false);
    };

    const handleFormClose = () => {
        setIsEditing(false);
        setCurrentReview(null);
        setIsFormVisible(false);
    };

    const handleAddNew = () => {
        setIsEditing(false);
        setCurrentReview(null);
        setIsFormVisible(true);
    };

    return (
        <div className="admin-review-management p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Review Management</h2>
                <input
                    type="text"
                    placeholder="Search reviews by product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-1/3 text-black"
                />
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">User</th>
                        <th className="border p-2">Product</th>
                        <th className="border p-2">Rating</th>
                        <th className="border p-2">Comment</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReviews && filteredReviews.length > 0 ? (
                        filteredReviews.map((review) => (
                            <tr
                                key={review.id}
                                className={review.isDeleted ? "opacity-50" : ""}
                            >
                                <td className="border p-2">{review.user_id}</td>
                                <td className="border p-2">
                                    {review.product_id}
                                </td>
                                <td className="border p-2">{review.rating}</td>
                                <td className="border p-2">{review.comment}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleEdit(review)}
                                        className="bg-yellow-500 px-4 py-2 rounded mr-2 text-white hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="border p-2 text-center">
                                No reviews found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="my-4">
                <button
                    onClick={handleAddNew}
                    className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
                >
                    Add New Review
                </button>
            </div>
            <Modal show={isFormVisible} onClose={handleFormClose}>
                {isFormVisible && (
                    <ReviewForm
                        initialValues={
                            currentReview || {
                                id: 0,
                                rating: 0,
                                comment: "",
                                user_id: 0,
                                product_id: 0,
                            }
                        }
                        onSubmit={handleFormSubmit}
                        onClose={handleFormClose}
                        isEditing={isEditing}
                    />
                )}
            </Modal>
        </div>
    );
};
export default ReviewManagement;
