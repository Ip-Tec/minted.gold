<?php

// app/Http/Controllers/HomeController.php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Resources\CartResource;

class HomeController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $cart = Cart::where('user_id', $user->id)->get();

        // $cart = $user ? $user->cart : collect(); // Use collect() to avoid null issues
        $categories = Category::all();
        $products = Product::paginate(10);


        // dd($categories);

        return Inertia::render('Home', [
            'CartItems' => CartResource::collection($cart),
            'products' => $products,
            'categories' => $categories,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
