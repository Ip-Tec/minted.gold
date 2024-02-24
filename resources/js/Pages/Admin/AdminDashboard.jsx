import AdminAuthenticated from "@/Admin/Layout/AdminAuthenticated";
import ReviewStar from "@/Components/Product/review/ReviewStar";
import { Head } from "@inertiajs/react";
import React from "react";

function AdminDashboard({
    reviews,
    auth,
    totalOrders,
    totalProducts,
    totalUsers,
}) {
    // Error handling for auth
    let isAdminAuthenticated = false;
    if (auth && auth) {
        isAdminAuthenticated = true;
    }

    return (
        <>
            <AdminAuthenticated user={auth}>
                <Head title="Dashboard" />
                <div>Dashboard</div>
                {isAdminAuthenticated ? (
                    <div>
                        <div className="flex justify-between items-start px-2 w-full">
                            {/* Handling potential errors with totalOrders, totalProducts, and totalUsers */}
                            <div className="py-4 px-10 shadow-lg bg-green-200 rounded-lg">
                                <p>Total Product</p>
                                <p>{totalProducts || "N/A"}</p>
                            </div>
                            <div className="py-4 px-10 shadow-lg bg-yellow-100 rounded-lg">
                                <p>Total Users</p>
                                <p>{totalUsers || "N/A"}</p>
                            </div>
                            <div className="py-4 px-10 shadow-lg bg-rose-200 rounded-lg">
                                <p>Total Orders</p>
                                <p>{totalOrders || "N/A"}</p>
                            </div>
                        </div>
                        {/* Displaying reviews content */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 p-4">
                                Recently Added Reviews
                            </h3>
                            <div>
                                {reviews.data.map((review) => (
                                    <div
                                        key={review.id}
                                        className="bg-white p-4 rounded-lg shadow-md mb-4 max-w-md"
                                    >
                                        <div className="flex items-center mb-2">
                                            <img
                                                src={review.product.image[0]}
                                                alt={review.product.title}
                                                className="w-20 h-20 object-cover rounded-full mr-4"
                                            />
                                            <p className="text-lg font-bold">
                                                {review.product.title}
                                            </p>
                                        </div>
                                        <p className="text-gray-600">
                                            Rating:{" "}
                                            <ReviewStar
                                                key={review.id}
                                                rating={review.rating}
                                            />
                                        </p>
                                        <p className="text-gray-600">
                                            {review.comment}
                                        </p>
                                        {/* Add other details as needed */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Error: User authentication failed</p>
                )}
            </AdminAuthenticated>
        </>
    );
}

export default AdminDashboard;
