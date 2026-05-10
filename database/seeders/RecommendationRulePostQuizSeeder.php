<?php

namespace Database\Seeders;

use App\Models\RecommendationRule;
use Illuminate\Database\Seeder;

class RecommendationRulePostQuizSeeder extends Seeder
{
    public function run(): void
    {
        $rules = [
            // mood=3, catur_bekel=guru/ratu
            [
                'rule_code'                   => 'PQ_001',
                'performance_cluster'         => 'A',
                'mood_value'                  => 3,
                'catur_bekel_values'          => ['guru', 'ratu'],
                'recommended_content_type'    => 'text',
                'recommended_difficulty'      => 'medium',
                'recommended_quiz_difficulty' => 'mix_medium',
                'description'                => 'Kluster A + mood positif (3) + catur bekel guru/ratu → teks, bobot medium, soal mix_medium',
                'priority'                    => 1,
            ],
            [
                'rule_code'                   => 'PQ_002',
                'performance_cluster'         => 'B',
                'mood_value'                  => 3,
                'catur_bekel_values'          => ['guru', 'ratu'],
                'recommended_content_type'    => 'text',
                'recommended_difficulty'      => 'hard',
                'recommended_quiz_difficulty' => 'mix_hard',
                'description'                => 'Kluster B + mood positif (3) + catur bekel guru/ratu → teks, bobot hard, soal mix_hard',
                'priority'                    => 2,
            ],
            [
                'rule_code'                   => 'PQ_003',
                'performance_cluster'         => 'C',
                'mood_value'                  => 3,
                'catur_bekel_values'          => ['guru', 'ratu'],
                'recommended_content_type'    => 'text',
                'recommended_difficulty'      => 'hard',
                'recommended_quiz_difficulty' => 'hard',
                'description'                => 'Kluster C + mood positif (3) + catur bekel guru/ratu → teks, bobot hard, soal hard',
                'priority'                    => 3,
            ],

            // mood=3, catur_bekel=lara/pati
            [
                'rule_code'                   => 'PQ_004',
                'performance_cluster'         => 'A',
                'mood_value'                  => 3,
                'catur_bekel_values'          => ['lara', 'pati'],
                'recommended_content_type'    => 'text',
                'recommended_difficulty'      => 'easy',
                'recommended_quiz_difficulty' => 'easy',
                'description'                => 'Kluster A + mood positif (3) + catur bekel lara/pati → teks, bobot easy, soal easy',
                'priority'                    => 4,
            ],
            [
                'rule_code'                   => 'PQ_005',
                'performance_cluster'         => 'B',
                'mood_value'                  => 3,
                'catur_bekel_values'          => ['lara', 'pati'],
                'recommended_content_type'    => 'text',
                'recommended_difficulty'      => 'medium',
                'recommended_quiz_difficulty' => 'medium',
                'description'                => 'Kluster B + mood positif (3) + catur bekel lara/pati → teks, bobot medium, soal medium',
                'priority'                    => 5,
            ],
            [
                'rule_code'                   => 'PQ_006',
                'performance_cluster'         => 'C',
                'mood_value'                  => 3,
                'catur_bekel_values'          => ['lara', 'pati'],
                'recommended_content_type'    => 'text',
                'recommended_difficulty'      => 'hard',
                'recommended_quiz_difficulty' => 'mix_medium',
                'description'                => 'Kluster C + mood positif (3) + catur bekel lara/pati → teks, bobot hard, soal mix_medium',
                'priority'                    => 6,
            ],

            // mood=1, catur_bekel=guru/ratu
            [
                'rule_code'                   => 'PQ_007',
                'performance_cluster'         => 'A',
                'mood_value'                  => 1,
                'catur_bekel_values'          => ['guru', 'ratu'],
                'recommended_content_type'    => 'illustration',
                'recommended_difficulty'      => 'easy',
                'recommended_quiz_difficulty' => 'easy',
                'description'                => 'Kluster A + mood negatif (1) + catur bekel guru/ratu → ilustrasi, bobot easy, soal easy',
                'priority'                    => 7,
            ],
            [
                'rule_code'                   => 'PQ_008',
                'performance_cluster'         => 'B',
                'mood_value'                  => 1,
                'catur_bekel_values'          => ['guru', 'ratu'],
                'recommended_content_type'    => 'illustration',
                'recommended_difficulty'      => 'medium',
                'recommended_quiz_difficulty' => 'mix_medium',
                'description'                => 'Kluster B + mood negatif (1) + catur bekel guru/ratu → ilustrasi, bobot medium, soal mix_medium',
                'priority'                    => 8,
            ],
            [
                'rule_code'                   => 'PQ_009',
                'performance_cluster'         => 'C',
                'mood_value'                  => 1,
                'catur_bekel_values'          => ['guru', 'ratu'],
                'recommended_content_type'    => 'illustration',
                'recommended_difficulty'      => 'medium',
                'recommended_quiz_difficulty' => 'mix_hard',
                'description'                => 'Kluster C + mood negatif (1) + catur bekel guru/ratu → ilustrasi, bobot medium, soal mix_hard',
                'priority'                    => 9,
            ],

            // mood=1, catur_bekel=lara/pati
            [
                'rule_code'                   => 'PQ_010',
                'performance_cluster'         => 'A',
                'mood_value'                  => 1,
                'catur_bekel_values'          => ['lara', 'pati'],
                'recommended_content_type'    => 'illustration',
                'recommended_difficulty'      => 'easy',
                'recommended_quiz_difficulty' => 'easy',
                'description'                => 'Kluster A + mood negatif (1) + catur bekel lara/pati → ilustrasi, bobot easy, soal easy',
                'priority'                    => 10,
            ],
            [
                'rule_code'                   => 'PQ_011',
                'performance_cluster'         => 'B',
                'mood_value'                  => 1,
                'catur_bekel_values'          => ['lara', 'pati'],
                'recommended_content_type'    => 'illustration',
                'recommended_difficulty'      => 'easy',
                'recommended_quiz_difficulty' => 'mix_medium',
                'description'                => 'Kluster B + mood negatif (1) + catur bekel lara/pati → ilustrasi, bobot easy, soal mix_medium',
                'priority'                    => 11,
            ],
            [
                'rule_code'                   => 'PQ_012',
                'performance_cluster'         => 'C',
                'mood_value'                  => 1,
                'catur_bekel_values'          => ['lara', 'pati'],
                'recommended_content_type'    => 'illustration',
                'recommended_difficulty'      => 'medium',
                'recommended_quiz_difficulty' => 'medium',
                'description'                => 'Kluster C + mood negatif (1) + catur bekel lara/pati → ilustrasi, bobot medium, soal medium',
                'priority'                    => 12,
            ],

            // mood=2, catur_bekel=any
            [
                'rule_code'                   => 'PQ_013',
                'performance_cluster'         => 'A',
                'mood_value'                  => 2,
                'catur_bekel_values'          => ['guru', 'ratu', 'lara', 'pati'],
                'recommended_content_type'    => 'random',
                'recommended_difficulty'      => 'easy',
                'recommended_quiz_difficulty' => 'easy',
                'description'                => 'Kluster A + mood netral (2) + catur bekel apapun → acak, bobot easy, soal easy',
                'priority'                    => 13,
            ],
            [
                'rule_code'                   => 'PQ_014',
                'performance_cluster'         => 'B',
                'mood_value'                  => 2,
                'catur_bekel_values'          => ['guru', 'ratu', 'lara', 'pati'],
                'recommended_content_type'    => 'random',
                'recommended_difficulty'      => 'medium',
                'recommended_quiz_difficulty' => 'medium',
                'description'                => 'Kluster B + mood netral (2) + catur bekel apapun → acak, bobot medium, soal medium',
                'priority'                    => 14,
            ],
            [
                'rule_code'                   => 'PQ_015',
                'performance_cluster'         => 'C',
                'mood_value'                  => 2,
                'catur_bekel_values'          => ['guru', 'ratu', 'lara', 'pati'],
                'recommended_content_type'    => 'random',
                'recommended_difficulty'      => 'hard',
                'recommended_quiz_difficulty' => 'hard',
                'description'                => 'Kluster C + mood netral (2) + catur bekel apapun → acak, bobot hard, soal hard',
                'priority'                    => 15,
            ],
        ];

        foreach ($rules as $rule) {
            RecommendationRule::updateOrCreate(
                ['rule_code' => $rule['rule_code']],
                array_merge($rule, ['rule_type' => 'post_quiz', 'is_active' => true])
            );
        }
    }
}