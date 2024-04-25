<?php

// ============================================================================>> Core Library
use Illuminate\Support\Facades\Route;

// ============================================================================>> Custom Library
use App\Http\Controllers\Profile\ProfileController;

Route::get('/',                 [ProfileController::class, 'view']);
Route::post('/',                [ProfileController::class, 'update']);
Route::post('/change-password', [ProfileController::class, 'changePassword']);


