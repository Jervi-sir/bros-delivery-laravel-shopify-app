<?php

use App\Http\Controllers\curl\OrderController;
use App\Http\Controllers\FakerController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\CheckAccessScopes;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
/*
if (env('VITE_APP_TYPE') === 'curl') {
    Route::view('/', 'app')->name('home');
    Route::get('/orders', [OrderController::class, 'getOrders']);

} else {
    Route::middleware(['verify.shopify', CheckAccessScopes::class])->group(function() {
        Route::view('/', 'app')->name('home');
        Route::post('/fake-data', [FakerController::class, 'store']);
        Route::delete('/fake-data', [FakerController::class, 'destroy']);
    });
}

*/
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/orders', [OrderController::class, 'getOrders']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
