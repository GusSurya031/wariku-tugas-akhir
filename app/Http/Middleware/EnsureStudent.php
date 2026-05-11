<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureStudent
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user()?->role_id !== 2) {
            return redirect()->route('dashboard.teacher');
        }

        return $next($request);
    }
}
