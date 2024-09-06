<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // Get the search query from the request
        $searchQuery = $request->input('search');

        // Fetch users with optional search functionality
        $users = User::when($searchQuery, function ($query, $searchQuery) {
            return $query->where('name', 'like', "%{$searchQuery}%")
                         ->orWhere('email', 'like', "%{$searchQuery}%");
        })->get();

        // Send the users data to the frontend via Inertia
        return Inertia::render('Admin/UserPage', [
            'users' => $users,
            'searchQuery' => $searchQuery,
        ]);
    }
}
