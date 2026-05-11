<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\MaterialHasVariant;
use App\Models\MoodLog;
use App\Models\QuizAttempt;
use App\Models\RecommendationLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user        = Auth::user();
        $userProfile = $user->userProfile;

        // Latest recommendation log → determines active theme + content preferences
        $latestLog = RecommendationLog::where('user_id', $user->id)
            ->with('rule')
            ->latest()
            ->first();

        $themeDay = null;
        if ($latestLog?->rule) {
            $themeDay = OnBoardingController::resolveThemeDay(
                $latestLog->rule->theme_day_offset,
                $latestLog->created_at
            );
        }
        // dd($latestLog, $themeDay);

        // Recommended variants: match user's current learning_type + difficulty
        $recommendedMaterials = [];
        if ($userProfile?->learning_type && $userProfile?->difficulty_material) {
            $recommendedMaterials = MaterialHasVariant::with('material')
                ->where('learning_type', $userProfile->learning_type)
                ->where('difficulty_level', $userProfile->difficulty_material)
                ->get()
                ->map(fn($v) => [
                    'id'            => $v->id,
                    'title'         => $v->material->title,
                    'topic'         => $v->material->topic,
                    'learning_type' => $v->learning_type,
                    'difficulty'    => $v->difficulty_level,
                ])
                ->values();
        }

        // All materials for the exploration section
        $allMaterials = Material::all()
            ->map(fn($m) => [
                'id'          => $m->id,
                'title'       => $m->title,
                'description' => $m->description,
                'topic'       => $m->topic,
            ])
            ->values();

        // Recent quiz attempts for the journey table
        $recentAttempts = QuizAttempt::where('user_id', $user->id)
            ->with('materialHasVariant.material')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($a) => [
                'id'                => $a->id,
                'score'             => $a->score,
                'score_performance' => $a->score_performance,
                'created_at'        => $a->created_at->toDateTimeString(),
                'material_title'    => $a->materialHasVariant?->material?->title ?? '-',
            ]);

        return Inertia::render('Auth/Dashboard', [
            'auth' => [
                'user' => [
                    'name'     => $user->username,
                    'fullname' => $user->fullname,
                ],
            ],
            'themeDay'             => $themeDay,
            'recommendedMaterials' => $recommendedMaterials,
            'allMaterials'         => $allMaterials,
            'recentAttempts'       => $recentAttempts,
        ]);
    }
    public function showLesson()
    {
        return Inertia::render('Auth/ChapterLesson');
    }

    public function exercise()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $userProfile      = $user->userProfile;
        $userLearningType = $userProfile?->learning_type ?? 'text';

        $latestLog = RecommendationLog::where('user_id', $user->id)->with('rule')->latest()->first();
        $themeDay  = null;
        if ($latestLog?->rule) {
            $themeDay = OnBoardingController::resolveThemeDay(
                $latestLog->rule->theme_day_offset,
                $latestLog->created_at
            );
        }

        $variants = MaterialHasVariant::with(['material'])
            ->withCount('questions')
            ->where('learning_type', $userLearningType)
            ->get();

        $attemptStats = QuizAttempt::where('user_id', $user->id)
            ->selectRaw('material_has_variant_id, COUNT(*) as attempt_count, MAX(score) as best_score')
            ->groupBy('material_has_variant_id')
            ->get()
            ->keyBy('material_has_variant_id');

        $variants = $variants->map(fn($v) => [
            'id'             => $v->id,
            'material_title' => $v->material->title,
            'material_topic' => $v->material->topic,
            'difficulty'     => $v->difficulty_level,
            'question_count' => $v->questions_count,
            'attempt_count'  => $attemptStats->get($v->id)?->attempt_count ?? 0,
            'best_score'     => $attemptStats->get($v->id)?->best_score ?? null,
        ])->values();

        return Inertia::render('Auth/Exercise', [
            'auth' => [
                'user' => [
                    'name'     => $user->username,
                    'fullname' => $user->fullname,
                ],
            ],
            'variants' => $variants,
            'themeDay' => $themeDay,
        ]);
    }

    public function profile()
    {
        return Inertia::render('Auth/Profile');
    }

    public function quiz(int $variantId)
    {
        $variant = MaterialHasVariant::with(['material', 'questions.options'])
            ->findOrFail($variantId);

        // Shuffle options server-side so correct answer position varies each load
        $questions = $variant->questions->map(fn($q) => [
            'id'                 => $q->id,
            'question_text'      => $q->question_text,
            'estimated_duration' => $q->estimated_duration,
            'options'            => $q->options
                ->map(fn($o) => ['id' => $o->id, 'option_text' => $o->option_text])
                ->shuffle()
                ->values(),
        ]);

        return Inertia::render('Auth/Quiz', [
            'variant' => [
                'id'            => $variant->id,
                'materialTitle' => $variant->material->title,
                'difficulty'    => $variant->difficulty_level,
                'learningType'  => $variant->learning_type,
            ],
            'questions' => $questions,
        ]);
    }

    public function report()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $latestLog = RecommendationLog::where('user_id', $user->id)
            ->with('rule')
            ->latest()
            ->first();

        $themeDay = null;
        if ($latestLog?->rule) {
            $themeDay = OnBoardingController::resolveThemeDay(
                $latestLog->rule->theme_day_offset,
                $latestLog->created_at
            );
        }

        $todayMood = MoodLog::where('user_id', $user->id)
            ->whereDate('created_at', today())
            ->latest()
            ->first();

        $attempts = QuizAttempt::where('user_id', $user->id)
            ->with('materialHasVariant.material')
            ->withSum('quizAnswers', 'duration_answering')
            ->latest()
            ->get()
            ->map(function ($a) {
                $totalSec = (int) ($a->quiz_answers_sum_duration_answering ?? 0);
                $mins     = intdiv($totalSec, 60);
                $secs     = $totalSec % 60;
                $duration = $mins > 0 ? "{$mins} mnt {$secs} dtk" : "{$secs} dtk";

                return [
                    'id'             => $a->id,
                    'date'           => $a->created_at->format('D, d M Y'),
                    'duration'       => $duration,
                    'material_title' => $a->materialHasVariant?->material?->title ?? '-',
                    'score'          => $a->score,
                ];
            })
            ->values();

        return Inertia::render('Auth/Report', [
            'auth' => [
                'user' => [
                    'name'     => $user->username,
                    'fullname' => $user->fullname,
                ],
            ],
            'userData' => [
                'name'       => $user->username,
                'fullname'   => $user->fullname,
                'email'      => $user->email,
                'sapta_wara' => $user->warigaProfile?->sapta_wara,
                'wuku'       => $user->warigaProfile?->wuku,
                'mood_label' => $todayMood?->mood_label,
                'mood_level' => $todayMood?->mood_level,
            ],
            'attempts' => $attempts,
            'themeDay' => $themeDay,
        ]);
    }

    public function dashboardTeacher()
    {
        return Inertia::render('Auth/DashboardTeacher');
    }

    public function result()
    {
        return Inertia::render('Auth/ExerciseResult');
    }
}
