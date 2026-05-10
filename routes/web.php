<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OnBoardingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/', [HomeController::class, 'home'])->name('home.index');
Route::get('/material', [HomeController::class, 'material'])->name('home.material');
Route::get('/material/1', [HomeController::class, 'showMaterial'])->name('home.showMaterial');
Route::get('/about', [HomeController::class, 'about'])->name('home.about');
Route::get('/login', [AuthController::class, 'login'])->name('auth.login');
Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::post('/register', [AuthController::class, 'store'])->name('auth.store');
Route::post('/login', [AuthController::class, 'authenticate'])->name('login');

Route::get('/lessons', [DashboardController::class, 'lessons'])->name('dashboard.lessons');
Route::get('/lessons/1', [DashboardController::class, 'showLesson'])->name('dashboard.showLesson');
Route::get('/exercise', [DashboardController::class, 'exercise'])->name('dashboard.exercise');
Route::get('/profile', [DashboardController::class, 'profile'])->name('dashboard.profile');
Route::get('/quiz', [DashboardController::class, 'quiz'])->name('dashboard.quiz');
Route::get('/report', [DashboardController::class, 'report'])->name('dashboard.report');




// Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
    Route::get('/dashboard/teacher', [DashboardController::class, 'dashboardTeacher'])->name('dashboard.teacher');

    Route::get('/onboarding', [OnBoardingController::class, 'index'])
        ->name('onboarding.index');

    Route::post('/onboarding/profile', [OnBoardingController::class, 'storeProfile'])
        ->name('onboarding.profile');

    Route::post('/onboarding/mood', [OnBoardingController::class, 'storeMood'])
        ->name('onboarding.mood');

    Route::post('/onboarding/finish', [OnBoardingController::class, 'finish'])
        ->name('onboarding.finish');

    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
// });

