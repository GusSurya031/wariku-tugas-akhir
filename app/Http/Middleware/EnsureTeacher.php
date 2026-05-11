<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureTeacher
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user()?->role_id !== 1) {
            return redirect()->route('dashboard.index');
        }

        return $next($request);
    }
}
