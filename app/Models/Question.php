<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


#[Fillable(['material_has_variant_id','question_text', 'difficulty_level', 'estimated_duration'])]


class Question extends Model
{
    use HasFactory;

    public function variantMaterial()
    {
        return $this->belongsTo(MaterialHasVariant::class, 'material_has_variant_id');
    }


    public function options()
    {
        return $this->hasMany(QuestionOption::class);
    }
}
