<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\FakerController;
use App\Http\Middleware\CheckAccessScopes;
use App\Http\Controllers\PremiumController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\curl\OrderController;
use App\Http\Controllers\appBridge\OrderController as appBridgeOrders;
use App\Http\Controllers\appBridge\ShopController as appBridgeShops;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

if (env('VITE_APP_TYPE') != 'curl') {
    Route::middleware(['verify.shopify', CheckAccessScopes::class])->group(function() {
        Route::view('/', 'app')->name('home');
        Route::post('/fake-data', [FakerController::class, 'store']);
        Route::delete('/fake-data', [FakerController::class, 'destroy']);
        Route::get('/premium', [PremiumController::class, 'index']);
        Route::post('/premium', [PremiumController::class, 'store']);
        Route::delete('/premium', [PremiumController::class, 'destroy']);

        Route::get('/orders-not-fulfilled', [appBridgeOrders::class, 'getNewOrders']);
        Route::get('/shop-status', [appBridgeShops::class, 'getShopStatus']);
        Route::post('/fetch-deliveries', [appBridgeOrders::class, 'postDeliveries']);
        Route::get('/get-deliveries', [appBridgeOrders::class, 'showShippedOrders']);

    });

} else {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });

    Route::get('/orders', [OrderController::class, 'getOrders']);
    Route::post('/fetch-deliveries', [OrderController::class, 'postDeliveries']);

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    require __DIR__.'/auth.php';
}



