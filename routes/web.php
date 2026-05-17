<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\OnBoardingController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/', [HomeController::class, 'home'])->name('home.index');
Route::get('/material', [HomeController::class, 'material'])->name('home.material');
Route::get('/material/{id}', [HomeController::class, 'showMaterial'])->name('home.showMaterial');
Route::get('/about', [HomeController::class, 'about'])->name('home.about');
Route::get('/login', [AuthController::class, 'login'])->name('auth.login');
Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::post('/register', [AuthController::class, 'store'])->name('auth.store');
Route::post('/login', [AuthController::class, 'authenticate'])->name('login');

Route::get('/materials/create', [MaterialController::class, 'create'])->name('materials.create');
Route::post('/materials', [MaterialController::class, 'store'])->name('materials.store');
Route::get('/materials/{id}', [MaterialController::class, 'show'])->name('materials.show');


// ── Shared: both roles ────────────────────────────────────────────────────────
Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::get('/profile', [DashboardController::class, 'profile'])->name('dashboard.profile');
    Route::post('/profile', [DashboardController::class, 'updateProfile'])->name('profile.update');
});

// ── Teacher only ──────────────────────────────────────────────────────────────
Route::middleware(['auth', 'teacher'])->group(function () {
    Route::get('/dashboard/teacher', [DashboardController::class, 'dashboardTeacher'])->name('dashboard.teacher');
});

// ── Student only ──────────────────────────────────────────────────────────────
Route::middleware(['auth', 'student'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

    Route::get('/onboarding', [OnBoardingController::class, 'index'])->name('onboarding.index');
    Route::post('/onboarding/profile', [OnBoardingController::class, 'storeProfile'])->name('onboarding.profile');
    Route::post('/onboarding/mood', [OnBoardingController::class, 'storeMood'])->name('onboarding.mood');
    Route::post('/onboarding/finish', [OnBoardingController::class, 'finish'])->name('onboarding.finish');

    Route::get('/lessons', [LessonController::class, 'index'])->name('lessons.index');
    Route::get('/lessons/{id}', [LessonController::class, 'show'])->name('lessons.show');
    Route::post('/lessons/{variantId}/progress', [LessonController::class, 'updateProgress'])->name('lessons.progress');

    Route::get('/exercise', [DashboardController::class, 'exercise'])->name('dashboard.exercise');

    Route::get('/quiz/result/{attemptId}', [QuizController::class, 'result'])->name('quiz.result');
    Route::get('/quiz/{variantId}/info', [QuizController::class, 'preQuizInfo'])->name('quiz.info');
    Route::get('/quiz/{variantId}', [DashboardController::class, 'quiz'])->name('dashboard.quiz');
    Route::post('/quiz', [QuizController::class, 'store'])->name('quiz.store');

    Route::get('/report', [DashboardController::class, 'report'])->name('dashboard.report');
});
