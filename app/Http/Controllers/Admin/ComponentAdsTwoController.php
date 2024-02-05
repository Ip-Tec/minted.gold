<?php

// app/Http/Controllers/ComponentAdsTwoController.php

namespace App\Http\Controllers;

use App\Models\ComponentAdsTwo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComponentAdsTwoController extends Controller
{
    public function index()
    {
        $componentAdsTwoItems = ComponentAdsTwo::all();

        return Inertia::render('ComponentAdsTwo/Index', [
            'componentAdsTwoItems' => $componentAdsTwoItems,
        ]);
    }

    public function show($id)
    {
        $componentAdsTwoItem = ComponentAdsTwo::findOrFail($id);

        return Inertia::render('ComponentAdsTwo/Show', [
            'componentAdsTwoItem' => $componentAdsTwoItem,
        ]);
    }

    // Add other CRUD methods as needed
}
