<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $latestLog = $user->latest_recommendation;
        $themeDay = null;

        if ($latestLog?->rule) {
            $themeDay = $user-> recommendation_theme_day;
        }

        return Inertia::render('Auth/Profile', [
            'auth' => [
                'user' => [
                    'name'     => $user->username,
                    'fullname' => $user->fullname,
                ],
            ],
            'userData' => [
                'username'   => $user->username,
                'fullname'   => $user->fullname,
                'email'      => $user->email,
                'profil_url' => $user->profil_path ? Storage::url($user->profil_path) : null,
                'gender'     => $user->userProfile?->gender,
                'birth_date' => $user->userProfile?->birth_date
                    ? \Carbon\Carbon::parse($user->userProfile->birth_date)->format('Y-m-d')
                    : null,
            ],
            'themeDay' => $themeDay,
        ]);
    }

    public function update(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $request->validate([
            'username' => ['required', 'string', 'max:255', Rule::unique('users', 'username')->ignore($user->id)],
            'fullname' => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:8'],
            'gender'   => ['nullable', 'in:male,female'],
            'photo'    => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        $user->username = $request->username;
        $user->fullname = $request->fullname;
        $user->email    = $request->email;

        if ($request->filled('password')) {
            $user->password = $request->password;
        }

        if ($request->boolean('remove_photo')) {
            if ($user->profil_path) {
                Storage::disk('public')->delete($user->profil_path);
            }
            $user->profil_path = null;
        } elseif ($request->hasFile('photo')) {
            if ($user->profil_path) {
                Storage::disk('public')->delete($user->profil_path);
            }
            $user->profil_path = $request->file('photo')->store('profiles', 'public');
        }

        $user->save();

        UserProfile::updateOrCreate(
            ['user_id' => $user->id],
            ['gender'  => $request->gender ?: null]
        );

        return redirect()->route('profile.index')->with('success', 'Profil berhasil diperbarui!');
    }

}
