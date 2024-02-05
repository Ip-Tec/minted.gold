<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminEmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user('admin')->hasVerifiedEmail()
                    ? redirect()->intended(RouteServiceProvider::AdminHOME)
                    : Inertia::render('Admin/Auth/VerifyEmail', ['status' => session('status')]);
    }
}
