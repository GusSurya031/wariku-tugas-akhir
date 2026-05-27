<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSPLDVSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $material = Material::where('title', 'Sistem Persamaan Linear Dua Variabel')->first();

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
                    'question_text'      => 'SPLDV adalah sistem yang terdiri dari dua atau lebih persamaan linear dengan berapa variabel?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Dua variabel', 'is_correct' => true],
                        ['option_text' => 'Satu variabel', 'is_correct' => false],
                        ['option_text' => 'Tiga variabel', 'is_correct' => false],
                        ['option_text' => 'Tidak memiliki variabel', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Manakah berikut ini yang merupakan contoh SPLDV?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'x + y = 5 dan x - y = 1', 'is_correct' => true],
                        ['option_text' => '2x + 3 = 7', 'is_correct' => false],
                        ['option_text' => 'x + y = 5', 'is_correct' => false],
                        ['option_text' => 'x² + y = 8 dan x + y = 3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada SPLDV, solusi biasanya ditulis dalam bentuk...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Pasangan terurut (x, y)', 'is_correct' => true],
                        ['option_text' => 'Satu nilai x saja', 'is_correct' => false],
                        ['option_text' => 'Satu nilai y saja', 'is_correct' => false],
                        ['option_text' => 'Bilangan berpangkat dua', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Diberikan SPLDV: x + y = 5 dan x - y = 1. Apakah pasangan (3, 2) merupakan solusi?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Ya, karena memenuhi kedua persamaan', 'is_correct' => true],
                        ['option_text' => 'Tidak, karena hanya memenuhi persamaan pertama', 'is_correct' => false],
                        ['option_text' => 'Tidak, karena hanya memenuhi persamaan kedua', 'is_correct' => false],
                        ['option_text' => 'Tidak, karena x dan y harus sama', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Manakah yang bukan contoh SPLDV?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '2x + 3 = 8', 'is_correct' => true],
                        ['option_text' => '2x + 3y = 8 dan x - y = 1', 'is_correct' => false],
                        ['option_text' => 'x + y = 5 dan 2x - y = 4', 'is_correct' => false],
                        ['option_text' => '3x + 2y = 12 dan x + y = 5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Bentuk umum SPLDV dengan dua persamaan adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'a₁x + b₁y = c₁ dan a₂x + b₂y = c₂', 'is_correct' => true],
                        ['option_text' => 'ax² + bx + c = 0', 'is_correct' => false],
                        ['option_text' => 'ax + b = c', 'is_correct' => false],
                        ['option_text' => 'a + b = c', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada persamaan 2x + 3y = 8, koefisien dari x adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '2', 'is_correct' => true],
                        ['option_text' => '3', 'is_correct' => false],
                        ['option_text' => '8', 'is_correct' => false],
                        ['option_text' => 'x', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada persamaan x - y = 1, koefisien dari y adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '-1', 'is_correct' => true],
                        ['option_text' => '1', 'is_correct' => false],
                        ['option_text' => '0', 'is_correct' => false],
                        ['option_text' => 'y', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika dua garis dari SPLDV berpotongan di satu titik, maka SPLDV tersebut memiliki...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Satu solusi tunggal', 'is_correct' => true],
                        ['option_text' => 'Solusi tak terbatas', 'is_correct' => false],
                        ['option_text' => 'Tidak ada solusi', 'is_correct' => false],
                        ['option_text' => 'Tiga solusi', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika dua persamaan dalam SPLDV sebenarnya mewakili garis yang sama atau berimpit, maka SPLDV memiliki...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Solusi tak terbatas', 'is_correct' => true],
                        ['option_text' => 'Satu solusi saja', 'is_correct' => false],
                        ['option_text' => 'Tidak ada solusi', 'is_correct' => false],
                        ['option_text' => 'Solusi negatif saja', 'is_correct' => false],
                    ],
                ],
            ],

            'medium' => [
                [
                    'question_text'      => 'Dalam metode grafik, solusi SPLDV ditentukan dari...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Titik potong dua garis', 'is_correct' => true],
                        ['option_text' => 'Titik asal koordinat saja', 'is_correct' => false],
                        ['option_text' => 'Nilai x terbesar', 'is_correct' => false],
                        ['option_text' => 'Nilai y terkecil', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Untuk persamaan x + y = 5, jika x = 0 maka nilai y adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '5', 'is_correct' => true],
                        ['option_text' => '0', 'is_correct' => false],
                        ['option_text' => '-5', 'is_correct' => false],
                        ['option_text' => '1', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Untuk persamaan x - y = 1, jika x = 1 maka nilai y adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '0', 'is_correct' => true],
                        ['option_text' => '1', 'is_correct' => false],
                        ['option_text' => '-1', 'is_correct' => false],
                        ['option_text' => '2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan SPLDV: x + y = 5 dan x - y = 1. Nilai x dan y adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'x = 3 dan y = 2', 'is_correct' => true],
                        ['option_text' => 'x = 2 dan y = 3', 'is_correct' => false],
                        ['option_text' => 'x = 4 dan y = 1', 'is_correct' => false],
                        ['option_text' => 'x = 1 dan y = 4', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dalam metode substitusi, langkah utama yang dilakukan adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Mengganti satu variabel dengan ekspresi variabel lain', 'is_correct' => true],
                        ['option_text' => 'Menggambar garis pada koordinat Cartesius', 'is_correct' => false],
                        ['option_text' => 'Menghapus semua konstanta', 'is_correct' => false],
                        ['option_text' => 'Mengubah semua variabel menjadi nol', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dari persamaan x - y = 1, bentuk x dalam y adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'x = y + 1', 'is_correct' => true],
                        ['option_text' => 'x = y - 1', 'is_correct' => false],
                        ['option_text' => 'x = 1 - y', 'is_correct' => false],
                        ['option_text' => 'x = -y - 1', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan dengan substitusi: 2x + 3y = 8 dan x - y = 1. Pasangan solusinya adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '(11/5, 6/5)', 'is_correct' => true],
                        ['option_text' => '(6/5, 11/5)', 'is_correct' => false],
                        ['option_text' => '(3, 2)', 'is_correct' => false],
                        ['option_text' => '(2, 3)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan SPLDV: x + y = 7 dan x - y = 3. Nilai y adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '2', 'is_correct' => true],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '3', 'is_correct' => false],
                        ['option_text' => '7', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Kapan metode substitusi biasanya lebih efisien digunakan?',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Ketika salah satu persamaan mudah diubah menjadi x = ... atau y = ...', 'is_correct' => true],
                        ['option_text' => 'Ketika semua koefisien sangat besar', 'is_correct' => false],
                        ['option_text' => 'Ketika tidak ada variabel dalam persamaan', 'is_correct' => false],
                        ['option_text' => 'Ketika kedua persamaan bukan linear', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan SPLDV: x + 2y = 8 dan x = 4. Nilai y adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '2', 'is_correct' => true],
                        ['option_text' => '4', 'is_correct' => false],
                        ['option_text' => '6', 'is_correct' => false],
                        ['option_text' => '8', 'is_correct' => false],
                    ],
                ],
            ],

            'hard' => [
                [
                    'question_text'      => 'Dalam metode eliminasi, tujuan utama menyamakan koefisien salah satu variabel adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Agar salah satu variabel dapat dihilangkan', 'is_correct' => true],
                        ['option_text' => 'Agar kedua persamaan berubah menjadi kuadrat', 'is_correct' => false],
                        ['option_text' => 'Agar nilai konstanta menjadi nol', 'is_correct' => false],
                        ['option_text' => 'Agar semua variabel berubah menjadi pecahan', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan SPLDV dengan eliminasi: 2x + 3y = 8 dan x + y = 3. Pasangan solusinya adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '(1, 2)', 'is_correct' => true],
                        ['option_text' => '(2, 1)', 'is_correct' => false],
                        ['option_text' => '(3, 1)', 'is_correct' => false],
                        ['option_text' => '(1, 3)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan SPLDV: 3x + 2y = 12 dan 2x - y = 1. Nilai x dan y adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'x = 2 dan y = 3', 'is_correct' => true],
                        ['option_text' => 'x = 3 dan y = 2', 'is_correct' => false],
                        ['option_text' => 'x = 1 dan y = 4', 'is_correct' => false],
                        ['option_text' => 'x = 4 dan y = 1', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Selesaikan SPLDV: 2x + 3y = 13 dan 3x + 2y = 12. Pasangan solusinya adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '(2, 3)', 'is_correct' => true],
                        ['option_text' => '(3, 2)', 'is_correct' => false],
                        ['option_text' => '(1, 4)', 'is_correct' => false],
                        ['option_text' => '(4, 1)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jumlah dua bilangan adalah 15 dan selisihnya adalah 3. Kedua bilangan tersebut adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '9 dan 6', 'is_correct' => true],
                        ['option_text' => '8 dan 7', 'is_correct' => false],
                        ['option_text' => '10 dan 5', 'is_correct' => false],
                        ['option_text' => '12 dan 3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Harga 3 buku dan 2 pensil adalah Rp17.000. Harga 2 buku dan 3 pensil adalah Rp16.000. Harga satu buku adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Rp3.800', 'is_correct' => true],
                        ['option_text' => 'Rp2.800', 'is_correct' => false],
                        ['option_text' => 'Rp4.000', 'is_correct' => false],
                        ['option_text' => 'Rp3.000', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dari soal harga 3 buku dan 2 pensil Rp17.000 serta 2 buku dan 3 pensil Rp16.000, harga satu pensil adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Rp2.800', 'is_correct' => true],
                        ['option_text' => 'Rp3.800', 'is_correct' => false],
                        ['option_text' => 'Rp2.000', 'is_correct' => false],
                        ['option_text' => 'Rp4.800', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Umur Ani ditambah umur Budi adalah 25 tahun. Ani 3 tahun lebih muda dari Budi. Umur Ani adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '11 tahun', 'is_correct' => true],
                        ['option_text' => '14 tahun', 'is_correct' => false],
                        ['option_text' => '12 tahun', 'is_correct' => false],
                        ['option_text' => '10 tahun', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah toko menjual barang A seharga Rp10.000 dan barang B seharga Rp15.000. Total 30 barang terjual dengan total penjualan Rp400.000. Banyak barang B yang terjual adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '20 barang', 'is_correct' => true],
                        ['option_text' => '10 barang', 'is_correct' => false],
                        ['option_text' => '15 barang', 'is_correct' => false],
                        ['option_text' => '25 barang', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Metode eliminasi biasanya lebih efisien digunakan ketika...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Koefisien variabel mudah disamakan atau sudah berlawanan', 'is_correct' => true],
                        ['option_text' => 'Persamaan hanya memiliki satu variabel', 'is_correct' => false],
                        ['option_text' => 'Sistem tidak memiliki tanda sama dengan', 'is_correct' => false],
                        ['option_text' => 'Semua variabel berpangkat dua', 'is_correct' => false],
                    ],
                ],
            ],

            default => [],
        };
    }
}
