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
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'total_price' => 'required|numeric',
        ]);

        // Create the order
        $order = Order::create([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
            'total_price' => $request->total_price,
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        // Fetch related products
        $relatedProducts = Product::where('category_id', $order->product->category_id)
            ->where('id', '!=', $order->product_id)
            ->limit(3)
            ->get();

        // Send confirmation email
        Mail::to(Auth::user()->email)->send(new OrderConfirmation($order, $relatedProducts));

        return back()->with('message', 'Order successfully placed.');
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
}
