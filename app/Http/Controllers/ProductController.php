<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CartResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Products/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'main_image' => 'required|image',
            'images' => 'nullable|array',
            'images.*' => 'image',
        ]);

        $mainImagePath = $request->file('main_image')->store('product_images');
        $imagePaths = [];
        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('product_images');
            }
        }

        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'slang_price' => $request->price * (1 + mt_rand(1, 30) / 100), // Example random percentage
            'slug' => Str::slug($request->name . '-' . uniqid()),
            'main_image' => $mainImagePath,
            'images' => json_encode($imagePaths),
        ]);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        // Fetch the product based on the slug
        $product = Product::where('slug', $slug)->firstOrFail();

        // Fetch related products based on the same category, excluding the current product
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get();

        // Fetch wishlist items if the user is authenticated, otherwise, return an empty array
        $wishlist = Auth::check()
            ? Auth::user()->wishlist->pluck('product_id')->toArray()
            : [];

        // Fetch cart items if the user is authenticated, otherwise, return an empty array
        $cartItems = Auth::check()
            ? CartResource::collection(Cart::where('user_id', Auth::id())->get())
            : [];

        return Inertia::render('ViewPage', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'wishlist' => $wishlist,
            'CartItems' => $cartItems,
        ]);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'main_image' => 'nullable|image',
            'images' => 'nullable|array',
            'images.*' => 'image',
        ]);

        if ($request->hasFile('main_image')) {
            $mainImagePath = $request->file('main_image')->store('product_images');
            $product->main_image = $mainImagePath;
        }

        $imagePaths = json_decode($product->images, true) ?? [];
        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('product_images');
            }
            $product->images = json_encode($imagePaths);
        }

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'slang_price' => $request->price * (1 + mt_rand(1, 30) / 100),
            'slug' => Str::slug($request->name . '-' . uniqid()),
        ]);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
