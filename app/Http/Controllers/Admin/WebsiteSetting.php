<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\WebSetting\Featured;
use App\Models\WebSetting\ComponentAds;
use App\Models\WebSetting\ProductDisplay;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

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
            'image' => 'required',
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

    public function adsComponent(Request $request)
    {
        // dd($request);

        $request->validate([
            'id' => 'required',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Initialize image variable
        $images = '';

        // Check if image file is uploaded
        if ($request->hasFile('image')) {
            // Store the image in the 'public' disk under the 'images' directory
            $path = $request->file('image')->store('public/images/ads');
            // Get the public URL of the stored image
            $url = Storage::url($path);
            // Assign the public URL to the $images variable
            $images = $url;
        }

        // Generate slug for the product
        $slug = Str::slug($request->ip() . '-');

        // Prepare product data
        $adsData = [
            'title' => $slug,
            'slug' => $slug,
            'image' => $images,
            'link' => $slug + $slug,
        ];

        // Check if the product with the requested ID exists
        $existingAds = ComponentAds::find($request->id);

        // If the product exists, update it
        if ($existingAds) {
            $existingAds->update($adsData);
        } else { // If the product doesn't exist, create a new one
            ComponentAds::create($adsData);
        }

        $product = Product::paginate(28);
        $featured = Featured::all();
        // $ProductDisplay = ProductDisplay::all();
        $ComponentAdsOne = ComponentAds::all();

        // Redirect with success message
        return Inertia::render("Admin/WebsiteSetting", [
            'product' => $product,
            'featured' => $featured,
            'productDisplay' => '$ProductDisplay',
            'ComponentAdsOne' => $ComponentAdsOne,
        ])->with('success', 'Product updated/created successfully');
    }
}
