<?php

namespace Database\Seeders;

use App\Models\RecommendationRule;
use Illuminate\Database\Seeder;

class RecommendationRuleSeeder extends Seeder
{
    public function run(): void
    {
        $rules = [
            [
                'rule_code'                  => 'FL_001',
                'mood_value'                 => 3,
                'catur_bekel_values'         => ['guru', 'ratu'],
                'recommended_content_type'   => 'text',
                'recommended_difficulty'     => 'hard',
                'theme_day_offset'           => 'current',
                'description'               => 'Mood positif (3) + catur bekel guru/ratu → teks, bobot tinggi, tema hari login',
                'priority'                   => 1,
            ],
            [
                'rule_code'                  => 'FL_002',
                'mood_value'                 => 3,
                'catur_bekel_values'         => ['lara', 'pati'],
                'recommended_content_type'   => 'text',
                'recommended_difficulty'     => 'medium',
                'theme_day_offset'           => 'next',
                'description'               => 'Mood positif (3) + catur bekel lara/pati → teks, bobot sedang, tema hari esok',
                'priority'                   => 2,
            ],
            [
                'rule_code'                  => 'FL_003',
                'mood_value'                 => 1,
                'catur_bekel_values'         => ['guru', 'ratu'],
                'recommended_content_type'   => 'illustration',
                'recommended_difficulty'     => 'medium',
                'theme_day_offset'           => 'current',
                'description'               => 'Mood negatif (1) + catur bekel guru/ratu → ilustrasi, bobot sedang, tema hari login',
                'priority'                   => 3,
            ],
            [
                'rule_code'                  => 'FL_004',
                'mood_value'                 => 1,
                'catur_bekel_values'         => ['lara', 'pati'],
                'recommended_content_type'   => 'illustration',
                'recommended_difficulty'     => 'easy',
                'theme_day_offset'           => 'next',
                'description'               => 'Mood negatif (1) + catur bekel lara/pati → ilustrasi, bobot mudah, tema hari esok',
                'priority'                   => 4,
            ],
            [
                'rule_code'                  => 'FL_005',
                'mood_value'                 => 2,
                'catur_bekel_values'         => ['guru', 'ratu'],
                'recommended_content_type'   => 'random',
                'recommended_difficulty'     => 'medium',
                'theme_day_offset'           => 'current',
                'description'               => 'Mood netral (2) + catur bekel guru/ratu → materi acak, bobot sedang, tema hari login',
                'priority'                   => 5,
            ],
            [
                'rule_code'                  => 'FL_006',
                'mood_value'                 => 2,
                'catur_bekel_values'         => ['lara', 'pati'],
                'recommended_content_type'   => 'random',
                'recommended_difficulty'     => 'medium',
                'theme_day_offset'           => 'next',
                'description'               => 'Mood netral (2) + catur bekel lara/pati → materi acak, bobot sedang, tema hari esok',
                'priority'                   => 6,
            ],
        ];

        foreach ($rules as $rule) {
            RecommendationRule::updateOrCreate(
                ['rule_code' => $rule['rule_code']],
                [
                    ...$rule,
                    'rule_type'                   => 'first_login',
                    'recommended_quiz_difficulty' => null,
                    'performance_cluster'         => null,
                    'is_active'                   => true,
                ]
            );
        }
    }
}
