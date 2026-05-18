<?php

namespace Database\Seeders;
use App\Models\Material;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionPersamaanLinearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $material = Material::where('title', 'Persamaan Linear')->first();

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
                    'question_text'      => 'Manakah dari bentuk berikut yang termasuk persamaan?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'x + 5 = 12', 'is_correct' => true],
                        ['option_text' => '2x + 3', 'is_correct' => false],
                        ['option_text' => 'x > 7', 'is_correct' => false],
                        ['option_text' => '3x - 1', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Persamaan linear adalah persamaan yang pangkat tertinggi variabelnya adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '1', 'is_correct' => true],
                        ['option_text' => '2', 'is_correct' => false],
                        ['option_text' => '3', 'is_correct' => false],
                        ['option_text' => '0', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada persamaan 2x + 5 = 13, variabelnya adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'x', 'is_correct' => true],
                        ['option_text' => '2', 'is_correct' => false],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '13', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada persamaan 4x - 7 = 9, koefisien dari x adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '4', 'is_correct' => true],
                        ['option_text' => '-7', 'is_correct' => false],
                        ['option_text' => '9', 'is_correct' => false],
                        ['option_text' => 'x', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Manakah yang merupakan Persamaan Linear Satu Variabel (PLSV)?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '3x + 2 = 11', 'is_correct' => true],
                        ['option_text' => 'x + y = 10', 'is_correct' => false],
                        ['option_text' => 'x² + 2 = 6', 'is_correct' => false],
                        ['option_text' => '2x + 5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Solusi dari persamaan x + 3 = 8 adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'x = 5', 'is_correct' => true],
                        ['option_text' => 'x = 3', 'is_correct' => false],
                        ['option_text' => 'x = 8', 'is_correct' => false],
                        ['option_text' => 'x = 11', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika 3x = 12, maka nilai x adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '4', 'is_correct' => true],
                        ['option_text' => '3', 'is_correct' => false],
                        ['option_text' => '9', 'is_correct' => false],
                        ['option_text' => '12', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Bentuk umum Persamaan Linear Satu Variabel adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'ax + b = c', 'is_correct' => true],
                        ['option_text' => 'ax² + b = c', 'is_correct' => false],
                        ['option_text' => 'ax + by = c', 'is_correct' => false],
                        ['option_text' => 'x + y + z = c', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Persamaan x + 5 = 10 setara dengan persamaan...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'x = 5', 'is_correct' => true],
                        ['option_text' => 'x = 10', 'is_correct' => false],
                        ['option_text' => 'x = 15', 'is_correct' => false],
                        ['option_text' => 'x = -5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Manakah yang bukan persamaan linear?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'x² + 2x = 5', 'is_correct' => true],
                        ['option_text' => '2x = 10', 'is_correct' => false],
                        ['option_text' => 'x + 3 = 8', 'is_correct' => false],
                        ['option_text' => '2x - 5 = 11', 'is_correct' => false],
                    ],
                ],
            ],

            'medium' => [
                [
                    'question_text'      => 'Selesaikan persamaan: x + 5 = 12. Nilai x adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '7', 'is_correct' => true],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '12', 'is_correct' => false],
                        ['option_text' => '17', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan persamaan: 3x = 15. Nilai x adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '5', 'is_correct' => true],
                        ['option_text' => '3', 'is_correct' => false],
                        ['option_text' => '12', 'is_correct' => false],
                        ['option_text' => '18', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan persamaan: 2x - 7 = 5. Nilai x adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '6', 'is_correct' => true],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '7', 'is_correct' => false],
                        ['option_text' => '4', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan persamaan: 3x + 4 = x + 12. Nilai x adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '4', 'is_correct' => true],
                        ['option_text' => '3', 'is_correct' => false],
                        ['option_text' => '8', 'is_correct' => false],
                        ['option_text' => '16', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika x/2 = 5, maka nilai x adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '10', 'is_correct' => true],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '2', 'is_correct' => false],
                        ['option_text' => '7', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan persamaan: 3(x + 2) = 15. Nilai x adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '3', 'is_correct' => true],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '7', 'is_correct' => false],
                        ['option_text' => '9', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan persamaan: 2(x - 3) = 8. Nilai x adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '7', 'is_correct' => true],
                        ['option_text' => '4', 'is_correct' => false],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '11', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan persamaan: x/2 + x/3 = 5. Nilai x adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '6', 'is_correct' => true],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '10', 'is_correct' => false],
                        ['option_text' => '15', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Persamaan 2x + 3 = 2x + 5 termasuk kasus...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Tidak memiliki solusi', 'is_correct' => true],
                        ['option_text' => 'Solusi tak terbatas', 'is_correct' => false],
                        ['option_text' => 'Memiliki solusi x = 2', 'is_correct' => false],
                        ['option_text' => 'Memiliki solusi x = 5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Persamaan 2x + 3 = 2x + 3 termasuk kasus...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Solusi tak terbatas', 'is_correct' => true],
                        ['option_text' => 'Tidak memiliki solusi', 'is_correct' => false],
                        ['option_text' => 'Memiliki satu solusi saja', 'is_correct' => false],
                        ['option_text' => 'Bukan persamaan', 'is_correct' => false],
                    ],
                ],
            ],

            'hard' => [
                [
                    'question_text'      => 'Dua kali sebuah bilangan dikurangi 3 sama dengan bilangan itu ditambah 8. Bilangan tersebut adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '11', 'is_correct' => true],
                        ['option_text' => '8', 'is_correct' => false],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah bilangan jika ditambah 5 hasilnya 12. Bilangan tersebut adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '7', 'is_correct' => true],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '12', 'is_correct' => false],
                        ['option_text' => '17', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Umur Ani 3 tahun kurang dari umur Budi. Jumlah umur mereka 25 tahun. Umur Ani adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '11 tahun', 'is_correct' => true],
                        ['option_text' => '14 tahun', 'is_correct' => false],
                        ['option_text' => '12 tahun', 'is_correct' => false],
                        ['option_text' => '10 tahun', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Ibu membeli x jeruk seharga Rp2.000 per buah dan 5 apel seharga Rp3.000 per buah. Total belanja Rp31.000. Banyak jeruk yang dibeli adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '8 buah', 'is_correct' => true],
                        ['option_text' => '5 buah', 'is_correct' => false],
                        ['option_text' => '6 buah', 'is_correct' => false],
                        ['option_text' => '10 buah', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah persegi panjang memiliki panjang 2 cm lebih dari lebarnya. Jika kelilingnya 20 cm, maka lebarnya adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '4 cm', 'is_correct' => true],
                        ['option_text' => '6 cm', 'is_correct' => false],
                        ['option_text' => '8 cm', 'is_correct' => false],
                        ['option_text' => '10 cm', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Manakah yang merupakan Persamaan Linear Dua Variabel (PLDV)?',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '2x + 3y = 12', 'is_correct' => true],
                        ['option_text' => '3x + 2 = 11', 'is_correct' => false],
                        ['option_text' => 'x² + y = 10', 'is_correct' => false],
                        ['option_text' => '2x - 5 = 7', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pasangan terurut manakah yang menjadi solusi dari persamaan x + y = 5?',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '(2, 3)', 'is_correct' => true],
                        ['option_text' => '(2, 4)', 'is_correct' => false],
                        ['option_text' => '(5, 5)', 'is_correct' => false],
                        ['option_text' => '(1, 5)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Persamaan 2x + y = 10 jika diubah menjadi bentuk y dalam x adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'y = 10 - 2x', 'is_correct' => true],
                        ['option_text' => 'y = 2x - 10', 'is_correct' => false],
                        ['option_text' => 'y = 10 + 2x', 'is_correct' => false],
                        ['option_text' => 'y = (10 - x)/2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Perbedaan utama PLSV dan PLDV adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'PLSV memiliki satu variabel, sedangkan PLDV memiliki dua variabel', 'is_correct' => true],
                        ['option_text' => 'PLSV selalu memiliki dua variabel', 'is_correct' => false],
                        ['option_text' => 'PLDV tidak memiliki variabel', 'is_correct' => false],
                        ['option_text' => 'PLSV selalu berpangkat dua', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Diketahui persamaan 3x + y = 10. Jika x = 2, maka nilai y adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '4', 'is_correct' => true],
                        ['option_text' => '2', 'is_correct' => false],
                        ['option_text' => '6', 'is_correct' => false],
                        ['option_text' => '10', 'is_correct' => false],
                    ],
                ],
            ],

            default => [],
        };
    }
}
