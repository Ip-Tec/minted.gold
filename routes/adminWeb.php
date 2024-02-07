<?php

use App\Http\Controllers\Admin\AdminProductController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\WebsiteSetting;
use App\Http\Controllers\AdminProfileController;
use App\Http\Controllers\Admin\CategoryController;

/*
|--------------------------------------------------------------------------
| Admin Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['admin', 'adminVerified'])->group(function () {
    // Other routes that require middleware

    Route::get(
        '/admin',
        //  function () {
        //     return Inertia::render('Admin/Welcome', [
        //         'canLogin' => Route::has('admin.login'),
        //         'canRegister' => Route::has('admin.register'),
        //         'laravelVersion' => Application::VERSION,
        //         'phpVersion' => PHP_VERSION,
        //     ]);
        // })
        // ->middleware(['admin', 'verified'])
        [ProductController::class, 'adminIndex']
    )->name("Adminwelcome");


    // Route::get('/admin/dashboard', function () {
    Route::get('/admin/dashboard', [ProductController::class, 'adminIndex'])

        //     ->name('__admin');
        // })
        // ->middleware(['admin', 'adminVerified'])
        ->name('admin.dashboard');


    Route::get('/admin/products', [AdminProductController::class, 'index'])
        ->name('admin.product');

    Route::get('/admin/products/search', [AdminProductController::class, 'search'])
        ->name('admin.product.search');

    // For creating a new product
    Route::post('/admin/products/store', [AdminProductController::class, 'store'])
        ->name('admin.product.create');

    // For updating an existing product
    Route::post('/admin/products/update/{id}', [AdminProductController::class, 'update'])
        ->name('admin.product.update');

    Route::delete('/admin/products/destroy/{id}', [AdminProductController::class, 'destroy'])->name('admin.product.destroy');

    Route::group(['prefix' => '/admin'], function () {
        // Routes without middleware
        Route::get('/profile/AdminEdit', function () {
            return Inertia::render('Admin/Profile', [
                'canLogin' => Route::has('admin.login'),
            ]);
        })->name('admin.profile.index');

        Route::get('/profile/edit/', [AdminProfileController::class, 'edit'])->name('admin.profile.edit');

        Route::patch('/profile/update/', [AdminProfileController::class, 'update'])->name('admin.profile.update');

        Route::delete('/profile/destroy', [AdminProfileController::class, 'destroy'])->name('admin.profile.destroy');

        // Routes with middleware

    });

    Route::group(['prefix' => '/admin'], function () {

        Route::get('/categories', [CategoryController::class, 'index'])->name('admin.categories.index');

        Route::get('/categories/products', [CategoryController::class, 'indexNoPage'])->name('admin.categories.indexNoPage');

        Route::put('/categories', [CategoryController::class, 'edit'])->name('admin.categories.edit');

        // For creating a new product
        Route::post('/categories/create/', [CategoryController::class, 'store'])->name('admin.categories.create');

        // For updating an existing product
        Route::post('/categories/update/{id}', [CategoryController::class, 'update'])->name('admin.categories.update');

        Route::delete('/categories/delete/{id}', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');

        Route::get('/orders', [CategoryController::class, 'index'])->name('admin.orders.index');

        Route::put('/orders', [CategoryController::class, 'edit'])->name('admin.orders.edit');

        Route::patch('/orders', [CategoryController::class, 'update'])->name('admin.orders.update');

        Route::delete('/orders', [CategoryController::class, 'destroy'])->name('admin.orders.destroy');


        Route::get('/websiteSetting/', [WebsiteSetting::class, 'index'])->name('admin.websiteSetting.index');

        // update Website Setting Featured
        Route::get('/websiteSetting/updateWebsiteSettingFeatured/{featured}', [WebsiteSetting::class, 'updateWebsiteSettingFeatured'])->name('admin.websiteSetting.updateWebsiteSettingFeatured');

        Route::put('/websiteSetting', [WebsiteSetting::class, 'edit'])->name('admin.websiteSetting.edit');

        Route::patch('/websiteSetting', [WebsiteSetting::class, 'update'])->name('admin.websiteSetting.update');

        Route::delete('/websiteSetting', [WebsiteSetting::class, 'destroy'])->name('admin.websiteSetting.destroy');


        Route::middleware(['admin'])->group(function () {

            // Route::get('/admin/categories', [CategoryController::class, 'index'])->name('admin.categories.index');
            // Route::put('/admin/categories', [CategoryController::class, 'edit'])->name('admin.categories.edit');
            // Route::patch('/admin/categories', [CategoryController::class, 'update'])->name('admin.categories.update');
            // Route::delete('/admin/categories', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');
        });
    });

    // Route::middleware(['admin'])->group(function () {
    //     Route::get('/admin/orders', [CategoryController::class, 'index'])->name('admin.orders.index');
    //     Route::put('/admin/orders', [CategoryController::class, 'edit'])->name('admin.orders.edit');
    //     Route::patch('/admin/orders', [CategoryController::class, 'update'])->name('admin.orders.update');
    //     Route::delete('/admin/orders', [CategoryController::class, 'destroy'])->name('admin.orders.destroy');
    // });

    Route::middleware(['admin'])->group(function () {
        // Get all Orders
        Route::get('/admin/orders', [CategoryController::class, 'index'])->name('admin.orders.index');
        // Edit Order
        Route::put('/admin/orders', [CategoryController::class, 'edit'])->name('admin.orders.edit');
        // Update Order
        Route::patch('/admin/orders', [CategoryController::class, 'update'])->name('admin.orders.update');
        // Delete order
        Route::delete('/admin/orders', [CategoryController::class, 'destroy'])->name('admin.orders.destroy');
    });

    Route::middleware(['admin'])->group(function () {
        Route::get('/admin/product', [ProductController::class, 'index'])->name('admin.products.index');
    });

    require __DIR__ . '/admin.php';
});
