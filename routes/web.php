<?php

use App\Http\Controllers\curl\OrderController;
use App\Http\Controllers\FakerController;
use App\Http\Middleware\CheckAccessScopes;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
/*

Route::view('/', 'app')->name('home');
Route::get('/orders', [OrderController::class, 'index']);
*/

Route::middleware(['verify.shopify', CheckAccessScopes::class])->group(function() {
    Route::view('/', 'app')->name('home');
    Route::post('/fake-data', [FakerController::class, 'store']);
    Route::delete('/fake-data', [FakerController::class, 'destroy']);
});
