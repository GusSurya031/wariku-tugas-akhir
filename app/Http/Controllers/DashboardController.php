<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\MaterialHasVariant;
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
        return Inertia::render('Auth/Exercise');
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
        return Inertia::render('Auth/Report');
    }

    public function dashboardTeacher()
    {
        return Inertia::render('Auth/DashboardTeacher');
    }
}
