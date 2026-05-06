<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


#[Fillable(['user_id', 'material_has_variant_id', 'mood_label', 'mood_level', 'wariga_characteristic', 'user_learning_type', 'user_difficulty', 'final_learning_type', 'final_difficulty', 'reason'])]

class RecommendationLog extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function materialHasVariant()
    {
        return $this->belongsTo(MaterialHasVariant::class);
    }
}
