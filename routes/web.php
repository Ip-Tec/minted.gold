<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

// Checkout Page 
Route::get('/checkout', [CartController::class, 'checkout'])->name('pay.checkout');



// View single Product
Route::get('/view/{slug}', [ProductController::class, 'show'])->name("show.product");

// Search Products route
Route::get('/search/{slug}', function (string $slug) {
    return inertia('ViewPage');
});

Route::get('/search', [SearchController::class, 'search'])->name('search');

Route::middleware(['auth', 'verified'])->group(function () {

    // Payment Route
    Route::post('/payment/callback', [PaymentController::class, 'handleCallback'])->name('makePayment');

    // User Setting Route
    Route::get('/user/settings', [UserController::class, 'showSettings'])->name('user.settings');
    Route::post('/user/settings', [UserController::class, 'updateSettings'])->name('user.settings.update');

    // Dashboard Route
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Order Route
    Route::get('/user/orders', [UserController::class, 'showOrders'])->name('user.orders');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Cart Route
    Route::get('/cart/add', [HomeController::class, 'index'])->name('cart.add.home');
    Route::get('/cart/update-quantity/{id}', [HomeController::class, 'index'])->name('cart.updateQuantity.home');
    Route::get('/cart/{id}', [HomeController::class, 'index'])->name('cart.remove.home');

    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::put('/cart/update-quantity/{id}', [CartController::class, 'updateQuantity'])->name('cart.updateQuantity');
    Route::delete('/cart/{id}', [CartController::class, 'remove'])->name('cart.remove');
    Route::delete('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

    // Wishlist Route
    Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
    Route::post('/wishlist', [WishlistController::class, 'store'])->name('wishlist.store');
    Route::delete('/wishlist/{id}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');

    // Orders Routes
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
});

require __DIR__ . '/admin.php';
require __DIR__ . '/auth.php';
