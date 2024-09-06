import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { OrderProp } from "@/types/types";

interface Props {
    orders: OrderProp[];
}

const Order: React.FC<Props> = ({ orders }) => {
    const [orderList, setOrderList] = useState<OrderProp[]>(orders || []);

    const handleStatusChange = (id: number, status: string) => {
        setOrderList(
            orderList.map((order) =>
                order.id === id ? { ...order, status } : order
            )
        );
    };

    // Check if orderList is available and has elements
    const totalOrders = orderList?.length || 0;
    const successfulOrders =
        orderList?.filter((order) => order.status === "Successfully").length ||
        0;
    const cancelledOrders =
        orderList?.filter((order) => order.status === "Cancelled").length || 0;
    const pendingOrders =
        orderList?.filter((order) => order.status === "Pending").length || 0;

    const orderStatusData = {
        labels: [
            "Total Orders",
            "Successful Orders",
            "Cancelled Orders",
            "Pending Orders",
        ],
        datasets: [
            {
                label: "Order Counts",
                data: [
                    totalOrders,
                    successfulOrders,
                    cancelledOrders,
                    pendingOrders,
                ],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Orders List */}
                <div className="bg- p-4 shadow rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                        Manage Orders
                    </h3>
                    {orderList.length > 0 ? (
                        <ul>
                            {orderList.map((order) => (
                                <li
                                    key={order.id}
                                    className="flex justify-between items-center border-b py-2"
                                >
                                    <div>
                                        <p>{order.user.name}</p>{" "}
                                        {/* Display user name */}
                                        <p>
                                            Product: {order.product.name}
                                        </p>{" "}
                                        {/* Display product name */}
                                        <p className="text-sm text-gray-500">
                                            Status: {order.status}
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() =>
                                                handleStatusChange(
                                                    order.id,
                                                    "Successfully"
                                                )
                                            }
                                        >
                                            Mark as Successful
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() =>
                                                handleStatusChange(
                                                    order.id,
                                                    "Cancelled"
                                                )
                                            }
                                        >
                                            Cancel Order
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No orders available.</p>
                    )}
                </div>

                {/* Order Status Overview Chart */}
                {orderList.length > 0 ? (
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">
                            Order Status Overview
                        </h3>
                        <Bar data={orderStatusData} />
                    </div>
                ) : (
                    <p>No orders available can not display order status data</p>
                )}
            </div>
        </div>
    );
};

export default Order;
