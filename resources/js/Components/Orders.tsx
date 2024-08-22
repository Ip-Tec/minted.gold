import React, { useState } from "react";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface OrdersProps {
    id: number;
    name: string;
    user_id: number;
    status: string;
    product_name: string;
    created_at: string;
    image_url: string; // Added field for the product image URL
}

export default function Orders({ auth }: PageProps) {
    // Demo data for orders
    const orders: OrdersProps[] = [
        {
            id: 1,
            name: "Order 1",
            user_id: auth.user.id,
            status: "successful",
            product_name: "Product A",
            created_at: "2024-08-01T12:34:56Z",
            image_url: "https://via.placeholder.com/150", // Placeholder image URL
        },
        {
            id: 2,
            name: "Order 2",
            user_id: auth.user.id,
            status: "ongoing",
            product_name: "Product B",
            created_at: "2024-08-02T15:00:00Z",
            image_url: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "Order 3",
            user_id: auth.user.id,
            status: "canceled",
            product_name: "Product C",
            created_at: "2024-08-03T18:22:00Z",
            image_url: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            name: "Order 4",
            user_id: auth.user.id,
            status: "returned",
            product_name: "Product D",
            created_at: "2024-08-04T08:45:00Z",
            image_url: "https://via.placeholder.com/150",
        },
    ];

    // Filter orders based on status
    const successfulOrders = orders.filter(
        (order) => order.status === "successful" || order.status === "ongoing"
    );
    const canceledOrders = orders.filter(
        (order) => order.status === "canceled" || order.status === "returned"
    );

    // State to track active tab
    const [activeTab, setActiveTab] = useState<"successful" | "canceled">(
        "successful"
    );

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Tab Navigation */}
                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab("successful")}
                        className={`py-2 px-4 rounded ${
                            activeTab === "successful"
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        }`}
                    >
                        Successfully/Ongoing Orders
                    </button>
                    <button
                        onClick={() => setActiveTab("canceled")}
                        className={`py-2 px-4 rounded ${
                            activeTab === "canceled"
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        }`}
                    >
                        Canceled/Returned Orders
                    </button>
                </div>

                {/* Successfully/Ongoing Orders */}
                {activeTab === "successful" && (
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-wrap gap-3 w-full">
                                {canceledOrders.length > 0 ? (
                                    canceledOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="mb-4 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center"
                                        >
                                            <img
                                                src={order.image_url}
                                                alt={order.product_name}
                                                className="w-24 h-24 object-cover rounded-lg mr-4"
                                            />
                                            <div>
                                                <p>Order ID: {order.id}</p>
                                                <p>
                                                    Product:{" "}
                                                    {order.product_name}
                                                </p>
                                                <p>Status: {order.status}</p>
                                                <p>
                                                    Date:{" "}
                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>
                                        No successful or ongoing orders found.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Canceled/Returned Orders */}
                {activeTab === "canceled" && (
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-wrap gap-3 w-full">
                                {canceledOrders.length > 0 ? (
                                    canceledOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="mb-4 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center"
                                        >
                                            <img
                                                src={order.image_url}
                                                alt={order.product_name}
                                                className="w-24 h-24 object-cover rounded-lg mr-4"
                                            />
                                            <div>
                                                <p>Order ID: {order.id}</p>
                                                <p>
                                                    Product:{" "}
                                                    {order.product_name}
                                                </p>
                                                <p>Status: {order.status}</p>
                                                <p>
                                                    Date:{" "}
                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No canceled or returned orders found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
