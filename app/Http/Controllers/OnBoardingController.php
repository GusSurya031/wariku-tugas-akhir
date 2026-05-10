<?php

namespace App\Http\Controllers;

use App\Models\MoodLog;
use App\Models\RecommendationLog;
use App\Models\RecommendationRule;
use App\Models\UserProfile;
use App\Models\WarigaProfile;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OnBoardingController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
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
        $validated = $request->validate([
            'username'            => ['required', 'string', 'max:100'],
            'birth_date'          => ['required', 'date'],
            'gender'              => ['required', 'in:male,female'],
            'balinese_birth_date' => ['required'],
            'balinese_today_date' => ['required'],
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $user->update(['username' => $validated['username']]);

        UserProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'birth_date' => $validated['birth_date'],
                'gender'     => $validated['gender'],
            ]
        );

        // Hitung catur_bekel_kahuripan: (urip lahir + urip hari ini) % 4
        // 1=Guru, 2=Ratu, 3=Lara, 0=Pati
        $modulo = (
            $validated['balinese_birth_date']['pancaWara']['urip'] +
            $validated['balinese_birth_date']['saptaWara']['urip'] +
            $validated['balinese_today_date']['pancaWara']['urip'] +
            $validated['balinese_today_date']['saptaWara']['urip']
        ) % 4;

        $caturBekel = match ($modulo) {
            1 => 'guru',
            2 => 'ratu',
            3 => 'lara',
            default => 'pati',
        };

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

        // Selesaikan content type jika 'random'
        $finalContentType = $rule->recommended_content_type === 'random'
            ? collect(['text', 'illustration'])->random()
            : $rule->recommended_content_type;

        // Simpan preferensi ke user_profiles agar bisa digunakan oleh dashboard
        UserProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'learning_type'     => $finalContentType,
                'difficulty_material' => $rule->recommended_difficulty,
            ]
        );

        // Catat log rekomendasi yang diterapkan
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

    // -----------------------------------------------
    // Hitung nama tema dari offset (current / next)
    // Dipanggil di dashboard saat perlu resolve tema
    // -----------------------------------------------
    public static function resolveThemeDay(string $offset, ?\Carbon\Carbon $referenceDate = null): string
    {
        $days      = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        $reference = $referenceDate ?? now();
        $index     = $offset === 'next'
            ? ($reference->dayOfWeek + 1) % 7
            : $reference->dayOfWeek;

        return $days[$index];
    }
}
