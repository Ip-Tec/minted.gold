<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CartResource;

class CartController extends Controller
{
    // Get all items in the cart for the logged-in user
    public function index()
    {
        $user = Auth::user();
        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();
        return back()->with([
            'CartItems' => CartResource::collection($cartItems),
        ]);
    }

    // Add an item to the cart
    public function add(Request $request)
    {
        $request->validate([
            'product_slug' => 'required|string|exists:products,slug',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::where('slug', $request->product_slug)->first();
        $user = Auth::user();

        $cartItem = Cart::updateOrCreate(
            ['user_id' => $user->id, 'product_id' => $product->id],
            ['quantity' => DB::raw('quantity + ' . $request->quantity)]
        );

        return back()->with([
            'CartItems' => CartResource::collection(Cart::where('user_id', $user->id)->get()),
            'message' => 'Item added to cart',
        ]);
    }

    // Update the quantity of an item in the cart
    public function updateQuantity(Request $request, $id)
    {
        // dd($request, $id);
        $request->validate([
            'quantity' => 'required|integer|min:0',
        ]);

        $cart = Cart::where('user_id', Auth::id())->findOrFail($id);

        if ($request->quantity == 0) {
            $cart->delete();
            $message = 'Cart item removed';
        } else {
            $cart->update(['quantity' => $request->quantity]);
            $message = 'Cart updated';
        }

        $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();

        // return Inertia::render('Home', [
        //     'CartItem' => CartResource::collection($cartItems),
        //     'message' => $message,
        // ]);

        // Redirect back to the previous page with the updated cart data
        return back()->with([
            'CartItems' => CartResource::collection($cartItems),
            'message' => $message,
        ]);
    }

    // Remove an item from the cart
    public function remove($id)
    {

        $user = Auth::user();
        // dd($id, $user->id);
        $cart = Cart::where('user_id', $user->id)->findOrFail($id);


        $cart->delete();

        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();
        return back()->with([
            'CartItems' => CartResource::collection($cartItems),
            'message' => 'Item removed from cart',
        ]);
    }

    // Clear the cart
    public function clear()
    {
        $user = Auth::user();
        Cart::where('user_id', $user->id)->delete();

        return back()->with([
            'CartItems' => [],
            'message' => 'Cart cleared',
        ]);
    }

    public function checkout()
    {
        // Fetch cart items if the user is authenticated, otherwise return an empty collection
        $cartItems = Auth::check()
            ? CartResource::collection(Cart::where('user_id', Auth::id())->get())
            : collect([]);

        // Calculate the total price from the $cartItems collection
        $total = $cartItems->sum(function ($item) {
            return $item->product['price'] * $item['quantity'];
        });

        // Format the total price as NGN currency
        $formattedTotalPrice = number_format($total, 2, '.', ',');

        // Fetch wishlist items if the user is authenticated, otherwise return an empty collection
        $wishlist = Auth::check()
            ? Auth::user()->wishlist()->with('product')->get()->pluck('product')
            : collect([]);

        // Render the checkout page with the required data
        return Inertia::render('CheckoutPage', [
            'wishlist' => $wishlist,
            'CartItems' => $cartItems,
            'totalPrice' => $formattedTotalPrice,
        ]);
    }

    // Function to format currency
    protected function currencyFormat($amount)
    {
        return number_format($amount, 2, '.', ',') . ' NGN';
    }
}
