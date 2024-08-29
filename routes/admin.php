<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin-state')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('admin.dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])
            ->name('admin.profile.edit');

        Route::patch('/profile', [ProfileController::class, 'update'])
            ->name('admin.profile.update');

        Route::delete('/profile', [ProfileController::class, 'destroy'])
            ->name('admin.profile.destroy');
    });

    Route::get('/categories', [CategoryController::class, 'index'])
        ->name('admin.categories.index');

    Route::middleware(['admin'])->group(function () {
        Route::get(
            '/categories/create',
            [CategoryController::class, 'create']
        )->name('admin.categories.create');

        Route::post('/categories', [CategoryController::class, 'store'])
            ->name('admin.categories.store');
    });
    
});
require __DIR__ . '/auth.php';
