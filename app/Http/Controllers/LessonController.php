<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\MaterialHasVariant;
use App\Models\RecommendationLog;
use App\Models\UserMaterialProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $userProfile      = $user->userProfile;
        $userLearningType = $userProfile?->learning_type ?? 'text';
        $themeDay         = $user->recommendation_theme_day;

        $progressMap = UserMaterialProgress::where('user_id', $user->id)
            ->get()
            ->keyBy('material_has_variant_id');

        $latestLog = $user->latest_recommendation;
        $recommendedDifficulty = $latestLog?->rule?->recommended_difficulty;

        $allMaterials = Material::with([
            'variantMaterials',
            'variantMaterials.chapters' => fn($q) => $q->orderBy('order_number'),
        ])->get()
            ->map(fn($m) => [
                'id'                 => $m->id,
                'title'              => $m->title,
                'description'        => $m->description,
                'sub_description'        => $m->sub_description,
                'topic'              => $m->topic,
                'estimated_duration' => $m->estimated_duration,
                'variants'           => $m->variantMaterials->map(fn($v) => [
                    'id'               => $v->id,
                    'difficulty_level' => $v->difficulty_level,
                    'learning_type'    => $v->learning_type,
                    'chapter_count'    => $v->chapters->count(),
                    'chapter_titles'   => $v->chapters->pluck('title')->values(),
                    'progress'         => $progressMap->has($v->id) ? [
                        'status'     => $progressMap[$v->id]->status,
                        'percentage' => $progressMap[$v->id]->progress_percentage,
                    ] : null,
                ])->values(),
            ])
            ->values();

        return Inertia::render('Auth/Lesson', [
            'auth' => [
                'user' => [
                    'name'     => $user->username,
                    'fullname' => $user->fullname,
                ],
            ],
            'allMaterials'          => $allMaterials,
            'themeDay'              => $themeDay,
            'userLearningType'      => $userLearningType,
            'recommendedDifficulty' => $recommendedDifficulty,
        ]);
    }

    public function updateProgress(Request $request, int $variantId)
    {
        $request->validate([
            'chapter_index'  => 'required|integer|min:0',
            'total_chapters' => 'required|integer|min:1',
        ]);

        $user   = Auth::user();
        $newPct = min((int) round(($request->chapter_index + 1) / $request->total_chapters * 100), 100);

        $record = UserMaterialProgress::firstOrNew([
            'user_id'                 => $user->id,
            'material_has_variant_id' => $variantId,
        ]);

        $record->progress_percentage = max($record->progress_percentage ?? 0, $newPct);
        $record->status              = $record->progress_percentage >= 100 ? 'completed' : 'in_progress';
        $record->last_accessed_at    = now();
        $record->save();

        return response()->json(['ok' => true]);
    }

    public function show(int $variantId)
    {
        $variant = MaterialHasVariant::with([
            'material',
            'chapters' => fn($q) => $q->orderBy('order_number'),
        ])->findOrFail($variantId);

        $user = Auth::user();
        $themeDay = $user->recommendation_theme_day;

        return Inertia::render('Auth/ChapterLesson', [
            'variant' => [
                'id'               => $variant->id,
                'difficulty_level' => $variant->difficulty_level,
                'learning_type'    => $variant->learning_type,
                'material'         => [
                    'id'    => $variant->material->id,
                    'title' => $variant->material->title,
                    'topic' => $variant->material->topic,
                ],
                'chapters' => $variant->chapters->map(fn($c) => [
                    'id'           => $c->id,
                    'title'        => $c->title,
                    'content'      => $c->content,
                    'order_number' => $c->order_number,
                ])->values(),
            ],
            'auth' => [
                'user' => [
                    'name'     => $user->username,
                    'fullname' => $user->fullname,
                ],
            ],
            'themeDay' => $themeDay,
        ]);
    }
}
