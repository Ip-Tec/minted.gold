<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Review;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Category;

class AdminReviewController extends Controller
{
    //
    public function index()
    {
        $reviews = Review::paginate(50);
        $categories = \App\Models\Category::all();

        return Inertia::render('Admin/ReviewPage', [
            'canLogin' => \Illuminate\Support\Facades\Route::has('admin.login'),
            'canRegister' => \Illuminate\Support\Facades\Route::has('admin.register'),
            'reviews' => $reviews,
            'categories' => $categories,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
        ]);

        $review = Review::create($request->all());
        return response()->json($review, 201);
    }


    public function show($id)
    {
        $review = Review::findOrFail($id);
        return response()->json($review);
    }


    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        $request->validate([
            'rating' => 'sometimes|integer|min:1|max:5',
            'comment' => 'sometimes|string',
        ]);

        $review->update($request->all());
        return response()->json($review);
    }

    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return response()->json(null, 204);
    }
}
