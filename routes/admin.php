<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin-state')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Welcome', [
            'canLogin' => Route::has('admin.login'),
            'canRegister' => Route::has('admin.register'),
        ]);
    });
    Route::get('/orders', function () {
        return Inertia::render('Admin/Order', [
            'canLogin' => Route::has('admin.login'),
            'canRegister' => Route::has('admin.register'),
        ]);
    });
    Route::get('/product', function () {
        return Inertia::render('Admin/Product', [
            'canLogin' => Route::has('admin.login'),
            'canRegister' => Route::has('admin.register'),
        ]);
    });

    //     Route::middleware(['auth', 'admin'])->group(function () {
    //     Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    //     Route::get('/admin/orders', [AdminController::class, 'orders'])->name('admin.orders');
    //     // Add other routes here...
    // });

    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Welcome');
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
