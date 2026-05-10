<?php

namespace App\Http\Controllers;

use App\Models\RecommendationLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('Auth/Login');
    }

    public function register()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8', 'confirmed'],
        ]);

        $baseUsername = Str::lower(Str::slug(explode('@', $validated['email'])[0]));
        $username = $baseUsername;
        $i = 1;
        while (User::where('username', $username)->exists()) {
            $username = $baseUsername . $i++;
        }

        $user = User::create([
            'fullname' => $validated['name'],
            'username' => $username,
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id'  => 2,
        ]);

        Auth::login($user);

        // New user: always goes to onboarding first
        return redirect()->route('onboarding.index');
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ]);
        }

        $request->session()->regenerate();
        $user = Auth::user();

        // No profile yet: hasn't completed step 1 of onboarding
        if (!$user->userProfile) {
            return redirect()->route('onboarding.index');
        }

        // Check if a recommendation was already generated today
        $hasRecommendationToday = RecommendationLog::where('user_id', $user->id)
            ->whereDate('created_at', today())
            ->exists();

        if ($hasRecommendationToday) {
            return redirect()->intended(route('dashboard.index'));
        }

        // Different day: go to onboarding (mood-only for returning users)
        return redirect()->route('onboarding.index');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('home.index');
    }
}
