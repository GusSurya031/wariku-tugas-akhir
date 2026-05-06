<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['material_id', 'difficulty_level', 'learning_type'])]

class MaterialHasVariant extends Model
{
    use HasFactory;

    public function material()
    {
        return $this->belongsTo(Material::class);
    }

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }

    public function quizAttempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }

    public function userProgresses()
    {
        return $this->hasMany(UserMaterialProgress::class);
    }

    public function recommendations()
    {
        return $this->hasMany(RecommendationLog::class);
    }

}
