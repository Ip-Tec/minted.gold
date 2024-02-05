<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        // Get the authenticated user's cart
        $cart = Auth::user()->cart;

        return Inertia::render('Carts/Index', [
            'cart' => $cart,
        ]);
    }

    public function store(Request $request)
    {
        // Validate the request data if needed

        // Get the authenticated user's cart
        $cart = Auth::user()->cart;

        // Add the product to the cart
        $product = $request->input('product');
        $cart->addProduct($product);

        return redirect()->back();
    }

    public function update(Request $request, Cart $cart)
    {
        // Validate the request data if needed

        // Update the cart based on the request data
        $cart->update($request->all());

        return redirect()->back();
    }

    public function destroy(Cart $cart)
    {
        // Delete the cart
        $cart->delete();

        return redirect()->back();
    }
}
