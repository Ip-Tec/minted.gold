import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Order = () => {
    // Sample orders data
    const [orders, setOrders] = useState([
        { id: 1, customer: "John Doe", status: "Pending" },
        { id: 2, customer: "Jane Smith", status: "Successfully" },
        { id: 3, customer: "Sam Wilson", status: "Cancelled" },
        { id: 4, customer: "Chris Evans", status: "Pending" },
        { id: 5, customer: "Scarlett Johansson", status: "Successfully" },
    ]);

    const handleStatusChange = (id: number, status: string) => {
        setOrders(
            orders.map((order) =>
                order.id === id ? { ...order, status } : order
            )
        );
    };

    const totalOrders = orders.length;
    const successfulOrders = orders.filter(
        (order) => order.status === "Successfully"
    ).length;
    const cancelledOrders = orders.filter(
        (order) => order.status === "Cancelled"
    ).length;
    const pendingOrders = orders.filter(
        (order) => order.status === "Pending"
    ).length;

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
                <div className="bg-white p-4 shadow rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                        Manage Orders
                    </h3>
                    <ul>
                        {orders.map((order) => (
                            <li
                                key={order.id}
                                className="flex justify-between items-center border-b py-2"
                            >
                                <div>
                                    <p>{order.customer}</p>
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
                </div>

                {/* Order Status Overview Chart */}
                <div className="bg-white p-4 shadow rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                        Order Status Overview
                    </h3>
                    <Bar data={orderStatusData} />
                </div>
            </div>
        </div>
    );
};

export default Order;
