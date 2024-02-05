<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Contracts\Auth\MustVerifyEmail;


class AdminVerifiedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // if ($user instanceof MustVerifyEmail && !$user->hasVerifiedEmail()) {
        //     // If the user is not verified, redirect to the admin login route
        //     return $this->redirectToAdminLogin($request);
        // }

        return $next($request);
    }

    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('admin.login');
    }

    // protected function redirectToAdminLogin($request)
    // {
    //     // Get the admin login route name
    //     $adminLoginRoute = Route::has('admin.login') ? 'admin.login' : 'admin/login';

    //     return $request->expectsJson()
    //         ? abort(403, 'Your email address is not verified.')
    //         : Redirect::route($adminLoginRoute)->with('warning', 'You must verify your email address first.');
    // }
}
