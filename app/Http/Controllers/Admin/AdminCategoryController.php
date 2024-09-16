<?php

namespace App\Http\Controllers\Admin;


use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;

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
            $mainImagePath = $request->file('image')->storeAs('category_images', $mainImageFileName, 'public');
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
     */
    public function update(Request $request, Category $category)
    {
        // Validate the request data
        // Debug the incoming request and the category
        dd($request->all(), $category->loadMin); // To check if request fields are coming through

        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => [
                'nullable',
                'file',
                'image',
                'max:12288', // 12 MB
            ],
        ]);


        // Update the category
        $category->name = $validatedData['name'];
        $category->description = $validatedData['description'];

        if ($request->hasFile('image')) {
            // Handle the file upload
            $slug = Str::slug($validatedData['name']);
            $mainImageFileName = $slug . '_' . uniqid() . '_image.' . $request->file('image')->getClientOriginalExtension();
            $mainImagePath = $request->file('image')->storeAs('category_images', $mainImageFileName, 'public');

            // Update the image path
            $category->image = $mainImagePath;
        }

        $category->save(); // Save the updated category

        return Inertia::render('Admin/CategoriesPage', [
            'category' => $category,
            'success' => 'Category updated successfully.',
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $categoryId)
    {
        // First check if the authenticated user is an admin
        if (!Auth::user()->is_admin) {
            return Inertia::render('Auth/Login', [
                'error' => 'Unauthorized access. Admins only.',
            ]);
        }

        // Delete the category
        $category = Category::findOrFail($categoryId);
        // try catch the delete
        try {
            $category->delete();
        } catch (\Exception $e) {
            return Inertia::render(
                'Admin/CategoriesPage',
                [
                    'category' => $category,
                    'error' => 'Category cannot be deleted because it has products.'
                ]
            );
        }

        // return the success message
        return Inertia::render(
            'Admin/CategoriesPage',
            [
                'category' => $category,
                'success' => 'Category deleted successfully.'
            ]
        );
    }
}
