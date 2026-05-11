<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $material = Material::where('title', 'Aljabar Dasar')->first();
        if (!$material) {
            return;
        }

        $variants = $material->variantMaterials()->get()->groupBy('difficulty_level');

        foreach (['easy', 'medium', 'hard'] as $difficulty) {
            $questionSet = $this->questions($difficulty);
            foreach ($variants->get($difficulty, collect()) as $variant) {
                foreach ($questionSet as $qData) {
                    $question = Question::create([
                        'material_has_variant_id' => $variant->id,
                        'question_text'           => $qData['question_text'],
                        'difficulty_level'        => $difficulty,
                        'estimated_duration'      => $qData['estimated_duration'],
                    ]);

                    foreach ($qData['options'] as $opt) {
                        QuestionOption::create([
                            'question_id' => $question->id,
                            'option_text' => $opt['option_text'],
                            'is_correct'  => $opt['is_correct'],
                        ]);
                    }
                }
            }
        }
    }

    private function questions(string $difficulty): array
    {
        return match ($difficulty) {
            'easy' => [
                [
                    'question_text'      => 'Jika x = 5, berapa nilai dari 2x + 3?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '13', 'is_correct' => true],
                        ['option_text' => '10', 'is_correct' => false],
                        ['option_text' => '8',  'is_correct' => false],
                        ['option_text' => '15', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan: y − 4 = 10. Berapa nilai y?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '14', 'is_correct' => true],
                        ['option_text' => '6',  'is_correct' => false],
                        ['option_text' => '10', 'is_correct' => false],
                        ['option_text' => '16', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Berapa nilai z jika 3z = 21?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '7', 'is_correct' => true],
                        ['option_text' => '6', 'is_correct' => false],
                        ['option_text' => '8', 'is_correct' => false],
                        ['option_text' => '9', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika a = 3, berapa nilai 4a − 2?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '10', 'is_correct' => true],
                        ['option_text' => '12', 'is_correct' => false],
                        ['option_text' => '8',  'is_correct' => false],
                        ['option_text' => '14', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sederhanakan: 5x − 2x = ?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '3x', 'is_correct' => true],
                        ['option_text' => '7x', 'is_correct' => false],
                        ['option_text' => '2x', 'is_correct' => false],
                        ['option_text' => '5x', 'is_correct' => false],
                    ],
                ],
            ],

            'medium' => [
                [
                    'question_text'      => 'Selesaikan: 2x + 5 = 15. Berapa nilai x?',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '5', 'is_correct' => true],
                        ['option_text' => '10', 'is_correct' => false],
                        ['option_text' => '3',  'is_correct' => false],
                        ['option_text' => '7',  'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika 3y − 6 = 9, berapa nilai y?',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '5', 'is_correct' => true],
                        ['option_text' => '3', 'is_correct' => false],
                        ['option_text' => '7', 'is_correct' => false],
                        ['option_text' => '4', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Tentukan nilai x: 5x − 3 = 2x + 9',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '4', 'is_correct' => true],
                        ['option_text' => '3', 'is_correct' => false],
                        ['option_text' => '2', 'is_correct' => false],
                        ['option_text' => '6', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Faktorkan: x² + 5x + 6',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '(x + 2)(x + 3)', 'is_correct' => true],
                        ['option_text' => '(x + 1)(x + 6)', 'is_correct' => false],
                        ['option_text' => '(x + 2)(x + 4)', 'is_correct' => false],
                        ['option_text' => '(x + 3)(x + 4)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Berapa nilai x (positif) jika x² − 9 = 0?',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '3', 'is_correct' => true],
                        ['option_text' => '9', 'is_correct' => false],
                        ['option_text' => '6', 'is_correct' => false],
                        ['option_text' => '4', 'is_correct' => false],
                    ],
                ],
            ],

            'hard' => [
                [
                    'question_text'      => 'Sistem persamaan: x + y = 10, x − y = 2. Berapa nilai x?',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '6', 'is_correct' => true],
                        ['option_text' => '8', 'is_correct' => false],
                        ['option_text' => '4', 'is_correct' => false],
                        ['option_text' => '5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sederhanakan: (2x + 3)(x − 4)',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '2x² − 5x − 12', 'is_correct' => true],
                        ['option_text' => '2x² + 5x − 12', 'is_correct' => false],
                        ['option_text' => '2x² − 5x + 12', 'is_correct' => false],
                        ['option_text' => '2x² + 5x + 12', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Akar-akar persamaan x² − 5x + 6 = 0 adalah…',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'x = 2 dan x = 3',  'is_correct' => true],
                        ['option_text' => 'x = 1 dan x = 6',  'is_correct' => false],
                        ['option_text' => 'x = 2 dan x = 4',  'is_correct' => false],
                        ['option_text' => 'x = −2 dan x = −3','is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika f(x) = 2x² − 3x + 1, berapakah nilai f(3)?',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '10', 'is_correct' => true],
                        ['option_text' => '8',  'is_correct' => false],
                        ['option_text' => '12', 'is_correct' => false],
                        ['option_text' => '16', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan: |2x − 5| = 7. Nilai x yang mungkin adalah…',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'x = 6 atau x = −1', 'is_correct' => true],
                        ['option_text' => 'x = 6 atau x = 1',  'is_correct' => false],
                        ['option_text' => 'x = 7 atau x = −1', 'is_correct' => false],
                        ['option_text' => 'x = 4 atau x = −1', 'is_correct' => false],
                    ],
                ],
            ],

            default => [],
        };
    }
}
