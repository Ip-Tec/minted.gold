<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;

class AdminOrder extends Controller
{
    public function index()
    {
        $orders = Order::paginate(28);
        return Inertia::render('Admin/Orders', ['orders' => $orders]);
    }

    public function create()
    {
        return Inertia::render('Admin/Orders/Create', [
            'Create' => true
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:orders',
            'description' => 'required',
            // Add validation for other fields as needed
        ]);

        Order::create($request->all());

        return redirect()->route('Admin/Orders')->with('success', 'Order created successfully');
    }

    public function edit(Order $category)
    {
        return Inertia::render('Admin/Orders', [
            'edit' => true,
            'category' => $category
        ]);
    }

    public function update(Request $request, Order $category)
    {
        $request->validate([
            'name' => 'required|unique:orders,name,' . $category->id,
            'description' => 'required',
            // Add validation for other fields as needed
        ]);

        $category->update($request->all());

        return redirect()->route('Admin/Orders')->with('success', 'Order updated successfully'); // Redirected to index route
    }

    public function destroy(Order $category)
    {
        // dd($category);
        $category->delete();

        return redirect()->route('admin.orders.destroy')->with('success', 'Order deleted successfully'); 
    }
}
