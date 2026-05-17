<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Seeder;

class QuestionPertidaksamaanLinearSeeder extends Seeder
{
    public function run(): void
    {
        $material = Material::where('title', 'Pertidaksamaan Linear')->first();
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
                    'question_text'      => 'Manakah tanda yang digunakan untuk menyatakan “lebih kecil dari”?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '<', 'is_correct' => true],
                        ['option_text' => '>', 'is_correct' => false],
                        ['option_text' => '=', 'is_correct' => false],
                        ['option_text' => '≥', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Manakah dari berikut ini yang merupakan pertidaksamaan?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'x + 3 < 8', 'is_correct' => true],
                        ['option_text' => 'x + 3 = 8', 'is_correct' => false],
                        ['option_text' => '2x + 5', 'is_correct' => false],
                        ['option_text' => 'x + y', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pertidaksamaan x > 5 dibaca sebagai…',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'x lebih besar dari 5', 'is_correct' => true],
                        ['option_text' => 'x lebih kecil dari 5', 'is_correct' => false],
                        ['option_text' => 'x sama dengan 5', 'is_correct' => false],
                        ['option_text' => 'x tidak lebih dari 5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Manakah contoh pertidaksamaan linear satu variabel?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '2x + 5 < 13', 'is_correct' => true],
                        ['option_text' => 'x² + 2 < 7', 'is_correct' => false],
                        ['option_text' => 'x + y = 10', 'is_correct' => false],
                        ['option_text' => '3x + 2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada pertidaksamaan 3x - 4 ≥ 11, variabelnya adalah…',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'x', 'is_correct' => true],
                        ['option_text' => '3', 'is_correct' => false],
                        ['option_text' => '-4', 'is_correct' => false],
                        ['option_text' => '11', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada pertidaksamaan 2x + 5 < 13, koefisien dari x adalah…',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '2', 'is_correct' => true],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '13', 'is_correct' => false],
                        ['option_text' => 'x', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Apakah x = 3 merupakan solusi dari x < 5?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Ya, karena 3 lebih kecil dari 5', 'is_correct' => true],
                        ['option_text' => 'Tidak, karena 3 lebih besar dari 5', 'is_correct' => false],
                        ['option_text' => 'Tidak, karena x harus sama dengan 5', 'is_correct' => false],
                        ['option_text' => 'Ya, karena semua nilai x adalah solusi', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Apakah x = 5 merupakan solusi dari x < 5?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Tidak, karena 5 tidak lebih kecil dari 5', 'is_correct' => true],
                        ['option_text' => 'Ya, karena 5 sama dengan 5', 'is_correct' => false],
                        ['option_text' => 'Ya, karena tanda < memuat nilai 5', 'is_correct' => false],
                        ['option_text' => 'Tidak, karena x harus lebih besar dari 5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Himpunan penyelesaian dari x + 3 < 10 adalah…',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'x < 7', 'is_correct' => true],
                        ['option_text' => 'x > 7', 'is_correct' => false],
                        ['option_text' => 'x < 13', 'is_correct' => false],
                        ['option_text' => 'x = 7', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika x = 2, pernyataan x + 3 > 4 bernilai…',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Benar', 'is_correct' => true],
                        ['option_text' => 'Salah', 'is_correct' => false],
                        ['option_text' => 'Tidak dapat ditentukan', 'is_correct' => false],
                        ['option_text' => 'Benar hanya jika x = 4', 'is_correct' => false],
                    ],
                ],
            ],

            'medium' => [
                [
                    'question_text'      => 'Selesaikan pertidaksamaan: x + 5 > 12',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'x > 7', 'is_correct' => true],
                        ['option_text' => 'x < 7', 'is_correct' => false],
                        ['option_text' => 'x > 17', 'is_correct' => false],
                        ['option_text' => 'x = 7', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan pertidaksamaan: x - 3 < 8',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'x < 11', 'is_correct' => true],
                        ['option_text' => 'x > 11', 'is_correct' => false],
                        ['option_text' => 'x < 5', 'is_correct' => false],
                        ['option_text' => 'x = 11', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan pertidaksamaan: 3x ≥ 15',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'x ≥ 5', 'is_correct' => true],
                        ['option_text' => 'x ≤ 5', 'is_correct' => false],
                        ['option_text' => 'x ≥ 45', 'is_correct' => false],
                        ['option_text' => 'x > 5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan pertidaksamaan: 2x - 7 < 5',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'x < 6', 'is_correct' => true],
                        ['option_text' => 'x > 6', 'is_correct' => false],
                        ['option_text' => 'x < -1', 'is_correct' => false],
                        ['option_text' => 'x = 6', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan pertidaksamaan: 3x + 4 > x + 12',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'x > 4', 'is_correct' => true],
                        ['option_text' => 'x < 4', 'is_correct' => false],
                        ['option_text' => 'x > 8', 'is_correct' => false],
                        ['option_text' => 'x = 4', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan pertidaksamaan: -2x < 8',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'x > -4', 'is_correct' => true],
                        ['option_text' => 'x < -4', 'is_correct' => false],
                        ['option_text' => 'x > 4', 'is_correct' => false],
                        ['option_text' => 'x < 4', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Mengapa tanda pertidaksamaan berubah saat -2x < 8 dibagi dengan -2?',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Karena kedua ruas dibagi bilangan negatif', 'is_correct' => true],
                        ['option_text' => 'Karena kedua ruas ditambah bilangan negatif', 'is_correct' => false],
                        ['option_text' => 'Karena tanda < selalu berubah menjadi >', 'is_correct' => false],
                        ['option_text' => 'Karena variabel berada di ruas kiri', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan pertidaksamaan: 2(x - 3) = 8. Pernyataan ini termasuk…',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Persamaan, bukan pertidaksamaan', 'is_correct' => true],
                        ['option_text' => 'Pertidaksamaan linear', 'is_correct' => false],
                        ['option_text' => 'Pertidaksamaan kuadrat', 'is_correct' => false],
                        ['option_text' => 'Himpunan penyelesaian', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan pertidaksamaan: 2(x + 3) > 10',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'x > 2', 'is_correct' => true],
                        ['option_text' => 'x < 2', 'is_correct' => false],
                        ['option_text' => 'x > 5', 'is_correct' => false],
                        ['option_text' => 'x ≥ 2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan pertidaksamaan: x/2 + 1 ≤ 5',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'x ≤ 8', 'is_correct' => true],
                        ['option_text' => 'x ≥ 8', 'is_correct' => false],
                        ['option_text' => 'x ≤ 4', 'is_correct' => false],
                        ['option_text' => 'x < 8', 'is_correct' => false],
                    ],
                ],
            ],

            'hard' => [
                [
                    'question_text'      => 'Selesaikan pertidaksamaan: 2(3x - 1) ≤ 4x + 6',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'x ≤ 4', 'is_correct' => true],
                        ['option_text' => 'x ≥ 4', 'is_correct' => false],
                        ['option_text' => 'x ≤ 2', 'is_correct' => false],
                        ['option_text' => 'x < 4', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan pertidaksamaan: -3(2x + 1) > 9',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'x < -2', 'is_correct' => true],
                        ['option_text' => 'x > -2', 'is_correct' => false],
                        ['option_text' => 'x < 2', 'is_correct' => false],
                        ['option_text' => 'x > 2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Bentuk interval dari x > 5 adalah…',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '(5, ∞)', 'is_correct' => true],
                        ['option_text' => '[5, ∞)', 'is_correct' => false],
                        ['option_text' => '(-∞, 5)', 'is_correct' => false],
                        ['option_text' => '(-∞, 5]', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Bentuk interval dari x ≤ 10 adalah…',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '(-∞, 10]', 'is_correct' => true],
                        ['option_text' => '(-∞, 10)', 'is_correct' => false],
                        ['option_text' => '[10, ∞)', 'is_correct' => false],
                        ['option_text' => '(10, ∞)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada garis bilangan, solusi x ≥ 3 digambarkan dengan…',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Lingkaran penuh di 3 dan garis ke kanan', 'is_correct' => true],
                        ['option_text' => 'Lingkaran kosong di 3 dan garis ke kanan', 'is_correct' => false],
                        ['option_text' => 'Lingkaran penuh di 3 dan garis ke kiri', 'is_correct' => false],
                        ['option_text' => 'Lingkaran kosong di 3 dan garis ke kiri', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah bilangan ditambah 5 hasilnya lebih besar dari 12. Jika bilangan itu x, maka himpunan penyelesaiannya adalah…',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'x > 7', 'is_correct' => true],
                        ['option_text' => 'x < 7', 'is_correct' => false],
                        ['option_text' => 'x ≥ 7', 'is_correct' => false],
                        ['option_text' => 'x = 7', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dua kali sebuah bilangan dikurangi 3 tidak lebih dari 15. Jika bilangan itu x, maka nilai x yang memenuhi adalah…',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'x ≤ 9', 'is_correct' => true],
                        ['option_text' => 'x ≥ 9', 'is_correct' => false],
                        ['option_text' => 'x < 9', 'is_correct' => false],
                        ['option_text' => 'x > 9', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Umur ibu Ani adalah 3x + 5 tahun. Jika umur ibu lebih dari 50 tahun, maka kemungkinan umur Ani adalah…',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'x > 15', 'is_correct' => true],
                        ['option_text' => 'x < 15', 'is_correct' => false],
                        ['option_text' => 'x ≥ 15', 'is_correct' => false],
                        ['option_text' => 'x ≤ 15', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Seorang siswa memiliki nilai 75, 80, 70, dan 85. Berapa nilai minimal tes ke-5 agar rata-ratanya minimal 80?',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '90', 'is_correct' => true],
                        ['option_text' => '85', 'is_correct' => false],
                        ['option_text' => '80', 'is_correct' => false],
                        ['option_text' => '95', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Hani memiliki uang Rp50.000 dan ingin membeli buku seharga Rp8.000 per buah. Banyak buku maksimal yang dapat dibeli Hani adalah…',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '6 buku', 'is_correct' => true],
                        ['option_text' => '7 buku', 'is_correct' => false],
                        ['option_text' => '5 buku', 'is_correct' => false],
                        ['option_text' => '8 buku', 'is_correct' => false],
                    ],
                ],
            ],

            default => [],
        };
    }
}
