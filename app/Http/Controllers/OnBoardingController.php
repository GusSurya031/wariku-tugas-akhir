<?php

namespace App\Http\Controllers;

use App\Models\MoodLog;
use App\Models\UserProfile;
use App\Models\WarigaProfile;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OnBoardingController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/OnBoarding');
    }

    public function storeProfile(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'username' => ['required', 'string', 'max:100'],
            'birth_date' => ['required', 'date'],
            'gender' => ['required', 'in:male,female'],
            'balinese_birth_date' => ['required'],
            'balinese_today_date' => ['required'],
        ]);

        $user = Auth::user();

        // Update username in users table
        $user->update([
            'username' => $validated['username'],
        ]);

        // Update or create user profile
        UserProfile::updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'birth_date' => $validated['birth_date'],
                'gender' => $validated['gender'],
            ]
        );

        $moduloCaturBekelKahuripan = 4;
        $characteristic = '';
        $caturBekelKahuripan = (($validated['balinese_birth_date']['pancaWara']['urip'] + $validated['balinese_birth_date']['saptaWara']['urip']) + ($validated['balinese_today_date']['pancaWara']['urip'] + $validated['balinese_today_date']['saptaWara']['urip'])) % $moduloCaturBekelKahuripan;

        if($caturBekelKahuripan == 1) {
            $characteristic = 'Guru';
        } else if ($caturBekelKahuripan == 2) {
            $characteristic = 'Ratu';
        } else if ($caturBekelKahuripan == 3) {
            $characteristic = 'Lara';
        } else {
            $characteristic = 'Pati';
        }

        // Update or create wariga profile
        WarigaProfile::updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'wuku' => $validated['balinese_birth_date']['wuku']['name'],
                'urip_wuku' => $validated['balinese_birth_date']['wuku']['urip'],
                'panca_wara' => $validated['balinese_birth_date']['pancaWara']['name'],
                'urip_panca_wara' => $validated['balinese_birth_date']['pancaWara']['urip'],
                'sapta_wara' => $validated['balinese_birth_date']['saptaWara']['name'],
                'urip_sapta_wara' => $validated['balinese_birth_date']['saptaWara']['urip'],
                'characteristic' => $characteristic,
            ]
        );

        return back();
    }

    public function storeMood(Request $request)
    {
        $validated = $request->validate([
            'mood_level' => ['required', 'integer', 'min:1', 'max:3'],
            'mood_label' => ['required', 'string'],
        ]);

        MoodLog::create([
            'user_id' => Auth::id(),
            'mood_level' => $validated['mood_level'],
            'mood_label' => $validated['mood_label'],
        ]);

        return back();
    }

    public function finish()
    {
        return redirect('/dashboard');
    }
}
