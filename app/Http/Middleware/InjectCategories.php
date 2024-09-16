<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InjectCategories
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        // Fetch the categories data
        $categories = Category::all();

        // Share the categories with all Inertia responses
        Inertia::share('categories', $categories);
        return $next($request);
    }
}
