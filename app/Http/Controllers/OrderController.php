<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Mail\OrderConfirmation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', Auth::user()->id)->get();
        return back()->with('orders', $orders);
    }

    public function store(Request $request)
    {
        $order = Order::create([
            'user_id' => Auth::user()->id,
            'status' => Order::STATUS_ONGOING,
            'total_amount' => $request->total_amount,
            'order_date' => now(),
        ]);

        foreach ($request->products as $product) {
            $order->items()->create([
                'product_id' => $product['id'],
                'quantity' => $product['quantity'],
                'price' => $product['price'],
            ]);
        }

        // Fetch related products
        $firstProduct = $order->items->first()->product;
        $relatedProducts = Product::where('category_id', $firstProduct->category_id)
            ->where('id', '!=', $firstProduct->id)
            ->limit(3)
            ->get();

        // Send confirmation email
        Mail::to(Auth::user()->email)->send(new OrderConfirmation($order, $relatedProducts));

        return back()->with(['message' => 'Order successfully placed.', 'order' => $order]);
    }

    public function processPayment(Request $request)
    {
        // Logic to handle payment processing (e.g., Paystack) and order creation

        $order = Order::create([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
            'total_price' => $request->total_price,
            'status' => 'paid',
            // additional fields
        ]);

        // Fetch related products for the email
        $relatedProducts = Product::where('category_id', $order->product->category_id)
            ->where('id', '!=', $order->product_id)
            ->limit(3)
            ->get();

        // Send the order confirmation email
        Mail::to(Auth::user()->email)->send(new OrderConfirmation($order, $relatedProducts));

        // Return a response or redirect to a success page
        return redirect()->route('order.success');
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::where('user_id', Auth::user()->id)->findOrFail($id);
        $order->update([
            'status' => $request->status,
        ]);

        return redirect()->route('orders.show', $order->id);
    }
}
