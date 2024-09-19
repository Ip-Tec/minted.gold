<?php

namespace App\Http\Controllers\Admin;


use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;
use App\Http\Controllers\Admin\ProductController;
use Illuminate\Support\Facades\Storage;

class AdminCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Admin/CategoriesPage', [
            'canLogin' => \Illuminate\Support\Facades\Route::has('admin.login'),
            'canRegister' => \Illuminate\Support\Facades\Route::has('admin.register'),
            'categories' => $categories,
        ]);
    }




    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => [
                'nullable', // Make image nullable
                'file',
                'image',
                'max:12288', // 12 MB
            ],
        ]);

        $slug = Str::slug($validatedData['name']);
        $mainImagePath = null;

        // Handle the file upload
        if ($request->hasFile('image')) {
            $mainImageFileName = $slug . '_' . uniqid() . '_main_image.' . $request->file('image')->getClientOriginalExtension();
            $mainImagePath = $request->file('image')->storeAs('category_images', $mainImageFileName, 'category');
        }

        // Create the new category
        $category = Category::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'image' => $mainImagePath,
            'created_by' => Auth::user()->id,
        ]);

        // Return success response
        return Inertia::render('Admin/CategoriesPage', [
            'category' => $category,
            'success' => 'Category created successfully.',
        ]);
    }


    /**
     * Display the specified resource.
     * 
     */
    public function show()
    {
        $categories = Category::all();
        // dd($categories);
        return Inertia::render('Admin/CategoriesPage', ['categories' => $categories]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Category $categoryId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $categoryId)
    {
        // dd($request);
        // dd($categoryId);
        // dd($request->all(), $categoryId);
        // Find the category by ID
        $category = Category::findOrFail($categoryId);

        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'string|max:105',
            'description' => 'nullable|string',
            'image' => [
                'nullable',
                'file',
                'image',
                'max:5120', // 5 MB
            ],
        ]);

        // Update the category
        $category->name = $validatedData['name'];
        $category->description = $validatedData['description'];

        // Handle image upload if a new image is provided
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }

            // Handle the file upload
            $slug = Str::slug($validatedData['name']);
            $mainImageFileName = $slug . '_' . uniqid() . '_image.' . $request->file('image')->getClientOriginalExtension();
            $mainImagePath = $request->file('image')->storeAs('category_images', $mainImageFileName, 'category');

            // Update the image path
            $category->image = $mainImagePath;
        }

        // Save the updated category
        $category->save();

        // Fetch all categories (in case you need to update the list on the frontend)
        $categories = Category::all();

        // Return success response
        return Inertia::render('Admin/CategoriesPage', [
            'categories' => $categories,
            'category' => $category,
            'success' => 'Category updated successfully.',
        ]);
    }


    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Category $categoryId 
     */
    public function destroy($categoryId)
    {
        // First check if the authenticated user is an admin
        if (Auth::user()->is_admin) {
            return Inertia::render('Auth/Login', [
                'error' => 'Unauthorized access. Admins only.',
            ]);
        }

        // Find the category by ID
        $category = Category::findOrFail($categoryId);

        // Check if the category has associated products
        if ($category->products()->count() > 0) {
            // Delete associated products
            $category->products()->delete();
        }

        // Try to delete the category
        try {
            $category->delete();
            $message = 'Category deleted successfully.';
        } catch (\Exception $e) {
            $message = 'An error occurred while trying to delete the category.';
        }

        // Fetch updated categories list
        $categories = Category::all();
        // Return the response
        return Inertia::render('Admin/CategoriesPage', [
            'categories' => $categories,
            'message' => $message
        ]);
    }
}
