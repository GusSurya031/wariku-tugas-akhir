<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(User $user) {
        return Inertia::render('User/Show', [
            'user' => $user
        ]);
    }

}
