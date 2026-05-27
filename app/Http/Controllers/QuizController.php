<?php

namespace App\Http\Controllers;

use App\Models\MaterialHasVariant;
use App\Models\MoodLog;
use App\Models\Question;
use App\Models\QuestionOption;
use App\Models\QuizAnswer;
use App\Models\QuizAttempt;
use App\Models\RecommendationLog;
use App\Models\RecommendationRule;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuizController extends Controller
{

    public function start(int $variantId)
    {
        $user    = Auth::user();
        $variant = MaterialHasVariant::with(['material', 'questions.options'])
            ->findOrFail($variantId);

        $latestLog = $user->latest_recommendation;
        $themeDay = null;

        if ($latestLog?->rule) {
            $themeDay = $user->recommendation_theme_day;
        }

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
            'themeDay'  => $themeDay,
        ]);
    }

    public function preQuizInfo(int $variantId)
    {
        /** @var \App\Models\User $user */
        $user    = Auth::user();
        $variant = MaterialHasVariant::with(['material'])->findOrFail($variantId);

        $latestLog = $user->latest_recommendation;
        $themeDay = null;

        if ($latestLog?->rule) {
            $themeDay = $user->recommendation_theme_day;
        }

        $hasAttempt = QuizAttempt::where('user_id', $user->id)
            ->whereHas('materialHasVariant', fn($q) => $q->where('material_id', $variant->material_id))
            ->exists();

        if ($hasAttempt) {
            $rawDiff        = $latestLog?->rule?->recommended_quiz_difficulty ?? $variant->difficulty_level;
            $mixMap         = ['mix_easy_medium' => 'medium', 'mix_medium_hard' => 'hard'];
            $quizDifficulty = $mixMap[$rawDiff] ?? $rawDiff;
        } else {
            $quizDifficulty = $variant->difficulty_level;
        }

        $quizVariant = MaterialHasVariant::where('material_id', $variant->material_id)
            ->where('difficulty_level', $quizDifficulty)
            ->where('learning_type', $variant->learning_type)
            ->first() ?? $variant;

        return Inertia::render('Auth/PreQuiz', [
            'auth' => [
                'user' => [
                    'name'     => $user->username,
                    'fullname' => $user->fullname,
                ],
            ],
            'sourceMaterial' => [
                'title'      => $variant->material->title,
                'topic'      => $variant->material->topic,
                'difficulty' => $variant->difficulty_level,
            ],
            'quizVariantId'  => $quizVariant->id,
            'quizDifficulty' => $quizDifficulty,
            'isFirstAttempt' => !$hasAttempt,
            'themeDay'       => $themeDay,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'material_has_variant_id'          => ['required', 'integer', 'exists:material_has_variants,id'],
            'answers'                           => ['required', 'array', 'min:1'],
            'answers.*.question_id'             => ['required', 'integer', 'exists:questions,id'],
            'answers.*.question_option_id'      => ['required', 'integer', 'exists:question_options,id'],
            'answers.*.duration_answering'      => ['required', 'integer', 'min:0'],
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $answers     = collect($validated['answers']);
        $optionIds   = $answers->pluck('question_option_id');
        $questionIds = $answers->pluck('question_id');

        $correctOptionIds = array_flip(
            QuestionOption::whereIn('id', $optionIds)
                ->where('is_correct', true)
                ->pluck('id')
                ->toArray()
        );

        $estimatedDurations = Question::whereIn('id', $questionIds)
            ->pluck('estimated_duration', 'id');

        $correctCount   = 0;
        $totalActual    = 0;
        $answersPayload = [];

        foreach ($validated['answers'] as $answer) {
            $isCorrect     = isset($correctOptionIds[$answer['question_option_id']]);
            $correctCount += $isCorrect ? 1 : 0;
            $totalActual  += $answer['duration_answering'];

            $answersPayload[] = [
                'question_id'        => $answer['question_id'],
                'question_option_id' => $answer['question_option_id'],
                'duration_answering' => $answer['duration_answering'],
                'is_correct'         => $isCorrect,
            ];
        }

        $totalQuestions   = count($validated['answers']);
        $accuracy         = $totalQuestions > 0 ? ($correctCount / $totalQuestions) * 100 : 0;
        $totalEstimated   = $estimatedDurations->sum();
        $timeEfficiency   = $totalActual > 0 ? min(($totalEstimated / $totalActual) * 100, 100) : 100;
        $scorePerformance = round(0.7 * $accuracy + 0.3 * $timeEfficiency, 2);

        $cluster = match (true) {
            $scorePerformance <= 60 && $scorePerformance >= 0   => 'A',
            $scorePerformance <= 80 && $scorePerformance > 60  => 'B',
            $scorePerformance <= 100 && $scorePerformance > 80  => 'C',
            default => "Unclustered",
        };

        $attempt = QuizAttempt::create([
            'user_id'                 => $user->id,
            'material_has_variant_id' => $validated['material_has_variant_id'],
            'score'                   => (int) round($accuracy),
            'score_performance'       => $scorePerformance,
        ]);

        foreach ($answersPayload as $payload) {
            QuizAnswer::create(['quiz_attempt_id' => $attempt->id, ...$payload]);
        }

        $moodLog = MoodLog::where('user_id', $user->id)
            ->whereDate('created_at', today())
            ->latest()
            ->first();

        if (!$moodLog || !$user->warigaProfile) {
            return redirect()->route('quiz.result', $attempt->id);
        }

        $rule = RecommendationRule::active()
            ->postQuiz()
            ->where('performance_cluster', $cluster)
            ->where('mood_value', $moodLog->mood_level)
            ->whereJsonContains('catur_bekel_values', $user->warigaProfile->catur_bekel_kahuripan)
            ->orderBy('priority')
            ->first();

        if (!$rule) {
            return redirect()->route('quiz.result', $attempt->id);
        }

        $finalContentType = $rule->recommended_content_type === 'random'
            ? collect(['text', 'illustration'])->random()
            : $rule->recommended_content_type;

        UserProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'learning_type'       => $finalContentType,
                'difficulty_material' => $rule->recommended_difficulty,
            ]
        );

        // New row — preserves First Login log history
        $log = RecommendationLog::create([
            'user_id'                 => $user->id,
            'recommendation_rules_id' => $rule->id,
        ]);

        return redirect()->route('quiz.result', $attempt->id)
            ->with('rec_log_id', $log->id);
    }

    public function result(int $attemptId)
    {
        /** @var \App\Models\User $user */
        $user    = Auth::user();
        $attempt = QuizAttempt::with(['materialHasVariant.material', 'quizAnswers'])
            ->where('user_id', $user->id)
            ->findOrFail($attemptId);

        $variant      = $attempt->materialHasVariant;
        $answers      = $attempt->quizAnswers;
        $correctCount = $answers->where('is_correct', true)->count();
        $wrongCount   = $answers->where('is_correct', false)->count();
        $totalSeconds = $answers->sum('duration_answering');
        $minutes      = intdiv($totalSeconds, 60);
        $seconds      = $totalSeconds % 60;
        $durationStr  = $minutes > 0 ? "{$minutes} menit {$seconds} detik" : "{$seconds} detik";

        $logId     = session('rec_log_id');
        $latestLog = $logId
            ? RecommendationLog::with('rule')->find($logId)
            : RecommendationLog::where('user_id', $user->id)->with('rule')->latest()->first();

        $latestLog = $user->latest_recommendation;
        $themeDay = null;

        if ($latestLog?->rule) {
            $themeDay = $user->recommendation_theme_day;
        }

        $recommendation       = null;
        $recommendedMaterials = [];

        if ($latestLog?->rule) {
            $rule        = $latestLog->rule;
            $contentType = $rule->recommended_content_type === 'random'
                ? ($user->userProfile?->learning_type ?? 'text')
                : $rule->recommended_content_type;

            $diffMap = ['easy' => 'Mudah', 'medium' => 'Menengah', 'hard' => 'Lanjutan'];
            $quizDiffMap = [
                'easy'             => 'Mudah',
                'medium'           => 'Menengah',
                'hard'             => 'Lanjutan',
                'mix_easy_medium'  => 'Campuran Mudah-Menengah',
                'mix_medium_hard'  => 'Campuran Menengah-Lanjutan',
            ];

            $recVariants = MaterialHasVariant::with('material')
                ->where('difficulty_level', $rule->recommended_difficulty)
                ->where('learning_type', $contentType)
                ->whereHas('material', function ($query) use ($variant) {
                    $query->where('topic', $variant->material->topic);
                })
                ->get();

            foreach ($recVariants as $rv) {
                $recommendedMaterials[] = [
                    'label'      => 'Materi',
                    'title'      => $rv->material->title,
                    'difficulty' => $diffMap[$rule->recommended_difficulty] ?? $rule->recommended_difficulty,
                    'type'       => 'materi',
                    'href'       => "/lessons/{$rv->id}",
                ];
                $recommendedMaterials[] = [
                    'label'      => 'Latihan Soal',
                    'title'      => $rv->material->title,
                    'difficulty' => $quizDiffMap[$rule->recommended_quiz_difficulty ?? ''] ?? ($diffMap[$rule->recommended_difficulty] ?? '-'),
                    'type'       => 'latihan',
                    'href'       => "/quiz/{$rv->id}",
                ];
            }

            $recommendation = [
                'description'    => $rule->description,
                'difficulty'     => $diffMap[$rule->recommended_difficulty] ?? $rule->recommended_difficulty,
                'content_type'   => $contentType,
                'quiz_difficulty' => $quizDiffMap[$rule->recommended_quiz_difficulty ?? ''] ?? null,
            ];
        }

        $diffLabel = ['easy' => 'Mudah', 'medium' => 'Menengah', 'hard' => 'Lanjutan'];

        return Inertia::render('Auth/ExerciseResult', [
            'auth' => [
                'user' => [
                    'name'     => $user->username,
                    'fullname' => $user->fullname,
                ],
            ],
            'result' => [
                'material_title'    => $variant?->material?->title ?? '-',
                'difficulty'        => $diffLabel[$variant?->difficulty_level] ?? '-',
                'total_questions'   => $answers->count(),
                'correct_count'     => $correctCount,
                'wrong_count'       => $wrongCount,
                'duration'          => $durationStr,
                'score'             => $attempt->score,
                'score_performance' => $attempt->score_performance,
                'variant_id'        => $variant?->id,
            ],
            'recommendation'       => $recommendation,
            'recommendedMaterials' => $recommendedMaterials,
            'themeDay'             => $themeDay,
        ]);
    }
}
