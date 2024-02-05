<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Admin\Category;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function indexNoPage()
    {
        $categories = Category::all();
        if (request()->wantsJson()) {
            // Return a plain JSON response
            return response()->json(['categories' => $categories]);
        }
        // admin.product
        return Inertia::render('Admin/Products')
            ->withViewData(['categories' => $categories]);
    }

    public function index()
    {
        $categories = Category::paginate(28);
        return Inertia::render('Admin/Categories', ['categories' => $categories]);
    }

    public function create()
    {
        return Inertia::render('Admin/Categories/Create', [
            'Create' => true
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories',
            'description' => 'required',
            // Add validation for other fields as needed
        ]);

        Category::create($request->all());

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories', [
            'edit' => true,
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|unique:categories,name,' . $category->id,
            'description' => 'required',
            // Add validation for other fields as needed
        ]);

        $category->update($request->all());

        return redirect()->route('Admin/Categories')->with('success', 'Category updated successfully'); // Redirected to index route
    }

    public function destroy($id)
    {
        // dd($category);
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully');
    }
}
