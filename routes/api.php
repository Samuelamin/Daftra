<?php

use App\Http\Controllers\Api\ApiDataController;
 use App\Http\Controllers\Api\UserOrdersController;
use App\Http\Controllers\Auth\ApiAuthenticationController;
use Illuminate\Support\Facades\Route;

Route::controller(ApiAuthenticationController::class)->group(function () {
    Route::post('/sign-up', 'signUp');
    Route::post('/sign-in', 'signIn');
});

Route::post('/products', [ApiDataController::class, 'products']);
Route::middleware('auth:sanctum', 'verified')->group(function () {

    Route::controller(ApiAuthenticationController::class)->group(function () {
        Route::get('/user', 'get_user');
        Route::get('/sign-out', 'signOut');
    });

    // User Cart Actions
    Route::resource('/user-orders', UserOrdersController::class);

});
