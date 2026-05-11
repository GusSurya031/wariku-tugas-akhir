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
    public function preQuizInfo($variantId)
    {
        /** @var \App\Models\User $user */
        $user    = Auth::user();
        $variant = MaterialHasVariant::with(['material'])->findOrFail($variantId);

        // Resolve theme from latest recommendation log
        $latestLog = RecommendationLog::where('user_id', $user->id)->with('rule')->latest()->first();
        $themeDay  = null;
        if ($latestLog?->rule) {
            $themeDay = OnBoardingController::resolveThemeDay(
                $latestLog->rule->theme_day_offset,
                $latestLog->created_at
            );
        }

        // Check if user has any prior attempt for this material (any variant)
        $hasAttempt = QuizAttempt::where('user_id', $user->id)
            ->whereHas('materialHasVariant', fn($q) => $q->where('material_id', $variant->material_id))
            ->exists();

        // Determine quiz difficulty based on the two rules
        if ($hasAttempt) {
            // Rule 2: use recommended_quiz_difficulty from the latest log
            $rawDiff        = $latestLog?->rule?->recommended_quiz_difficulty ?? $variant->difficulty_level;
            $mixMap         = ['mix_easy_medium' => 'medium', 'mix_medium_hard' => 'hard'];
            $quizDifficulty = $mixMap[$rawDiff] ?? $rawDiff;
        } else {
            // Rule 1: same difficulty as the material variant the user just studied
            $quizDifficulty = $variant->difficulty_level;
        }

        // Find quiz variant: same material + same learning_type + resolved difficulty
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

        // Determine correctness server-side (never trust client)
        $correctOptionIds = array_flip(
            QuestionOption::whereIn('id', $optionIds)
                ->where('is_correct', true)
                ->pluck('id')
                ->toArray()
        );

        // Estimated duration per question for time efficiency calculation
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
            $scorePerformance <= 60 => 'A',
            $scorePerformance <= 80 => 'B',
            default                 => 'C',
        };

        // Save QuizAttempt
        $attempt = QuizAttempt::create([
            'user_id'                 => $user->id,
            'material_has_variant_id' => $validated['material_has_variant_id'],
            'score'                   => (int) round($accuracy),
            'score_performance'       => $scorePerformance,
        ]);

        // Save QuizAnswers
        foreach ($answersPayload as $payload) {
            QuizAnswer::create(['quiz_attempt_id' => $attempt->id, ...$payload]);
        }

        // Resolve PQ recommendation — requires today's mood and wariga profile
        $moodLog = MoodLog::where('user_id', $user->id)
            ->whereDate('created_at', today())
            ->latest()
            ->first();

        if (!$moodLog || !$user->warigaProfile) {
            return redirect()->route('dashboard.index');
        }

        $rule = RecommendationRule::active()
            ->postQuiz()
            ->where('performance_cluster', $cluster)
            ->where('mood_value', $moodLog->mood_level)
            ->whereJsonContains('catur_bekel_values', $user->warigaProfile->catur_bekel_kahuripan)
            ->orderBy('priority')
            ->first();

        if (!$rule) {
            return redirect()->route('dashboard.index');
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
        RecommendationLog::create([
            'user_id'                 => $user->id,
            'recommendation_rules_id' => $rule->id,
        ]);

        return redirect()->route('dashboard.index');
    }
}
