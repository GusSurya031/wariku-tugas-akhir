<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureStudent
{
    // EnsureStudent.php
    public function handle(Request $request, Closure $next)
    {
        // Jika belum login sama sekali → ke login
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        // Jika login tapi bukan student → ke dashboard teacher
        if ((int) auth()->user()->role_id !== 2) {
            return redirect()->route('dashboard.teacher');
        }

        return $next($request);
    }
}
