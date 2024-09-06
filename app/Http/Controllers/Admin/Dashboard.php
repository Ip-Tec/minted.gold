<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Review;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class Dashboard extends Controller
{
    public function index()
    {
        // Query the database to get the required data
        $totalUsers = User::count();
        $totalProducts = Product::count();
        $totalOrders = Order::count();

        // Example of products sold data by month (you can adjust as needed)
        $productData = Product::selectRaw("COUNT(id) as total, MONTH(created_at) as month")
            ->groupBy('month')
            ->pluck('total', 'month');

        // Example of orders data by month
        $orderData = Order::selectRaw("COUNT(id) as total, MONTH(created_at) as month")
            ->groupBy('month')
            ->pluck('total', 'month');

        // Example review stats (positive, negative, neutral)
        $reviewData = [
            'positive' => Review::where('rating', '>=', 4)->count(),
            'negative' => Review::where('rating', '<=', 2)->count(),
            'neutral' => Review::where('rating', '=', 3)->count(),
        ];

        // Send data to the frontend using Inertia
        return Inertia::render('Admin/DashboardPage', [
            'totalUsers' => $totalUsers,
            'totalProducts' => $totalProducts,
            'totalOrders' => $totalOrders,
            'productData' => $productData,
            'orderData' => $orderData,
            'reviewData' => $reviewData,
            'canLogin' => Route::has('admin.login'),
            'canRegister' => Route::has('admin.register'),
        ]);
    }
}
