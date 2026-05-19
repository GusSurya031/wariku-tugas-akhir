<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Inertia\Inertia;

class MaterialController extends Controller
{
    public function index()
    {
        $materials = Material::with('variantMaterials')
            ->get()
            ->map(function ($m) {
                $minDiff = $m->variantMaterials
                    ->sortBy(fn($v) => ['easy' => 1, 'medium' => 2, 'hard' => 3][$v->difficulty_level] ?? 1)
                    ->first()
                    ?->difficulty_level ?? 'easy';

                return [
                    'id'          => $m->id,
                    'title'       => $m->title,
                    'description' => $m->description,
                    'sub_description' => $m->sub_description,
                    'topic'       => $m->topic,
                    'duration'    => $m->estimated_duration ?? '30 Menit',
                    'level'       => match ($minDiff) {
                        'medium' => 2,
                        'hard'   => 3,
                        default  => 1,
                    },
                ];
            })
            ->values();

        return Inertia::render('Guest/Material', [
            'materials' => $materials,
        ]);
    }

    public function show(int $id)
    {
        $material = Material::with([
            'variantMaterials' => fn($q) => $q
                ->where('learning_type', 'text')
                ->with(['chapters' => fn($q) => $q->orderBy('order_number')]),
        ])->findOrFail($id);

        $diffOrder = ['easy' => 1, 'medium' => 2, 'hard' => 3];

        $variants = $material->variantMaterials
            ->sortBy(fn($v) => $diffOrder[$v->difficulty_level] ?? 1)
            ->map(fn($v) => [
                'difficulty' => $v->difficulty_level,
                'chapters'   => $v->chapters->map(fn($c) => [
                    'id'           => $c->id,
                    'title'        => $c->title,
                    'order_number' => $c->order_number,
                ])->values(),
            ])
            ->values();

        $related = Material::where('id', '!=', $id)
            ->where('topic', $material->topic)
            ->limit(3)
            ->get()
            ->map(fn($m) => [
                'id'          => $m->id,
                'title'       => $m->title,
                'description' => $m->description,
                'sub_description' => $m->sub_description,
                'topic'       => $m->topic,
                'duration'    => $m->estimated_duration ?? '30 Menit',
            ])
            ->values();

        $difficulty = $variants->first()['difficulty'] ?? 'easy';

        return Inertia::render('Guest/ShowMaterial', [
            'material' => [
                'id'         => $material->id,
                'title'      => $material->title,
                'description' => $material->description,
                'sub_description' => $material->sub_description,
                'topic'      => $material->topic,
                'duration'   => $material->estimated_duration ?? '30 Menit',
                'difficulty' => $difficulty,
                'variants'   => $variants,
            ],
            'related' => $related,
        ]);
    }
}
