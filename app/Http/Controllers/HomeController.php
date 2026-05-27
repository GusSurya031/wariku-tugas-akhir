<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        return Inertia::render('Guest/Home');
    }

    public function about()
    {
        return Inertia::render('Guest/About');
    }

}
