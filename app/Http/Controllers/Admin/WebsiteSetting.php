<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\WebSetting\Featured;
use App\Models\WebSetting\ComponentAds;
use App\Models\WebSetting\ProductDisplay;
class WebsiteSetting extends Controller
{
    public function index()
    {
        $product = Product::paginate(28);
        $featured = Featured::all();
        // $ProductDisplay = ProductDisplay::all();
        $ComponentAdsOne = ComponentAds::all();
        return Inertia::render("Admin/WebsiteSetting", [
            'product' => $product,
            'featured' => $featured,
            'productDisplay' => '$ProductDisplay',
            'ComponentAdsOne' => $ComponentAdsOne,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/WebsiteSetting', [
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

        return redirect()->route("Admin/WebsiteSetting")->with('success', 'Category created successfully');
    }

    // public function edit(Category $category)
    // {
    //     return Inertia::render("Admin/WebsiteSetting", [
    //         'edit' => true,
    //         'category' => $category
    //     ]);
    // }

    public function updateWebsiteSettingFeatured(Request $request, Featured $featured)
    {
        $request->validate([
            'title' => 'required|unique:categories,name,',
            'description' => 'required',
            'description',
            'price',
            'adminName',
            'category',
            'image'=>'required',
            'stock',
            // Add validation for other fields as needed
        ]);

        $featured->update($request->all());

        return redirect()->route("Admin/WebsiteSetting")->with('success', 'Category updated successfully'); // Redirected to index route
    }
    // public function update(Request $request, Category $category)
    // {
    //     $request->validate([
    //         'name' => 'required|unique:categories,name,' . $category->id,
    //         'description' => 'required',
    //         // Add validation for other fields as needed
    //     ]);

    //     $category->update($request->all());

    //     return redirect()->route("Admin/WebsiteSetting")->with('success', 'Category updated successfully'); // Redirected to index route
    // }

    public function destroyFeatured(Featured $featured)
    {
        // dd($category);
        $featured->delete();

        return redirect()->route("Admin/WebsiteSetting")->with('success', 'Category deleted successfully');
    }
    public function destroyProductDisplay(ProductDisplay $productDisplay)
    {
        // dd($category);
        $productDisplay->delete();

        return redirect()->route("Admin/WebsiteSetting")->with('success', 'Category deleted successfully');
    }
    public function destroyComponentAdsOne(ComponentAds $componentAds)
    {
        // dd($category);
        $componentAds->delete();

        return redirect()->route("Admin/WebsiteSetting")->with('success', 'Category deleted successfully');
    }
}
