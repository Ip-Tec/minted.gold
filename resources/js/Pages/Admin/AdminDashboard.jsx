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
    return (
        <>
            <AdminAuthenticated user={auth.user}>
                <Head title="Orders" />
                {/* <div>Dashboard</div> */}
                <div>
                    <div className="flex justify-between items-start px-2 w-full">
                        <div className="py-4 px-10 shadow-lg bg-green-200 rounded-lg">
                            <p>Total Product</p>
                            <p>{totalProducts}</p>
                        </div>
                        <div className="py-4 px-10 shadow-lg bg-yellow-100 rounded-lg">
                            <p>Total Users</p>
                            <p>{totalUsers}</p>
                        </div>
                        <div className="py-4 px-10 shadow-lg bg-rose-200 rounded-lg">
                            <p>Total Users</p>
                            <p>{totalOrders}</p>
                        </div>
                    </div>
                    {/* Recently added reviews */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 p-4">
                            Recently Added Reviews
                        </h3>
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
            </AdminAuthenticated>
        </>
    );
}

export default AdminDashboard;
