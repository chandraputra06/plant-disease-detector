<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DiagnosaController;

Route::post('/diagnose', [DiagnosaController::class, 'diagnose']);