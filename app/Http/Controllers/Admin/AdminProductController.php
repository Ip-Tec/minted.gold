<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AdminProductController extends Controller
{
    // Show a list of all products.
    public function index()
    {
        $categories = Category::all();
        $products = Product::paginate(28);

        return Inertia::render('Admin/Products', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    // Show the form to create a new product.
    public function create()
    {
        return Inertia::render('Admin/Product/', [
            'create' => true,
        ]);
    }

    // Store a newly created product in the database.
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'stock' => 'required|integer',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'description' => 'required|string',
            'images' => 'array',  // assuming 'images' is the field name in your form
        ]);

        $images = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Store the image in the 'public' disk under the 'images' directory
                $path = $image->store('images');
                $images[] = $path;
            }
        }

        $productData = $request->all();
        $productData['slug'] = Str::slug($request['title'] . '-' . $request['price']);

        // Assign the array of images to the 'image' field in your data
        $productData['image'] = $images;

        // Create the product with images
        Product::create($productData);

        return redirect()->route('admin.product')->with('success', 'Product created successfully');
    }


    // Display the specified product.
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('Admin/Product/Show', [
            'product' => $product,
        ]);
    }

    // Show the form to edit the specified product.
    public function edit($id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('Admin/Product/Edit', [
            'product' => $product,
        ]);
    }

    // Update the specified product in the database.

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'stock' => 'required|integer',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'description' => 'required|string',
            'image' => 'array',
            'slug' => 'required|string|unique:products,slug,' . $id,

            // Add any other validation rules as needed
        ]);


        $product = Product::findOrFail($id);
        // You can update each field individually if needed
        $product->title = $request->input('title');
        $product->stock = $request->input('stock');
        $product->price = $request->input('price');
        $product->category = $request->input('category');
        $product->description = $request->input('description');
        // Update other fields as needed

        // Delete old images if needed
        if ($request->hasFile('image')) {
            $images = [];

            foreach ($request->file('image') as $image) {
                // Handle image upload and storage logic
                $path = $image->store('image');
                $images[] = $path;
            }

            // Save the image paths to the product
            $product->image = $images;
        }

        $product->save();

        return redirect()->route('Admin/Products')
            ->with('success', 'Product updated successfully');
    }

    // Remove the specified product from the database.

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('admin.product', [])
            ->with('success', 'Product deleted successfully');
    }

    public function search(Request $request)
    {
        $searchTerm = $request->input('search');

        $products = Product::where('title', 'like', "%$searchTerm%")
            ->orWhere('description', 'like', "%$searchTerm%")
            ->orWhere('adminName', 'like', "%$searchTerm%")
            ->paginate(28);

        $newProduct = Product::paginate(6);


        Inertia::render('Admin/Products', [
            'products' => $products,
        ]);
    }
}
