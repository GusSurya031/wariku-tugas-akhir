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
                'rule_type'                  => 'first_login',
                'rule_code'                  => 'FL_001',
                'mood_value'                 => 3,
                'catur_bekel_values'         => ['guru', 'ratu'],
                'recommended_content_type'   => 'text',
                'recommended_difficulty'     => 'hard',
                'description'               => 'Mood positif (3) + catur bekel guru/ratu → materi teks, bobot tinggi',
                'priority'                   => 1,
                'is_active'                  => true,
            ],
            [
                'rule_type'                  => 'first_login',
                'rule_code'                  => 'FL_002',
                'mood_value'                 => 3,
                'catur_bekel_values'         => ['lara', 'pati'],
                'recommended_content_type'   => 'text',
                'recommended_difficulty'     => 'medium',
                'description'               => 'Mood positif (3) + catur bekel lara/pati → materi teks, bobot sedang',
                'priority'                   => 2,
                'is_active'                  => true,
            ],
            [
                'rule_type'                  => 'first_login',
                'rule_code'                  => 'FL_003',
                'mood_value'                 => 1,
                'catur_bekel_values'         => ['guru', 'ratu'],
                'recommended_content_type'   => 'illustration',
                'recommended_difficulty'     => 'medium',
                'description'               => 'Mood negatif (1) + catur bekel guru/ratu → materi ilustrasi, bobot sedang',
                'priority'                   => 3,
                'is_active'                  => true,
            ],
            [
                'rule_type'                  => 'first_login',
                'rule_code'                  => 'FL_004',
                'mood_value'                 => 1,
                'catur_bekel_values'         => ['lara', 'pati'],
                'recommended_content_type'   => 'illustration',
                'recommended_difficulty'     => 'easy',
                'description'               => 'Mood negatif (1) + catur bekel lara/pati → materi ilustrasi, bobot mudah',
                'priority'                   => 4,
                'is_active'                  => true,
            ],
            [
                'rule_type'                  => 'first_login',
                'rule_code'                  => 'FL_005',
                'mood_value'                 => 2,
                'catur_bekel_values'         => ['guru', 'ratu', 'lara', 'pati'],
                'recommended_content_type'   => 'random',
                'recommended_difficulty'     => 'medium',
                'description'               => 'Mood netral (2) + catur bekel apapun → materi acak, bobot sedang',
                'priority'                   => 5,
                'is_active'                  => true,
            ],
        ];

        foreach ($rules as $rule) {
            RecommendationRule::updateOrCreate(
                ['rule_code' => $rule['rule_code']],
                $rule
            );
        }
    }
}