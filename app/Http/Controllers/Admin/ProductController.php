<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    // Display a listing of the products
    public function index()
    {
        // Get all products with their category relation
        $products = Product::with('category')->get();
        return Inertia::render('Admin/Product', ["products" => $products]);
    }

    // Store a newly created product
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'slang_price' => 'nullable|numeric',
            'main_image' => 'nullable|image|max:2048',  // Handling image upload
            'images' => 'nullable|array',
            'images.*' => 'image|max:2048',  // Validate each image
            'rating' => 'nullable|numeric|between:1,5',
            'features' => 'nullable|array',
        ]);

        // Process image uploads if necessary
        if ($request->hasFile('main_image')) {
            $mainImage = $request->file('main_image')->store('products', 'public');
        }

        $product = Product::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'] ?? '',
            'category_id' => $validatedData['category_id'],
            'price' => $validatedData['price'],
            'slang_price' => $validatedData['slang_price'] ?? null,
            'slug' => Str::slug($validatedData['name']),
            'main_image' => $mainImage ?? null,
            'images' => $validatedData['images'] ?? [],
            'rating' => $validatedData['rating'] ?? null,
            'features' => $validatedData['features'] ?? [],
        ]);

        return back()->with(["product" => $product]);
    }

    // Display the specified product
    public function show($id)
    {
        $product = Product::with('category')->findOrFail($id);
        return response()->json($product);
    }

    // Update the specified product
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'slang_price' => 'nullable|numeric',
            'main_image' => 'nullable|image|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'image|max:2048',
            'rating' => 'nullable|numeric|between:1,5',
            'features' => 'nullable|array',
        ]);

        // Handle image upload if a new main image is uploaded
        if ($request->hasFile('main_image')) {
            $mainImage = $request->file('main_image')->store('products', 'public');
            $product->main_image = $mainImage;
        }

        $product->update([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'] ?? '',
            'category_id' => $validatedData['category_id'],
            'price' => $validatedData['price'],
            'slang_price' => $validatedData['slang_price'] ?? null,
            'slug' => Str::slug($validatedData['name']),
            'images' => $validatedData['images'] ?? $product->images,
            'rating' => $validatedData['rating'] ?? $product->rating,
            'features' => $validatedData['features'] ?? $product->features,
        ]);

        return back()->with(["product" => $product]);
    }

    // Remove the specified product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return back()->with(['message' => 'Product deleted successfully.']);
    }
}
