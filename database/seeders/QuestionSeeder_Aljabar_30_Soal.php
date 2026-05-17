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
        $material = Material::where('title', 'Aljabar')->first();

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
                    'question_text'      => 'Dalam bentuk aljabar 7x + 4, yang disebut variabel adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'x', 'is_correct' => true],
                        ['option_text' => '7', 'is_correct' => false],
                        ['option_text' => '4', 'is_correct' => false],
                        ['option_text' => '7x + 4', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dalam bentuk aljabar 5a - 9, angka 5 disebut sebagai...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Koefisien', 'is_correct' => true],
                        ['option_text' => 'Variabel', 'is_correct' => false],
                        ['option_text' => 'Konstanta', 'is_correct' => false],
                        ['option_text' => 'Suku tidak sejenis', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dalam bentuk aljabar 3x + 2y + 6, konstanta adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '6', 'is_correct' => true],
                        ['option_text' => '3', 'is_correct' => false],
                        ['option_text' => 'x', 'is_correct' => false],
                        ['option_text' => '2y', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Bentuk aljabar yang terdiri dari dua suku disebut...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Binomial', 'is_correct' => true],
                        ['option_text' => 'Monomial', 'is_correct' => false],
                        ['option_text' => 'Polinomial', 'is_correct' => false],
                        ['option_text' => 'Konstanta', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Manakah pasangan suku berikut yang merupakan suku sejenis?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '4x dan 9x', 'is_correct' => true],
                        ['option_text' => '4x dan 4y', 'is_correct' => false],
                        ['option_text' => '5x dan 5x²', 'is_correct' => false],
                        ['option_text' => '3ab dan 3a', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sederhanakan bentuk aljabar berikut: 3x + 5x = ...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '8x', 'is_correct' => true],
                        ['option_text' => '15x', 'is_correct' => false],
                        ['option_text' => '8x²', 'is_correct' => false],
                        ['option_text' => '2x', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sederhanakan bentuk aljabar berikut: 9y - 4y = ...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '5y', 'is_correct' => true],
                        ['option_text' => '13y', 'is_correct' => false],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '36y', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Hasil dari (2x + 3) + (4x + 5) adalah...',
                    'estimated_duration' => 75,
                    'options' => [
                        ['option_text' => '6x + 8', 'is_correct' => true],
                        ['option_text' => '6x + 15', 'is_correct' => false],
                        ['option_text' => '8x + 6', 'is_correct' => false],
                        ['option_text' => '2x + 8', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Hasil dari (8a + 7) - (3a + 2) adalah...',
                    'estimated_duration' => 75,
                    'options' => [
                        ['option_text' => '5a + 5', 'is_correct' => true],
                        ['option_text' => '11a + 9', 'is_correct' => false],
                        ['option_text' => '5a + 9', 'is_correct' => false],
                        ['option_text' => '11a + 5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika harga satu pensil adalah p rupiah, maka harga 6 pensil dapat ditulis dalam bentuk aljabar...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '6p', 'is_correct' => true],
                        ['option_text' => 'p + 6', 'is_correct' => false],
                        ['option_text' => 'p - 6', 'is_correct' => false],
                        ['option_text' => '6 / p', 'is_correct' => false],
                    ],
                ],
            ],

            'medium' => [
                [
                    'question_text'      => 'Sederhanakan bentuk berikut: 4x + 2y - x + 5y - 3 = ...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '3x + 7y - 3', 'is_correct' => true],
                        ['option_text' => '5x + 7y - 3', 'is_correct' => false],
                        ['option_text' => '3x + 3y - 3', 'is_correct' => false],
                        ['option_text' => '4x + 7y - 3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sederhanakan bentuk berikut: 6a + 3b - 2a + b + 5 = ...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '4a + 4b + 5', 'is_correct' => true],
                        ['option_text' => '8a + 4b + 5', 'is_correct' => false],
                        ['option_text' => '4a + 2b + 5', 'is_correct' => false],
                        ['option_text' => '6a + 4b + 3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Hasil penyederhanaan dari 3x² + 2x + x² - 5x + 4 adalah...',
                    'estimated_duration' => 100,
                    'options' => [
                        ['option_text' => '4x² - 3x + 4', 'is_correct' => true],
                        ['option_text' => '4x² + 7x + 4', 'is_correct' => false],
                        ['option_text' => '3x² - 3x + 4', 'is_correct' => false],
                        ['option_text' => '4x² + 3x + 4', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Hasil dari 3x(2x + 4) adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '6x² + 12x', 'is_correct' => true],
                        ['option_text' => '6x + 12', 'is_correct' => false],
                        ['option_text' => '5x² + 7x', 'is_correct' => false],
                        ['option_text' => '6x² + 4x', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Hasil dari (2x + 1)(3x + 4) adalah...',
                    'estimated_duration' => 100,
                    'options' => [
                        ['option_text' => '6x² + 11x + 4', 'is_correct' => true],
                        ['option_text' => '6x² + 8x + 4', 'is_correct' => false],
                        ['option_text' => '5x² + 11x + 4', 'is_correct' => false],
                        ['option_text' => '6x² + 11x + 5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Faktorkan bentuk aljabar berikut: 4x² + 8x = ...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '4x(x + 2)', 'is_correct' => true],
                        ['option_text' => '4(x + 2)', 'is_correct' => false],
                        ['option_text' => 'x(4x + 8x)', 'is_correct' => false],
                        ['option_text' => '8x(x + 4)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Faktorkan bentuk aljabar berikut: 6a + 9 = ...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '3(2a + 3)', 'is_correct' => true],
                        ['option_text' => '6(a + 9)', 'is_correct' => false],
                        ['option_text' => '9(a + 6)', 'is_correct' => false],
                        ['option_text' => '3(2a + 9)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Faktorkan bentuk selisih dua kuadrat berikut: 9y² - 16 = ...',
                    'estimated_duration' => 100,
                    'options' => [
                        ['option_text' => '(3y + 4)(3y - 4)', 'is_correct' => true],
                        ['option_text' => '(9y + 4)(y - 4)', 'is_correct' => false],
                        ['option_text' => '(3y + 8)(3y - 8)', 'is_correct' => false],
                        ['option_text' => '(y + 4)(y - 4)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Faktorkan bentuk kuadrat sempurna berikut: x² + 6x + 9 = ...',
                    'estimated_duration' => 100,
                    'options' => [
                        ['option_text' => '(x + 3)²', 'is_correct' => true],
                        ['option_text' => '(x - 3)²', 'is_correct' => false],
                        ['option_text' => '(x + 6)²', 'is_correct' => false],
                        ['option_text' => '(x + 9)²', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Faktorkan bentuk berikut: x² - 10x + 25 = ...',
                    'estimated_duration' => 100,
                    'options' => [
                        ['option_text' => '(x - 5)²', 'is_correct' => true],
                        ['option_text' => '(x + 5)²', 'is_correct' => false],
                        ['option_text' => '(x - 10)²', 'is_correct' => false],
                        ['option_text' => '(x - 25)²', 'is_correct' => false],
                    ],
                ],
            ],

            'hard' => [
                [
                    'question_text'      => 'Sederhanakan pecahan bentuk aljabar berikut: 4x / 8 = ...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'x / 2', 'is_correct' => true],
                        ['option_text' => 'x / 4', 'is_correct' => false],
                        ['option_text' => '4 / x', 'is_correct' => false],
                        ['option_text' => '2x', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sederhanakan pecahan bentuk aljabar berikut: (2x² + 4x) / 2x = ...',
                    'estimated_duration' => 130,
                    'options' => [
                        ['option_text' => 'x + 2', 'is_correct' => true],
                        ['option_text' => '2x + 4', 'is_correct' => false],
                        ['option_text' => 'x² + 2x', 'is_correct' => false],
                        ['option_text' => '2x(x + 2)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sederhanakan pecahan bentuk aljabar berikut: (x² - 4) / (x + 2) = ...',
                    'estimated_duration' => 150,
                    'options' => [
                        ['option_text' => 'x - 2', 'is_correct' => true],
                        ['option_text' => 'x + 2', 'is_correct' => false],
                        ['option_text' => 'x² - 2', 'is_correct' => false],
                        ['option_text' => 'x - 4', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Hasil dari 2/x + 3/x adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '5/x', 'is_correct' => true],
                        ['option_text' => '6/x', 'is_correct' => false],
                        ['option_text' => '5/2x', 'is_correct' => false],
                        ['option_text' => 'x/5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Hasil dari 7/a - 2/a adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '5/a', 'is_correct' => true],
                        ['option_text' => '9/a', 'is_correct' => false],
                        ['option_text' => '5/2a', 'is_correct' => false],
                        ['option_text' => 'a/5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Hasil dari (x/3) × (6/y) adalah...',
                    'estimated_duration' => 130,
                    'options' => [
                        ['option_text' => '2x/y', 'is_correct' => true],
                        ['option_text' => '6x/3y', 'is_correct' => false],
                        ['option_text' => 'x/18y', 'is_correct' => false],
                        ['option_text' => '3x/6y', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Hasil dari (a/4) ÷ (2/b) adalah...',
                    'estimated_duration' => 150,
                    'options' => [
                        ['option_text' => 'ab/8', 'is_correct' => true],
                        ['option_text' => '2a/4b', 'is_correct' => false],
                        ['option_text' => 'a/8b', 'is_correct' => false],
                        ['option_text' => '4ab/2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika harga sebuah buku adalah x rupiah dan Andi membeli 3 buku dengan uang Rp50.000, bentuk aljabar untuk uang kembalian Andi adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '50.000 - 3x', 'is_correct' => true],
                        ['option_text' => '50.000 + 3x', 'is_correct' => false],
                        ['option_text' => '3x - 50.000', 'is_correct' => false],
                        ['option_text' => '50.000 / 3x', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Panjang persegi panjang adalah (x + 3) cm dan lebarnya x cm. Keliling persegi panjang tersebut adalah...',
                    'estimated_duration' => 150,
                    'options' => [
                        ['option_text' => '4x + 6', 'is_correct' => true],
                        ['option_text' => '2x + 3', 'is_correct' => false],
                        ['option_text' => 'x² + 3x', 'is_correct' => false],
                        ['option_text' => '4x + 3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika umur Ani adalah a tahun dan umur ibu adalah 3 kali umur Ani ditambah 5 tahun, maka bentuk aljabar umur ibu adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '3a + 5', 'is_correct' => true],
                        ['option_text' => '3a - 5', 'is_correct' => false],
                        ['option_text' => 'a + 3 + 5', 'is_correct' => false],
                        ['option_text' => '5a + 3', 'is_correct' => false],
                    ],
                ],
            ],

            default => [],
        };
    }
}
