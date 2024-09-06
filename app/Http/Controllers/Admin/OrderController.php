<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use Inertia\Inertia;


class OrderController extends Controller
{
    public function index()
    {
        // Fetch all orders with the related user and product data
        $orders = Order::with('user', 'product')->get();

        // Return the view with the orders data
        return Inertia::render('Admin/Order', [
            'orders' => $orders,
        ]);
    }
}
