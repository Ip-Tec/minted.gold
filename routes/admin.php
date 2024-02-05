<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Auth\AdminPasswordController;
use App\Http\Controllers\Admin\Auth\RegisteredAdminController;
use App\Http\Controllers\Admin\Auth\AdminVerifyEmailController;
use App\Http\Controllers\Admin\Auth\AdminNewPasswordController;
use App\Http\Controllers\Admin\Auth\AdminPasswordResetLinkController;
use App\Http\Controllers\Admin\Auth\AdminConfirmablePasswordController;
use App\Http\Controllers\Admin\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\Admin\Auth\AdminEmailVerificationPromptController;
use App\Http\Controllers\Admin\Auth\AdminEmailVerificationNotificationController;


Route::prefix('admin')->group(function () {

    Route::middleware('guest')->group(function () {
        Route::get('register', [RegisteredAdminController::class, 'create'])
            ->name('admin.register');

        Route::post('register', [RegisteredAdminController::class, 'store']);

        Route::get('login', [AdminAuthenticatedSessionController::class, 'create'])
            ->name('admin.login');

        Route::post('/login', [AdminAuthenticatedSessionController::class, 'store']);

        Route::get('/forgot-password', [AdminPasswordResetLinkController::class, 'create'])
            ->name('admin.password.request');

        Route::post('/forgot-password', [AdminPasswordResetLinkController::class, 'store'])
            ->name('admin.password.email');

        Route::get('/reset-password/{token}', [AdminNewPasswordController::class, 'create'])
            ->name('admin.password.reset');

        Route::post('/reset-password', [AdminNewPasswordController::class, 'store'])
            ->name('admin.password.store');
    });


    Route::middleware('admin')->group(function () {
        Route::get('/verify-email', AdminEmailVerificationPromptController::class)
            ->name('admin.verification.notice');

        Route::get('/verify-email/{id}/{hash}', AdminVerifyEmailController::class)
            ->middleware(['signed', 'throttle:6,1'])
            ->name('admin.verification.verify');

        Route::post('/email/verification-notification', [AdminEmailVerificationNotificationController::class, 'store'])
            ->middleware('throttle:6,1')
            ->name('admin.verification.send');

        Route::get('/confirm-password', [AdminConfirmablePasswordController::class, 'show'])
            ->name('admin.password.confirm');

        Route::post('/confirm-password', [AdminConfirmablePasswordController::class, 'store']);

        Route::put('/password', [AdminPasswordController::class, 'update'])->name('admin.password.update');

        Route::post(
            '/logout',
            [AdminAuthenticatedSessionController::class, 'destroy']
        )
            ->name('admin.logout');
    });
});
