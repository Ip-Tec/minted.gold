<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredAdminController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Auth/Register', ['message' => 'Admin Registion Page']);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . Admin::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $attributes = [
            'name' => $request->name,
            'provider' => 'provider',
            'email' => $request->email,
            'username' => $request->name,
            'password' => Hash::make($request->password),
        ];

        // Set the role to 'admin' only if it's not provided in the request
        if (!$request->has('role')) {
            $attributes['role'] = 'admin';
        }

        $admin = Admin::create($attributes);



        // event(new Registered($admin));


        return Inertia::render('Admin/Auth/Register', [
            'message' => 'Registion successfull',
            'user' => $admin
        ]);
    }
}
