<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ArticleController;

/*
|--------------------------------------------------------------------------
| API Routes - Budidaya Nila Bioflok System
|--------------------------------------------------------------------------
*/

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'app' => 'Budidaya Nila REST API',
        'version' => '1.1.0',
        'timestamp' => now()->toIso8601String()
    ]);
});

// Products API
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{idOrSlug}', [ProductController::class, 'show']);

// Articles API
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{idOrSlug}', [ArticleController::class, 'show']);
