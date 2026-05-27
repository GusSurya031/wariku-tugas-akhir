<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionStatistikaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $material = Material::where('title', 'Statistika dan Peluang')->first();

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
                    'question_text'      => 'Statistika adalah ilmu yang mempelajari tentang...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Pengumpulan, pengolahan, penyajian, dan analisis data', 'is_correct' => true],
                        ['option_text' => 'Perhitungan luas bangun datar saja', 'is_correct' => false],
                        ['option_text' => 'Penyelesaian persamaan linear saja', 'is_correct' => false],
                        ['option_text' => 'Pengukuran sudut segitiga saja', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Data yang berbentuk kategori atau deskripsi disebut...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Data kualitatif', 'is_correct' => true],
                        ['option_text' => 'Data kuantitatif', 'is_correct' => false],
                        ['option_text' => 'Data diskrit', 'is_correct' => false],
                        ['option_text' => 'Data kontinu', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Data tinggi badan siswa termasuk jenis data...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Data kontinu', 'is_correct' => true],
                        ['option_text' => 'Data kualitatif', 'is_correct' => false],
                        ['option_text' => 'Data kategori', 'is_correct' => false],
                        ['option_text' => 'Data warna', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Data jumlah siswa dalam kelas termasuk data...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Data diskrit', 'is_correct' => true],
                        ['option_text' => 'Data kontinu', 'is_correct' => false],
                        ['option_text' => 'Data deskripsi', 'is_correct' => false],
                        ['option_text' => 'Data kualitatif', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Keseluruhan objek atau individu yang akan diteliti disebut...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Populasi', 'is_correct' => true],
                        ['option_text' => 'Sampel', 'is_correct' => false],
                        ['option_text' => 'Frekuensi', 'is_correct' => false],
                        ['option_text' => 'Diagram', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Bagian dari populasi yang dipilih untuk diteliti disebut...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Sampel', 'is_correct' => true],
                        ['option_text' => 'Populasi', 'is_correct' => false],
                        ['option_text' => 'Mean', 'is_correct' => false],
                        ['option_text' => 'Median', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Metode pengumpulan data dengan bertanya langsung kepada responden disebut...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Wawancara', 'is_correct' => true],
                        ['option_text' => 'Observasi', 'is_correct' => false],
                        ['option_text' => 'Dokumentasi', 'is_correct' => false],
                        ['option_text' => 'Histogram', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Diagram batang paling cocok digunakan untuk...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Membandingkan data dari kategori berbeda', 'is_correct' => true],
                        ['option_text' => 'Menghitung akar kuadrat', 'is_correct' => false],
                        ['option_text' => 'Menentukan sisi miring segitiga', 'is_correct' => false],
                        ['option_text' => 'Menyelesaikan SPLDV', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Rumus sudut pada diagram lingkaran adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '(Frekuensi / Total) × 360°', 'is_correct' => true],
                        ['option_text' => '(Total / Frekuensi) × 360°', 'is_correct' => false],
                        ['option_text' => 'Frekuensi × Total', 'is_correct' => false],
                        ['option_text' => 'Total - Frekuensi', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika 40 dari 100 siswa memilih sepak bola, maka besar sudut pada diagram lingkaran adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '144°', 'is_correct' => true],
                        ['option_text' => '108°', 'is_correct' => false],
                        ['option_text' => '90°', 'is_correct' => false],
                        ['option_text' => '40°', 'is_correct' => false],
                    ],
                ],
            ],

            'medium' => [
                [
                    'question_text'      => 'Mean dari data 70, 80, 90, dan 100 adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '85', 'is_correct' => true],
                        ['option_text' => '80', 'is_correct' => false],
                        ['option_text' => '90', 'is_correct' => false],
                        ['option_text' => '75', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Median dari data 70, 80, 90, 100, dan 110 adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '90', 'is_correct' => true],
                        ['option_text' => '80', 'is_correct' => false],
                        ['option_text' => '85', 'is_correct' => false],
                        ['option_text' => '100', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Median dari data 70, 80, 90, dan 100 adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '85', 'is_correct' => true],
                        ['option_text' => '80', 'is_correct' => false],
                        ['option_text' => '90', 'is_correct' => false],
                        ['option_text' => '75', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Modus dari data 70, 70, 70, 80, 90, 100 adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '70', 'is_correct' => true],
                        ['option_text' => '80', 'is_correct' => false],
                        ['option_text' => '90', 'is_correct' => false],
                        ['option_text' => '100', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Mean dari tabel frekuensi: nilai 70 muncul 2 kali, 80 muncul 3 kali, dan 90 muncul 5 kali adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '83', 'is_correct' => true],
                        ['option_text' => '80', 'is_correct' => false],
                        ['option_text' => '85', 'is_correct' => false],
                        ['option_text' => '90', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Range dari data 70, 80, 90, 100, dan 110 adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '40', 'is_correct' => true],
                        ['option_text' => '110', 'is_correct' => false],
                        ['option_text' => '70', 'is_correct' => false],
                        ['option_text' => '90', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Kuartil tengah atau Q2 sama dengan...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Median', 'is_correct' => true],
                        ['option_text' => 'Mean', 'is_correct' => false],
                        ['option_text' => 'Modus', 'is_correct' => false],
                        ['option_text' => 'Range', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Untuk data 2, 3, 4, 5, 6, 7, 8, 9, 10, nilai Q2 adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '6', 'is_correct' => true],
                        ['option_text' => '3,5', 'is_correct' => false],
                        ['option_text' => '8,5', 'is_correct' => false],
                        ['option_text' => '5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Untuk data 2, 3, 4, 5, 6, 7, 8, 9, 10, nilai Q1 adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '3,5', 'is_correct' => true],
                        ['option_text' => '6', 'is_correct' => false],
                        ['option_text' => '8,5', 'is_correct' => false],
                        ['option_text' => '4,5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Simpangan baku digunakan untuk mengukur...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Seberapa jauh data menyebar dari mean', 'is_correct' => true],
                        ['option_text' => 'Nilai yang paling sering muncul', 'is_correct' => false],
                        ['option_text' => 'Nilai tengah data', 'is_correct' => false],
                        ['option_text' => 'Jumlah seluruh data', 'is_correct' => false],
                    ],
                ],
            ],

            'hard' => [
                [
                    'question_text'      => 'Ruang sampel dari pelemparan sebuah dadu adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '{1, 2, 3, 4, 5, 6}', 'is_correct' => true],
                        ['option_text' => '{1, 2, 3}', 'is_correct' => false],
                        ['option_text' => '{genap, ganjil}', 'is_correct' => false],
                        ['option_text' => '{0, 1}', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Rumus peluang kejadian A adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'P(A) = n(A) / n(S)', 'is_correct' => true],
                        ['option_text' => 'P(A) = n(S) / n(A)', 'is_correct' => false],
                        ['option_text' => 'P(A) = n(A) × n(S)', 'is_correct' => false],
                        ['option_text' => 'P(A) = n(S) - n(A)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Peluang muncul angka 5 ketika melempar sebuah dadu adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '1/6', 'is_correct' => true],
                        ['option_text' => '1/2', 'is_correct' => false],
                        ['option_text' => '5/6', 'is_correct' => false],
                        ['option_text' => '1', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Peluang muncul bilangan genap ketika melempar sebuah dadu adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '1/2', 'is_correct' => true],
                        ['option_text' => '1/6', 'is_correct' => false],
                        ['option_text' => '2/3', 'is_correct' => false],
                        ['option_text' => '1/3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Peluang muncul angka 7 pada dadu enam sisi adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '0', 'is_correct' => true],
                        ['option_text' => '1', 'is_correct' => false],
                        ['option_text' => '1/6', 'is_correct' => false],
                        ['option_text' => '7/6', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah toko mencatat penjualan HP selama 5 hari: 10, 15, 12, 18, 15. Mean penjualannya adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '14 unit', 'is_correct' => true],
                        ['option_text' => '15 unit', 'is_correct' => false],
                        ['option_text' => '8 unit', 'is_correct' => false],
                        ['option_text' => '18 unit', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dari data penjualan 10, 15, 12, 18, 15, median dan modusnya berturut-turut adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '15 dan 15', 'is_correct' => true],
                        ['option_text' => '14 dan 15', 'is_correct' => false],
                        ['option_text' => '12 dan 18', 'is_correct' => false],
                        ['option_text' => '15 dan 10', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dalam diagram hobi 100 siswa, Olahraga dipilih 35%. Banyak siswa yang memilih olahraga adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '35 siswa', 'is_correct' => true],
                        ['option_text' => '25 siswa', 'is_correct' => false],
                        ['option_text' => '20 siswa', 'is_correct' => false],
                        ['option_text' => '65 siswa', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dalam kotak terdapat 5 bola merah, 3 bola biru, dan 2 bola hijau. Peluang terambil bola merah atau biru adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '4/5', 'is_correct' => true],
                        ['option_text' => '1/2', 'is_correct' => false],
                        ['option_text' => '3/10', 'is_correct' => false],
                        ['option_text' => '2/5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dari 50 siswa, nilai 80-90 diperoleh 20 siswa dan nilai 90-100 diperoleh 7 siswa. Persentase siswa yang lulus jika syarat lulus ≥80 adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '54%', 'is_correct' => true],
                        ['option_text' => '27%', 'is_correct' => false],
                        ['option_text' => '50%', 'is_correct' => false],
                        ['option_text' => '60%', 'is_correct' => false],
                    ],
                ],
            ],

            default => [],
        };
    }
}
