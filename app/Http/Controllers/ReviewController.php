<?php

// app/Http/Controllers/ReviewController.php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::all();

        return Inertia::render('Review/Index', [
            'reviews' => $reviews,
        ]);
    }

    public function show($id)
    {
        $review = Review::findOrFail($id);

        return Inertia::render('Review/Show', [
            'review' => $review,
        ]);
    }

    // Add other CRUD methods as needed
}
