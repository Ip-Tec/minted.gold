import React, { useState } from "react";
import { Review } from "@/types/types";

interface ReviewFormProps {
    initialValues: Review;
    onSubmit: (review: Review) => void;
    onClose: () => void;
    isEditing: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
    initialValues,
    onSubmit,
    onClose,
    isEditing,
}) => {
    const [rating, setRating] = useState<number>(initialValues.rating);
    const [comment, setComment] = useState<string>(initialValues.comment);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const review: Review = {
            ...initialValues,
            rating,
            comment,
        };
        onSubmit(review);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md mt-6"
        >
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    placeholder="Enter rating (1-5)"
                    className="w-full p-2 border rounded text-gray-700"
                    required
                    min="1"
                    max="5"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Comment
                </label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter review comment"
                    className="w-full p-2 border rounded text-gray-700"
                    rows={4}
                    required
                />
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="submit"
                    className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
                >
                    {isEditing ? "Update" : "Add"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;
