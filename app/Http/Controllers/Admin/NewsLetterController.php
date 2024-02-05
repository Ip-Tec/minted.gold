<?php

// app/Http/Controllers/NewsLetterController.php

namespace App\Http\Controllers;

use App\Models\NewsLetter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsLetterController extends Controller
{
    public function index()
    {
        $newsletters = NewsLetter::all();

        return Inertia::render('NewsLetter/Index', [
            'newsletters' => $newsletters,
        ]);
    }

    public function show($id)
    {
        $newsletter = NewsLetter::findOrFail($id);

        return Inertia::render('NewsLetter/Show', [
            'newsletter' => $newsletter,
        ]);
    }

    // Add other CRUD methods as needed
}
