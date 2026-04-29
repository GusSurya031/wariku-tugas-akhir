<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Material;

class HomeController extends Controller
{
    public function home() {
        return Inertia::render('Guest/Home');
    }

    public function material(){
        return Inertia::render('Guest/Material');
    }

    // public function showMaterial(Material $material){
    //     return Inertia::render('Guest/ShowMaterial', [
    //         'material' => $material
    //     ]);
    // }

    public function about(){
        return Inertia::render('Guest/About');
    }

    public function auth(){
        return Inertia::render('Guest/AuthPage');
    }
}
