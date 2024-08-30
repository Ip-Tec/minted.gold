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

const Dashboard = () => {
    // Dummy data for the charts
    const productData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "Products Sold",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const orderData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "Orders",
                data: [28, 48, 40, 19, 86, 27, 90],
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    const reviewData = {
        labels: ["Positive", "Negative", "Neutral"],
        datasets: [
            {
                data: [300, 50, 100],
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

    // Dummy data for the summary
    const totalUsers = 1200;
    const totalProducts = 150;
    const totalOrders = 3000;

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
                    <Line data={productData} />
                </div>
                <div className="bg-white p-4 shadow rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Orders</h3>
                    <Bar data={orderData} />
                </div>
                <div className="bg-white p-4 shadow rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                    <Doughnut data={reviewData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
