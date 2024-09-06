import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
} from "chart.js";
import { DashboardProps } from "@/types/types";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement
);

const Dashboard: React.FC<DashboardProps> = ({
    totalUsers,
    totalProducts,
    totalOrders,
    productData,
    orderData,
    reviewData,
}) => {
    const productChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "Products Sold",
                data: Object.values(productData),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const orderChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "Orders",
                data: Object.values(orderData),
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    const reviewChartData = {
        labels: ["Positive", "Negative", "Neutral"],
        datasets: [
            {
                data: [
                    reviewData.positive,
                    reviewData.negative,
                    reviewData.neutral,
                ],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-800 text-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <p className="text-3xl font-bold">{totalUsers}</p>
                </div>
                <div className="bg-gray-800 text-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Total Products</h3>
                    <p className="text-3xl font-bold">{totalProducts}</p>
                </div>
                <div className="bg-gray-800 text-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p className="text-3xl font-bold">{totalOrders}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 shadow rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                        Products Sold
                    </h3>
                    <Line data={productChartData} />
                </div>
                <div className="bg-white p-4 shadow rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Orders</h3>
                    <Bar data={orderChartData} />
                </div>
                <div className="bg-white p-4 shadow rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                    <Doughnut data={reviewChartData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
