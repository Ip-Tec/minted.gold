<?php

// app/Http/Controllers/ProductController.php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use App\Models\WebSetting\Featured;
use App\Models\WebSetting\ProductDisplay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function adminIndex()
    {
        // Retrieve total number of orders, products, and users
        $totalOrders = Order::count();
        $totalProducts = Product::count();
        $totalUsers = User::count();

        // Retrieve paginated products
        $reviews = Review::with('product')->paginate(10);

        // Include authenticated user data
        $user = auth()->user();
        // dd($user);
        return Inertia::render('Admin/AdminDashboard', [
            'reviews' => $reviews,
            'auth' => $user,
            'totalOrders' => $totalOrders,
            'totalProducts' => $totalProducts,
            'totalUsers' => $totalUsers,
        ]);
    }


    public function index()
    {
        $products = Product::paginate(10);
        $productsFeatured = Featured::paginate(10);
        $productsDisplay = ProductDisplay::paginate(10);

        // Include authenticated user data
        // dd($products, $productsDisplay, $productsFeatured);
        $user = auth()->user();

        return Inertia::render('Product/Index', [
            'products' => $products,
            'productsDisplay' => $productsDisplay,
            'productsFeatured' => $productsFeatured,
            'auth' => $user,
        ]);
    }

    public function show($show)
    {
        $product = Product::with('reviews')
            ->where('slug', 'like', "%$show%")
            ->orWhere('title', 'like', "%$show%")
            ->first();

        if (!$product) {
            // Handle the case where no product is found
            abort(404); // You can customize this based on your needs
        }

        return Inertia::render('Product/Show', [
            'product' => $product,
        ]);
    }

    public function search(Request $request)
    {
        $searchTerm = $request->input('search');

        $products = Product::where('title', 'like', "%$searchTerm%")
            ->orWhere('description', 'like', "%$searchTerm%")
            ->paginate(10);

        $newProduct = Product::paginate(6);


        return Inertia::render('Product/Search/[search]', [
            'products' => $products,
            'newProducts' => $newProduct,
            'searchTerm' => $searchTerm,
        ]);
    }
}
