<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\Category;

class AdminReviewController extends Controller
{
    // Define a constant for the page name
    private const PAGENAME = 'Admin/ReviewPage';

    // Method to display the index page with paginated reviews
    public function index()
    {
        // Load reviews with related product
        $reviews = Review::with('product')->paginate(50);
        $categories = \App\Models\Category::all();

        // Map reviews to include product name
        $reviews->through(function ($review) {
            $review->product_id = $review->product->name;
            return $review;
        });

        return Inertia::render(self::PAGENAME, [
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

    /**
     * Update the specified resource in storage.
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Category $categoryId
     * @return \Inertia\Response
     */
    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        $request->validate([
            'rating' => 'sometimes|integer|min:1|max:5',
            'comment' => 'sometimes|string',
        ]);
        try {
            $review->update($request->all());
            $message = 'Review deleted successfully.';
        } catch (\Exception $e) {
            $message = 'An error occurred while trying to update the review.';
        }


        // Return success response
        return Inertia::render(self::PAGENAME, [
            'reviews' => $review,
            'message' => $message
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Review $id
     * @return \Inertia\Response
     */
    public function destroy($id)
    {
        // First check if the authenticated user is an admin
        if (Auth::user()->is_admin) {
            return Inertia::render('Auth/Login', [
                'error' => 'Unauthorized access. Admins only.',
            ]);
        }

        // Find the review by ID
        $review = Review::findOrFail($id);


        // Try to delete the review
        try {
            $review->delete();
            $message = 'Review deleted successfully.';
        } catch (\Exception $e) {
            $message = 'An error occurred while trying to delete the review.';
        }

        // Fetch updated review list
        $review = Review::all();
        // Return the response
        return Inertia::render('Admin/ReviewPage', [
            'review' => $review,
            'message' => $message
        ]);
    }
}
