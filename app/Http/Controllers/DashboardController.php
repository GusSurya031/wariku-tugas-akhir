<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Dashboard');
    }

    public function lessons()
    {
        return Inertia::render('Auth/Lesson');
    }

    public function showLesson()
    {
        return Inertia::render('Auth/ChapterLesson');
    }

    public function exercise()
    {
        return Inertia::render('Auth/Exercise');
    }

    public function profile()
    {
        return Inertia::render('Auth/Profile');
    }

    public function quiz()
    {
        return Inertia::render('Auth/Quiz');
    }

    public function report()
    {
        return Inertia::render('Auth/Report');
    }

    public function dashboardTeacher()
    {
        return Inertia::render('Auth/DashboardTeacher');
    }
}
