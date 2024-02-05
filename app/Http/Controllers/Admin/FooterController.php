<?php

// app/Http/Controllers/FooterController.php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Footer;
use Illuminate\Http\Request;

class FooterController extends Controller
{
    public function index()
    {
        $footers = Footer::all();

        return Inertia::render('Footer/Index', [
            'footers' => $footers,
        ]);
    }

    public function show($id)
    {
        $footer = Footer::findOrFail($id);

        return Inertia::render('Footer/Show', [
            'footer' => $footer,
        ]);
    }

    // Add other CRUD methods as needed
}
