<?php

use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminReviewController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\Dashboard;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin-state')->group(function () {
    Route::get('/', [Dashboard::class, 'index'])->middleware(['auth', 'verified'])->name('admin.dashboard');

    Route::get('/orders', [OrderController::class, 'index'])->name('admin.orders');

    Route::get('/product', [ProductController::class, 'index'])->name('admin.products');
    Route::resource('products', ProductController::class)->names([
        'index' => 'admin.products.index',
        'create' => 'admin.products.create',
        'store' => 'admin.products.store',
        'show' => 'admin.products.show',
        // 'edit' => 'admin.products.edit',
        'update' => 'admin.products.update',
        'destroy' => 'admin.products.destroy',
    ]);

    Route::get('/users', [UserController::class, 'index'])->name('admin.users');

    Route::get('/_categories', [AdminCategoryController::class, "index"])->name('admin.categories.index');
    Route::get('/_categories', [AdminCategoryController::class, "index"])->name('admin.categories.index');

    Route::get('/_reviews', [AdminReviewController::class, "index"]);
    Route::apiResource('reviews', AdminReviewController::class);

    //     Route::middleware(['auth', 'admin'])->group(function () {
    //     Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    //     Route::get('/admin/orders', [AdminController::class, 'orders'])->name('admin.orders');
    //     // Add other routes here...
    // });

    Route::get('/dashboard', [Dashboard::class, 'index'])->middleware(['auth', 'verified'])->name('admin.dashboard');

    Route::get('/_settings', function () {
        return Inertia::render('Admin/SettingsPage', [
            'canLogin' => Route::has('admin.login'),
            'canRegister' => Route::has('admin.register'),
        ]);
    });

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
