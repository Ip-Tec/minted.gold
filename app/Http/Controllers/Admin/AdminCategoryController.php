<?php

namespace App\Http\Controllers\Admin;


use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $image_path = $request->file('image') ? $request->file('image')->store('category_images') : null;

        Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $image_path,
            'created_by' => Auth::user()->id,
        ]);

        return back()->with(['success' => 'Category created successfully.']);
    }

    /**
     * Display the specified resource.
     * 
     */
    public function show()
    {
        $categories = Category::all();
        dd($categories);
        return back()->with(['categories' => $categories]);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
