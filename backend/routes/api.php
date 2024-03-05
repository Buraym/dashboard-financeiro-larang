<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::prefix('/expenses')->group(function () {
    Route::get('/', [App\Http\Controllers\ExpensesController::class, "index"]);
    Route::get('/{id}', [App\Http\Controllers\ExpensesController::class, "show"]);
    Route::post('/', [App\Http\Controllers\ExpensesController::class, "store"]);
    Route::patch('/{id}', [App\Http\Controllers\ExpensesController::class, "update"]);
    Route::delete('/{id}', [App\Http\Controllers\ExpensesController::class, "destroy"]);
});

Route::prefix('/incomes')->group(function () {
    Route::get('/', [App\Http\Controllers\IncomesController::class, "index"]);
    Route::get('/{id}', [App\Http\Controllers\IncomesController::class, "show"]);
    Route::post('/', [App\Http\Controllers\IncomesController::class, "store"]);
    Route::patch('/{id}', [App\Http\Controllers\IncomesController::class, "update"]);
    Route::delete('/{id}', [App\Http\Controllers\IncomesController::class, "destroy"]);
});

Route::prefix('/categories')->group(function () {
    Route::get('/', [App\Http\Controllers\CategoriesController::class, "index"]);
    Route::get('/{id}', [App\Http\Controllers\CategoriesController::class, "show"]);
    Route::post('/', [App\Http\Controllers\CategoriesController::class, "store"]);
    Route::patch('/{id}', [App\Http\Controllers\CategoriesController::class, "update"]);
    Route::delete('/{id}', [App\Http\Controllers\CategoriesController::class, "destroy"]);
});

Route::prefix('/analytics')->group(function () {
    Route::get('/', [App\Http\Controllers\AnalyticsController::class, "index"]);
});
