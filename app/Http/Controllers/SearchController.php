<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        // Validate the search query
        $request->validate([
            'query' => 'required|string|min:2',
        ]);

        $query = $request->input('query');

        // Search in the Product model (you can add more models if needed)
        $products = Product::where('name', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->get();

        // Return the results as JSON (or Inertia response, depending on your setup)
        return back()->with(['products' => $products]);
    }
}
