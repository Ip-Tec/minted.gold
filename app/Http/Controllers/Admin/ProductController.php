<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Display a listing of the products
    public function index()
    {
        // Get all products with their category relation, ordered from newest to oldest
        $products = Product::with('category')->orderBy('created_at', 'desc')->get()->map(function ($product) {
            $product->main_image = $product->main_image
                ? asset('storage/' . $product->main_image)
                : null;
            return $product;
        });

        // dd($products);
        return Inertia::render('Admin/Product', ["products" => $products]);
    }

    // Store a newly created product
    public function store(Request $request)
    {
        // Validate the request data
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|nullable|string',
                'category_id' => 'required|exists:categories,id',
                'price' => 'required|numeric',
                'slang_price' => 'required|nullable|numeric',
                'main_image' => [
                    'required',
                    'nullable',
                    File::image()
                        ->max(12 * 12024),
                ], // Main image validation
                'images' => 'nullable|array',              // Validate array of images
                'images.*' => 'image|max:12048',            // Validate each image in the array
                'rating' => 'required|nullable|numeric|between:1,5',
                'features' => 'nullable|array',
            ]);

            // Handle file uploads and other logic here
        } catch (\Illuminate\Validation\ValidationException $e) {
            // dd($e->errors());
            return back()->withErrors($e->errors());
        }
        // dd($validatedData);
        // Generate slug from the product name
        $slug = Str::slug($validatedData['name']);

        // Process the main image upload if necessary
        $mainImagePath = null;
        if ($request->hasFile('main_image')) {
            $mainImageFileName = $slug . '_' . uniqid() . '_main_image.' . $request->file('main_image')->getClientOriginalExtension();
            $mainImagePath = $request->file('main_image')->storeAs('products', $mainImageFileName, 'public');
        }

        // Process additional images if provided
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $imageFileName = $slug . '_' . uniqid() . '_image_' . $index . '.' . $image->getClientOriginalExtension();
                $imagePaths[] = $image->storeAs('products', $imageFileName, 'public');
            }
        }
        // dd($validatedData, $slug, $mainImagePath, $imagePaths);
        // Create the product with image paths
        $product = Product::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'] ?? '',
            'category_id' => $validatedData['category_id'],
            'price' => $validatedData['price'],
            'slang_price' => $validatedData['slang_price'] ?? null,
            'slug' => $slug,
            'main_image' => $mainImagePath, // Save main image path in DB
            'images' => json_encode($imagePaths), // Save images paths as JSON in DB
            'rating' => $validatedData['rating'] ?? null,
            'features' => json_encode($validatedData['features'] ?? []),
        ]);

        // dd($product);
        return Inertia::render('Admin/Product', [
            'product' => $product,
            'success' => 'Product created successfully!',
        ]);
        // return back()->with(["product" => $product]); // Return success response
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

        dd($product);
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'slang_price' => 'nullable|numeric',
            'main_image' => [
                'required',
                'nullable',
                File::image()
                    ->max(12 * 12024),
            ], // Main image validation
            'images' => 'nullable|array',              // Validate array of images
            'images.*' => 'image|max:12048',
            'rating' => 'nullable|numeric|between:1,5',
            'features' => 'nullable|array',
        ]);

        // Generate slug from the product name
        $slug = Str::slug($validatedData['name']);

        // Handle image upload if a new main image is uploaded
        $mainImagePath = null;
        if ($request->hasFile('main_image')) {
            $mainImageFileName = $slug . '_' . uniqid() . '_main_image.' . $request->file('main_image')->getClientOriginalExtension();
            $mainImagePath = $request->file('main_image')->storeAs('products', $mainImageFileName, 'public');
        }

        // Process additional images if provided
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $imageFileName = $slug . '_' . uniqid() . '_image_' . $index . '.' . $image->getClientOriginalExtension();
                $imagePaths[] = $image->storeAs('products', $imageFileName, 'public');
            }
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
