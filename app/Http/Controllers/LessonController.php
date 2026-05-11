<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function index()
    {
        $user        = Auth::user();
        $userProfile = $user->userProfile;

        // All materials for the exploration section
        $allMaterials = Material::all()
            ->map(fn($m) => [
                'id'          => $m->id,
                'title'       => $m->title,
                'description' => $m->description,
                'topic'       => $m->topic,
            ])
            ->values();

        return Inertia::render('Auth/Lesson', [
            'auth' => [
                'user' => [
                    'name'     => $user->username,
                    'fullname' => $user->fullname,
                ],
            ],
            'allMaterials' => $allMaterials,
        ]);
    }

    public function show($id)
    {
        $material = Material::findOrFail($id);
        $user        = Auth::user();


        return Inertia::render('Auth/ChapterLesson', [
            'material' => [
                'id'          => $material->id,
                'title'       => $material->title,
                'description' => $material->description,
                'topic'       => $material->topic,
                'content'     => $material->content,
            ],
            'auth' => [
                'user' => [
                    'name'     => $user->username,
                    'fullname' => $user->fullname,
                ],
            ],
        ]);
    }
}
