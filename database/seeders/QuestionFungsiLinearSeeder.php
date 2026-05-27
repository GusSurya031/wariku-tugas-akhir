<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionFungsiLinearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $material = Material::where('title', 'Fungsi Linear / Garis Lurus')->first();

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
                    'question_text'      => 'Bentuk umum fungsi linear adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'f(x) = ax + b, dengan a ≠ 0', 'is_correct' => true],
                        ['option_text' => 'f(x) = ax² + b', 'is_correct' => false],
                        ['option_text' => 'f(x) = a/x + b', 'is_correct' => false],
                        ['option_text' => 'f(x) = a^x + b', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Manakah contoh fungsi linear?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'f(x) = 2x + 3', 'is_correct' => true],
                        ['option_text' => 'f(x) = x² + 1', 'is_correct' => false],
                        ['option_text' => 'f(x) = 1/x', 'is_correct' => false],
                        ['option_text' => 'f(x) = 2^x', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada fungsi f(x) = 4x - 7, nilai gradiennya adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '4', 'is_correct' => true],
                        ['option_text' => '-7', 'is_correct' => false],
                        ['option_text' => '7', 'is_correct' => false],
                        ['option_text' => '-4', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada fungsi y = 3x + 5, titik potong dengan sumbu y adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '(0, 5)', 'is_correct' => true],
                        ['option_text' => '(5, 0)', 'is_correct' => false],
                        ['option_text' => '(0, 3)', 'is_correct' => false],
                        ['option_text' => '(3, 0)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika gradien fungsi linear bernilai positif, maka grafiknya...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Naik dari kiri ke kanan', 'is_correct' => true],
                        ['option_text' => 'Turun dari kiri ke kanan', 'is_correct' => false],
                        ['option_text' => 'Selalu horizontal', 'is_correct' => false],
                        ['option_text' => 'Selalu vertikal', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Persamaan y = 2x + 3 termasuk bentuk...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Eksplisit atau slope-intercept', 'is_correct' => true],
                        ['option_text' => 'Implisit', 'is_correct' => false],
                        ['option_text' => 'Intercept', 'is_correct' => false],
                        ['option_text' => 'Two-point', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dalam bentuk y = ax + b, huruf b menyatakan...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Titik potong sumbu y', 'is_correct' => true],
                        ['option_text' => 'Titik potong sumbu x', 'is_correct' => false],
                        ['option_text' => 'Variabel bebas', 'is_correct' => false],
                        ['option_text' => 'Koefisien y', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Persamaan 2x - y + 3 = 0 termasuk bentuk persamaan garis...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Implisit', 'is_correct' => true],
                        ['option_text' => 'Eksplisit', 'is_correct' => false],
                        ['option_text' => 'Point-slope', 'is_correct' => false],
                        ['option_text' => 'Intercept', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Manakah yang BUKAN fungsi linear?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'f(x) = 2x² + 1', 'is_correct' => true],
                        ['option_text' => 'f(x) = -3x + 5', 'is_correct' => false],
                        ['option_text' => 'f(x) = x - 2', 'is_correct' => false],
                        ['option_text' => 'f(x) = 4x', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Garis y = -2x + 6 memiliki arah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Turun dari kiri ke kanan', 'is_correct' => true],
                        ['option_text' => 'Naik dari kiri ke kanan', 'is_correct' => false],
                        ['option_text' => 'Horizontal', 'is_correct' => false],
                        ['option_text' => 'Vertikal', 'is_correct' => false],
                    ],
                ],
            ],

            'medium' => [
                [
                    'question_text'      => 'Tentukan gradien garis yang melalui titik (1, 2) dan (3, 6).',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '2', 'is_correct' => true],
                        ['option_text' => '4', 'is_correct' => false],
                        ['option_text' => '1', 'is_correct' => false],
                        ['option_text' => '-2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Tentukan gradien garis yang melalui titik (2, 5) dan (4, 1).',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '-2', 'is_correct' => true],
                        ['option_text' => '2', 'is_correct' => false],
                        ['option_text' => '-4', 'is_correct' => false],
                        ['option_text' => '4', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Gradien dari persamaan 2x - y + 5 = 0 adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '2', 'is_correct' => true],
                        ['option_text' => '-2', 'is_correct' => false],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '-5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Gradien dari persamaan x + 2y - 4 = 0 adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '-1/2', 'is_correct' => true],
                        ['option_text' => '1/2', 'is_correct' => false],
                        ['option_text' => '-2', 'is_correct' => false],
                        ['option_text' => '2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dua garis dikatakan sejajar jika...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Gradiennya sama', 'is_correct' => true],
                        ['option_text' => 'Gradiennya saling berkebalikan negatif', 'is_correct' => false],
                        ['option_text' => 'Titik potong sumbu y sama', 'is_correct' => false],
                        ['option_text' => 'Selalu melalui titik asal', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Garis yang sejajar dengan y = 3x - 2 memiliki gradien...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '3', 'is_correct' => true],
                        ['option_text' => '-3', 'is_correct' => false],
                        ['option_text' => '1/3', 'is_correct' => false],
                        ['option_text' => '-1/3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika sebuah garis memiliki gradien 4, maka gradien garis yang tegak lurus dengannya adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '-1/4', 'is_correct' => true],
                        ['option_text' => '1/4', 'is_correct' => false],
                        ['option_text' => '4', 'is_correct' => false],
                        ['option_text' => '-4', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Tentukan titik potong garis y = 2x + 1 dan y = -x + 4.',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '(1, 3)', 'is_correct' => true],
                        ['option_text' => '(3, 1)', 'is_correct' => false],
                        ['option_text' => '(2, 5)', 'is_correct' => false],
                        ['option_text' => '(0, 4)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Garis y = 2x + 1 dan y = 2x - 3 memiliki hubungan...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Sejajar', 'is_correct' => true],
                        ['option_text' => 'Tegak lurus', 'is_correct' => false],
                        ['option_text' => 'Berimpit', 'is_correct' => false],
                        ['option_text' => 'Membentuk garis vertikal', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Garis y = 2x + 1 dan y = -0,5x + 3 memiliki hubungan...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Tegak lurus', 'is_correct' => true],
                        ['option_text' => 'Sejajar', 'is_correct' => false],
                        ['option_text' => 'Berimpit', 'is_correct' => false],
                        ['option_text' => 'Tidak berpotongan', 'is_correct' => false],
                    ],
                ],
            ],

            'hard' => [
                [
                    'question_text'      => 'Tentukan persamaan garis dengan gradien 3 yang melalui titik (2, 5).',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'y = 3x - 1', 'is_correct' => true],
                        ['option_text' => 'y = 3x + 1', 'is_correct' => false],
                        ['option_text' => 'y = 2x + 3', 'is_correct' => false],
                        ['option_text' => 'y = 5x - 3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Tentukan persamaan garis dengan gradien -2 yang melalui titik (-1, 4).',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'y = -2x + 2', 'is_correct' => true],
                        ['option_text' => 'y = -2x - 2', 'is_correct' => false],
                        ['option_text' => 'y = 2x + 2', 'is_correct' => false],
                        ['option_text' => 'y = 2x - 2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Tentukan persamaan garis yang melalui titik (1, 3) dan (3, 7).',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'y = 2x + 1', 'is_correct' => true],
                        ['option_text' => 'y = 2x - 1', 'is_correct' => false],
                        ['option_text' => 'y = x + 2', 'is_correct' => false],
                        ['option_text' => 'y = 3x + 1', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Tentukan persamaan garis yang melalui titik (2, -1) dan (4, 3).',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'y = 2x - 5', 'is_correct' => true],
                        ['option_text' => 'y = 2x + 5', 'is_correct' => false],
                        ['option_text' => 'y = -2x + 5', 'is_correct' => false],
                        ['option_text' => 'y = x - 3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Tentukan persamaan garis yang sejajar dengan y = 2x - 3 dan melalui titik (1, 4).',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'y = 2x + 2', 'is_correct' => true],
                        ['option_text' => 'y = 2x - 2', 'is_correct' => false],
                        ['option_text' => 'y = -2x + 6', 'is_correct' => false],
                        ['option_text' => 'y = -1/2x + 9/2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Tentukan persamaan garis yang tegak lurus dengan y = 2x - 3 dan melalui titik (1, 4).',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'y = -1/2x + 9/2', 'is_correct' => true],
                        ['option_text' => 'y = 2x + 2', 'is_correct' => false],
                        ['option_text' => 'y = -2x + 6', 'is_correct' => false],
                        ['option_text' => 'y = 1/2x + 7/2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Grafik fungsi f(x) = 2x + 1 memotong sumbu x di titik...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '(-1/2, 0)', 'is_correct' => true],
                        ['option_text' => '(0, 1)', 'is_correct' => false],
                        ['option_text' => '(1, 3)', 'is_correct' => false],
                        ['option_text' => '(1/2, 0)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah pabrik memiliki biaya tetap Rp 2.000.000 dan biaya produksi Rp 10.000 per unit. Fungsi biaya total untuk x unit adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'C(x) = 2.000.000 + 10.000x', 'is_correct' => true],
                        ['option_text' => 'C(x) = 10.000 + 2.000.000x', 'is_correct' => false],
                        ['option_text' => 'C(x) = 2.000.000x + 10.000', 'is_correct' => false],
                        ['option_text' => 'C(x) = 2.010.000x', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika d(t) = 10 + 60t menyatakan jarak mobil dari kota setelah t jam, maka jarak mobil setelah 2 jam adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '130 km', 'is_correct' => true],
                        ['option_text' => '120 km', 'is_correct' => false],
                        ['option_text' => '70 km', 'is_correct' => false],
                        ['option_text' => '60 km', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah toko menjual barang Rp 50.000 per unit. Biaya tetap Rp 2.000.000 dan biaya per unit Rp 30.000. Banyak unit agar mencapai break-even point adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '100 unit', 'is_correct' => true],
                        ['option_text' => '50 unit', 'is_correct' => false],
                        ['option_text' => '150 unit', 'is_correct' => false],
                        ['option_text' => '200 unit', 'is_correct' => false],
                    ],
                ],
            ],

            default => [],
        };
    }
}
