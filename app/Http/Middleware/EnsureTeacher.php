<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureTeacher
{
    // EnsureTeacher.php
    public function handle(Request $request, Closure $next)
    {
        // Jika belum login sama sekali → ke login
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        // Jika login tapi bukan teacher → ke dashboard student
        if ( (int) auth()->user()->role_id !== 1) {
            return redirect()->route('dashboard.index');
        }

        return $next($request);
    }
}
