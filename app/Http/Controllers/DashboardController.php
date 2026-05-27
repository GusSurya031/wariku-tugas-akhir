<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\MaterialHasVariant;
use App\Models\MoodLog;
use App\Models\Question;
use App\Models\QuizAttempt;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user        = Auth::user();
        $userProfile = $user->userProfile;

        $latestLog = $user->latest_recommendation;
        $themeDay = null;

        if ($latestLog?->rule) {
            $themeDay = $user-> recommendation_theme_day;
        }

        $recommendedMaterials = [];
        if ($userProfile?->learning_type && $userProfile?->difficulty_material) {
            $recommendedMaterials = MaterialHasVariant::with('material')
                ->where('learning_type', $userProfile->learning_type)
                ->where('difficulty_level', $userProfile->difficulty_material)
                ->take(5)
                ->get()
                ->map(fn($v) => [
                    'id'            => $v->id,
                    'material_id'   => $v->material->id,
                    'title'         => $v->material->title,
                    'topic'         => $v->material->topic,
                    'learning_type' => $v->learning_type,
                    'difficulty'    => $v->difficulty_level,
                ])
                ->values();
        }

        $allMaterials = Material::all()
            ->take(4)
            ->map(fn($m) => [
                'id'          => $m->id,
                'title'       => $m->title,
                'description' => $m->description,
                'sub_description' => $m->sub_description,
                'topic'       => $m->topic,
            ])
            ->values();

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

    public function exercise()
    {
        $user = Auth::user();

        $userProfile      = $user->userProfile;
        $userLearningType = $userProfile?->learning_type ?? 'text';

        $latestLog = $user->latest_recommendation;
        $themeDay = null;

        if ($latestLog?->rule) {
            $themeDay = $user-> recommendation_theme_day;
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

    public function report()
    {
        $user = Auth::user();

        $latestLog = $user->latest_recommendation;
        $themeDay = null;

        if ($latestLog?->rule) {
            $themeDay = $user-> recommendation_theme_day;
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
        $teacher = Auth::user();

        $latestLog = $teacher->latest_recommendation;
        $themeDay = null;

        if ($latestLog?->rule) {
            $themeDay = $teacher-> recommendation_theme_day;
        }

        $totalStudents  = User::where('role_id', 2)->count();
        $totalMaterials = Material::count();
        $totalQuestions = Question::count();

        $moodRows = DB::table('mood_logs')
            ->join('users', 'users.id', '=', 'mood_logs.user_id')
            ->select(DB::raw('DATE(mood_logs.created_at) as log_date'), 'mood_logs.mood_label', DB::raw('COUNT(*) as value'))
            ->where('users.role_id', 2)
            ->groupBy('log_date', 'mood_logs.mood_label')
            ->orderBy('log_date')
            ->get();

        $moodByDate = [];
        foreach ($moodRows as $row) {
            $moodByDate[$row->log_date][] = ['label' => $row->mood_label, 'value' => (int) $row->value];
        }

        $warigaRows = DB::table('mood_logs')
            ->join('users', 'users.id', '=', 'mood_logs.user_id')
            ->join('wariga_profiles', 'wariga_profiles.user_id', '=', 'users.id')
            ->select(
                DB::raw('DATE(mood_logs.created_at) as log_date'),
                'wariga_profiles.catur_bekel_kahuripan',
                DB::raw('COUNT(*) as value')
            )
            ->where('users.role_id', 2)
            ->whereNotNull('wariga_profiles.catur_bekel_kahuripan')
            ->groupBy('log_date', 'catur_bekel_kahuripan')
            ->orderBy('log_date')
            ->get();

        $warigaByDate = [];
        foreach ($warigaRows as $row) {
            $warigaByDate[$row->log_date][] = [
                'label' => ucfirst($row->catur_bekel_kahuripan),
                'value' => (int) $row->value,
            ];
        }

        $availableDates = array_values(array_unique(
            array_merge(array_keys($moodByDate), array_keys($warigaByDate))
        ));
        sort($availableDates);

        $latestScorePerUser = DB::table('quiz_attempts')
            ->select('user_id', DB::raw('MAX(score_performance) as score_performance'))
            ->groupBy('user_id')
            ->get()
            ->keyBy('user_id');

        $latestRecoPerUser = DB::table('recommendation_logs')
            ->join('recommendation_rules', 'recommendation_rules.id', '=', 'recommendation_logs.recommendation_rules_id')
            ->select('recommendation_logs.user_id', 'recommendation_rules.rule_code', 'recommendation_rules.description')
            ->orderByDesc('recommendation_logs.created_at')
            ->get()
            ->unique('user_id')
            ->keyBy('user_id');

        $exportByDate = [];
        $moodLogsForExport = DB::table('mood_logs')
            ->join('users', 'users.id', '=', 'mood_logs.user_id')
            ->leftJoin('wariga_profiles', 'wariga_profiles.user_id', '=', 'users.id')
            ->select(
                DB::raw('DATE(mood_logs.created_at) as log_date'),
                'users.id as user_id',
                'users.fullname',
                'users.username',
                'mood_logs.mood_label',
                'mood_logs.mood_level',
                'wariga_profiles.catur_bekel_kahuripan'
            )
            ->where('users.role_id', 2)
            ->orderBy('mood_logs.created_at')
            ->get();

        foreach ($moodLogsForExport as $row) {
            $score = $latestScorePerUser->get($row->user_id);
            $reco  = $latestRecoPerUser->get($row->user_id);
            $exportByDate[$row->log_date][] = [
                'user_name'           => $row->fullname ?: $row->username,
                'mood_label'          => $row->mood_label,
                'mood_level'          => $row->mood_level,
                'score_performance'   => $score?->score_performance ?? '-',
                'recommendation_rule' => $reco?->rule_code ?? '-',
                'wariga_condition'    => $row->catur_bekel_kahuripan
                    ? ucfirst($row->catur_bekel_kahuripan)
                    : '-',
            ];
        }

        $totalVariants = MaterialHasVariant::count();

        $attemptStats = DB::table('quiz_attempts')
            ->select(
                'user_id',
                DB::raw('COUNT(*) as total_attempts'),
                DB::raw('AVG(score) as avg_score'),
                DB::raw('AVG(score_performance) as avg_score_performance'),
                DB::raw('COUNT(DISTINCT material_has_variant_id) as distinct_variants')
            )
            ->groupBy('user_id')
            ->get()
            ->keyBy('user_id');

        $students = User::where('role_id', 2)->get();

        $performanceGeneral = $students->map(function ($u) use ($attemptStats, $totalVariants) {
            $stat = $attemptStats->get($u->id);
            return [
                'id'                  => $u->id,
                'name'                => $u->fullname ?: $u->username,
                'attempts'            => (int) ($stat?->total_attempts ?? 0),
                'progress'            => $totalVariants > 0
                    ? (int) round(($stat?->distinct_variants ?? 0) / $totalVariants * 100)
                    : 0,
                'avg_score'           => (int) round($stat?->avg_score ?? 0),
                'avg_score_performance' => (int) round($stat?->avg_score_performance ?? 0),
            ];
        })->sortByDesc('avg_score')->values();

        $materialAttempts = DB::table('quiz_attempts')
            ->join('material_has_variants', 'material_has_variants.id', '=', 'quiz_attempts.material_has_variant_id')
            ->join('materials', 'materials.id', '=', 'material_has_variants.material_id')
            ->select(
                'materials.id as material_id',
                'materials.title as material_title',
                'quiz_attempts.user_id',
                DB::raw('COUNT(*) as total_attempts'),
                DB::raw('AVG(quiz_attempts.score) as avg_score'),
                DB::raw('MAX(quiz_attempts.score) as highest_score')
            )
            ->groupBy('materials.id', 'materials.title', 'quiz_attempts.user_id')
            ->get();

        $studentNameMap = $students->keyBy('id')->map(fn($u) => $u->fullname ?: $u->username);

        $performanceByMaterial = [];
        foreach ($materialAttempts as $row) {
            if (!isset($performanceByMaterial[$row->material_id])) {
                $performanceByMaterial[$row->material_id] = ['title' => $row->material_title, 'rows' => []];
            }
            $performanceByMaterial[$row->material_id]['rows'][] = [
                'id'            => $row->user_id,
                'name'          => $studentNameMap->get($row->user_id, '-'),
                'attempts'      => (int) $row->total_attempts,
                'avg_score'     => (int) round($row->avg_score),
                'highest_score' => (int) round($row->highest_score),
            ];
        }

        foreach ($performanceByMaterial as &$matData) {
            usort($matData['rows'], fn($a, $b) => $b['highest_score'] - $a['highest_score']);
        }
        unset($matData);

        $materials = Material::select('id', 'title')
            ->get()
            ->map(fn($m) => ['id' => $m->id, 'title' => $m->title])
            ->values();

        return Inertia::render('Auth/DashboardTeacher', [
            'auth' => [
                'user' => [
                    'name'     => $teacher->username,
                    'fullname' => $teacher->fullname,
                ],
            ],
            'themeDay'              => $themeDay,
            'stats'                 => [
                'totalStudents'  => $totalStudents,
                'totalMaterials' => $totalMaterials,
                'totalQuestions' => $totalQuestions,
            ],
            'moodByDate'            => $moodByDate,
            'warigaByDate'          => $warigaByDate,
            'availableDates'        => $availableDates,
            'exportByDate'          => $exportByDate,
            'performanceGeneral'    => $performanceGeneral,
            'performanceByMaterial' => $performanceByMaterial,
            'materials'             => $materials,
        ]);
    }
}
