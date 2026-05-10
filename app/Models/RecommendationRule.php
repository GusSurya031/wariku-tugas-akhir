<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'rule_type',
    'rule_code',
    'mood_level',
    'mood_value',
    'catur_bekel_values',
    'performance_cluster',
    'recommended_content_type',
    'recommended_difficulty',
    'recommended_quiz_difficulty',
    'description',
    'priority',
    'is_active',
])]

class RecommendationRule extends Model
{
    use HasFactory;

    protected $casts = [
        'catur_bekel_values' => 'array',
        'is_active'          => 'boolean',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeFirstLogin(Builder $query): Builder
    {
        return $query->where('rule_type', 'first_login');
    }

    public function scopePostQuiz(Builder $query): Builder
    {
        return $query->where('rule_type', 'post_quiz');
    }
}
