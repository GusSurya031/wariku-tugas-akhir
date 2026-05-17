<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\MaterialHasVariant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterialController extends Controller
{
    public function create()
    {
        return Inertia::render('Guest/CreateMaterial', [
            'materials' => Material::all(),
        ]);
    }

    public function show($id)
    {
        $material = Material::findOrFail($id);
        return Inertia::render('Guest/ShowMaterial', [
            'material' => $material,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'sub_description' => ['required', 'string'],
            'difficulty_level' => ['required', 'in:easy,medium,hard'],
            'learning_type' => ['required', 'in:text,illustration'],

            'chapters' => ['required', 'array', 'size:6'],
            'chapters.*.title' => ['required', 'string', 'max:255'],
            'chapters.*.content' => ['required', 'string'],
        ]);

        Material::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'sub_description' => $validated['sub_description'],
        ]);

        MaterialHasVariant::create([
            'material_id' => Material::latest()->first()->id,
            'difficulty_level' => $validated['difficulty_level'],
            'learning_type' => $validated['learning_type'],
        ]);

        foreach ($validated['chapters'] as $index => $chapter) {
            MaterialHasVariant::latest()->first()->chapters()->create([
                'title' => $chapter['title'],
                'content' => $chapter['content'],
                'order_number' => $index + 1,
            ]);
        }

        return redirect()
            ->route('materials.create')
            ->with('success', 'Materi berhasil ditambahkan.');
    }
}
