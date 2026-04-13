<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DiagnosaController;

Route::get('/diagnoses', [DiagnosaController::class, 'index']);
Route::post('/diagnose', [DiagnosaController::class, 'diagnose']);