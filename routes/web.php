<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/', [HomeController::class, 'home'])->name('home.index');
Route::get('/material', [HomeController::class, 'material'])->name('home.material');
// Route::get('/material/{material}', [HomeController::class, 'showMaterial'])->name('home.showMaterial');
Route::get('/material/1', [HomeController::class, 'showMaterial'])->name('home.showMaterial');
Route::get('/about', [HomeController::class, 'about'])->name('home.about');
// Route::get('/auth', [HomeController::class, 'auth'])->name('home.auth');
// Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
Route::get('/login', [AuthController::class, 'login'])->name('auth.login');
Route::get('/register', [AuthController::class, 'register'])->name('auth.register');
