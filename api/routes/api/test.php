<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Testing\EmailController;

// ========================================================================>> Send Email
Route::post('/send-email', [EmailController::class, 'sendEmailRaw']);

// ========================================================================>> Telegram Bot


// ========================================================================>> JSReport


// ========================================================================>> File Service


