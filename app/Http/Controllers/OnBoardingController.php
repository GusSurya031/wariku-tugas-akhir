<?php

namespace App\Http\Controllers;

use App\Models\MoodLog;
use App\Models\RecommendationLog;
use App\Models\RecommendationRule;
use App\Models\UserProfile;
use App\Models\WarigaProfile;
use App\Services\WarigaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class OnBoardingController extends Controller
{
    public function index()
    {
        $user        = Auth::user();
        $userProfile = $user->userProfile;

        return Inertia::render('Auth/OnBoarding', [
            'hasProfile'  => $userProfile !== null,
            'userProfile' => $userProfile ? [
                'username'   => $user->username,
                'birth_date' => $userProfile->birth_date,
                'gender'     => $userProfile->gender,
            ] : null,
        ]);
    }

    public function storeProfile(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'username'            => ['required', 'string', 'max:100', Rule::unique('users', 'username')->ignore($user->id)],
            'birth_date'          => ['required', 'date'],
            'gender'              => ['required', 'in:male,female'],
            'balinese_birth_date' => ['required'],
            'balinese_today_date' => ['required'],
        ]);

        $user->update(['username' => $validated['username']]);

        UserProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'birth_date' => $validated['birth_date'],
                'gender'     => $validated['gender'],
            ]
        );

        $caturBekel = WarigaService::calculateCBK(
            $validated['balinese_birth_date']['pancaWara']['urip'],
            $validated['balinese_birth_date']['saptaWara']['urip'],
            $validated['balinese_today_date']['pancaWara']['urip'],
            $validated['balinese_today_date']['saptaWara']['urip']
        );

        WarigaProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'wuku'                  => $validated['balinese_birth_date']['wuku']['name'],
                'urip_wuku'             => $validated['balinese_birth_date']['wuku']['urip'],
                'panca_wara'            => $validated['balinese_birth_date']['pancaWara']['name'],
                'urip_panca_wara'       => $validated['balinese_birth_date']['pancaWara']['urip'],
                'sapta_wara'            => $validated['balinese_birth_date']['saptaWara']['name'],
                'urip_sapta_wara'       => $validated['balinese_birth_date']['saptaWara']['urip'],
                'catur_bekel_kahuripan' => $caturBekel,
                'catur_bekel_date'      => today()->toDateString(),
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

        /** @var \App\Models\User $user */
        $user = Auth::user();

        MoodLog::create([
            'user_id'    => $user->id,
            'mood_level' => $validated['mood_level'],
            'mood_label' => $validated['mood_label'],
        ]);

        $warigaProfile = $user->warigaProfile;
        $caturBekel    = $warigaProfile->catur_bekel_kahuripan;
        $moodValue     = $validated['mood_level'];

        $rule = RecommendationRule::active()
            ->firstLogin()
            ->where('mood_value', $moodValue)
            ->whereJsonContains('catur_bekel_values', $caturBekel)
            ->orderBy('priority')
            ->first();

        if (!$rule) {
            return back();
        }

        $finalContentType = $rule->recommended_content_type === 'random'
            ? collect(['text', 'illustration'])->random()
            : $rule->recommended_content_type;

        UserProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'learning_type'     => $finalContentType,
                'difficulty_material' => $rule->recommended_difficulty,
            ]
        );

        RecommendationLog::create([
            'user_id'                => $user->id,
            'recommendation_rules_id' => $rule->id,
        ]);

        return back();
    }

    public function finish()
    {
        return redirect()->route('dashboard.index');
    }
}
