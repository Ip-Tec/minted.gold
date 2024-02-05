<?php

// app/Http/Controllers/OrderController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Inertia\Inertia;



class OrderController extends Controller
{
    public function index()
    {
        // Retrieve orders with related data (buyer and products)
        $orders = Order::with('buyer', 'products')->paginate(10);

        return Inertia::render('Order/Index', [
            'orders' => $orders,
        ]);
    }

    public function show($id)
    {
        // Retrieve a specific order with related data (buyer and products)
        $order = Order::with('buyer', 'products')->findOrFail($id);

        return Inertia::render('Order/Show', [
            'order' => $order,
        ]);
    }

    // Additional methods can be added as needed
}

