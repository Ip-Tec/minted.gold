<?php

// app/Http/Controllers/RoleController.php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();

        return Inertia::render('Role/Index', [
            'roles' => $roles,
        ]);
    }

    public function show($id)
    {
        $role = Role::findOrFail($id);

        return Inertia::render('Role/Show', [
            'role' => $role,
        ]);
    }

    // Add other CRUD methods as needed
}
