<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Seeder;

class QuestionRelasiDanFungsiSeeder extends Seeder
{
    public function run(): void
    {
        $material = Material::where('title', 'Relasi dan Fungsi')->first();

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
                    'question_text'      => 'Relasi adalah hubungan antara anggota dari satu himpunan dengan anggota dari himpunan lain. Manakah contoh relasi dalam kehidupan sehari-hari?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Siswa dengan mata pelajaran favoritnya', 'is_correct' => true],
                        ['option_text' => 'Bilangan 5 saja tanpa hubungan apa pun', 'is_correct' => false],
                        ['option_text' => 'Sebuah angka yang berdiri sendiri', 'is_correct' => false],
                        ['option_text' => 'Satu titik tanpa pasangan', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada relasi dari himpunan A ke himpunan B, himpunan A disebut sebagai ....',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Domain', 'is_correct' => true],
                        ['option_text' => 'Kodomain', 'is_correct' => false],
                        ['option_text' => 'Range', 'is_correct' => false],
                        ['option_text' => 'Hasil', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada relasi dari A ke B, himpunan tujuan disebut ....',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Kodomain', 'is_correct' => true],
                        ['option_text' => 'Domain', 'is_correct' => false],
                        ['option_text' => 'Input', 'is_correct' => false],
                        ['option_text' => 'Variabel bebas', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika 5 lebih besar dari 3 dan relasinya adalah R = "lebih besar dari", maka notasi relasi yang benar adalah ....',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '5R3', 'is_correct' => true],
                        ['option_text' => '3R5', 'is_correct' => false],
                        ['option_text' => 'R53', 'is_correct' => false],
                        ['option_text' => '5 = 3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Relasi yang setiap anggota himpunan berelasi dengan dirinya sendiri disebut relasi ....',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Refleksif', 'is_correct' => true],
                        ['option_text' => 'Simetris', 'is_correct' => false],
                        ['option_text' => 'Transitif', 'is_correct' => false],
                        ['option_text' => 'Bijektif', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Relasi "setara dengan" termasuk relasi simetris karena ....',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Jika A setara dengan B, maka B setara dengan A', 'is_correct' => true],
                        ['option_text' => 'Setiap anggota hanya punya satu pasangan', 'is_correct' => false],
                        ['option_text' => 'Setiap anggota berelasi dengan dirinya sendiri', 'is_correct' => false],
                        ['option_text' => 'Semua anggota kodomain harus terpakai', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika A = {1, 2} dan B = {a, b, c}, maka banyak pasangan anggota A dan B yang mungkin adalah ....',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '6', 'is_correct' => true],
                        ['option_text' => '5', 'is_correct' => false],
                        ['option_text' => '8', 'is_correct' => false],
                        ['option_text' => '12', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika A = {1, 2} dan B = {a, b}, maka banyak relasi yang mungkin dari A ke B adalah ....',
                    'estimated_duration' => 75,
                    'options' => [
                        ['option_text' => '16', 'is_correct' => true],
                        ['option_text' => '4', 'is_correct' => false],
                        ['option_text' => '8', 'is_correct' => false],
                        ['option_text' => '2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Relasi dapat disajikan dengan diagram panah. Fungsi utama panah pada diagram panah adalah ....',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Menunjukkan hubungan dari anggota domain ke kodomain', 'is_correct' => true],
                        ['option_text' => 'Mengurutkan anggota dari yang terbesar', 'is_correct' => false],
                        ['option_text' => 'Menghapus anggota himpunan', 'is_correct' => false],
                        ['option_text' => 'Mengubah relasi menjadi bilangan', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Diketahui relasi R = {(1, a), (2, b), (3, c)}. Bentuk penyajian relasi tersebut adalah ....',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Himpunan pasangan berurutan', 'is_correct' => true],
                        ['option_text' => 'Diagram batang', 'is_correct' => false],
                        ['option_text' => 'Pertidaksamaan', 'is_correct' => false],
                        ['option_text' => 'Persamaan linear', 'is_correct' => false],
                    ],
                ],
            ],

            'medium' => [
                [
                    'question_text'      => 'Fungsi adalah relasi khusus yang memasangkan setiap anggota domain dengan ....',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Tepat satu anggota kodomain', 'is_correct' => true],
                        ['option_text' => 'Dua anggota kodomain', 'is_correct' => false],
                        ['option_text' => 'Semua anggota kodomain', 'is_correct' => false],
                        ['option_text' => 'Tidak harus memiliki pasangan', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Diketahui A = {1, 2, 3} dan B = {a, b, c}. Manakah relasi berikut yang merupakan fungsi?',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '{(1,a), (2,b), (3,c)}', 'is_correct' => true],
                        ['option_text' => '{(1,a), (1,b), (2,c)}', 'is_correct' => false],
                        ['option_text' => '{(1,a), (2,b)}', 'is_correct' => false],
                        ['option_text' => '{(1,a), (2,b), (2,c)}', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Mengapa R = {(1,a), (1,b), (2,c)} bukan fungsi dari A = {1, 2} ke B = {a, b, c}?',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Karena anggota 1 memiliki dua pasangan', 'is_correct' => true],
                        ['option_text' => 'Karena anggota 2 tidak memiliki pasangan', 'is_correct' => false],
                        ['option_text' => 'Karena semua anggota B memiliki pasangan', 'is_correct' => false],
                        ['option_text' => 'Karena relasi tidak boleh memakai huruf', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Diketahui fungsi f: {1, 2, 3} → {2, 4, 6, 8} dengan f(1)=2, f(2)=4, dan f(3)=6. Range fungsi tersebut adalah ....',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '{2, 4, 6}', 'is_correct' => true],
                        ['option_text' => '{1, 2, 3}', 'is_correct' => false],
                        ['option_text' => '{2, 4, 6, 8}', 'is_correct' => false],
                        ['option_text' => '{8}', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Diketahui fungsi f: {1, 2, 3} → {2, 4, 6, 8}. Domain fungsi tersebut adalah ....',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '{1, 2, 3}', 'is_correct' => true],
                        ['option_text' => '{2, 4, 6, 8}', 'is_correct' => false],
                        ['option_text' => '{2, 4, 6}', 'is_correct' => false],
                        ['option_text' => '{1, 2, 3, 8}', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada fungsi, pernyataan yang benar tentang range dan kodomain adalah ....',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Range merupakan bagian dari kodomain', 'is_correct' => true],
                        ['option_text' => 'Kodomain selalu bagian dari range', 'is_correct' => false],
                        ['option_text' => 'Range selalu sama dengan domain', 'is_correct' => false],
                        ['option_text' => 'Domain selalu sama dengan kodomain', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika f(x) = 2x + 1, maka nilai f(4) adalah ....',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '9', 'is_correct' => true],
                        ['option_text' => '8', 'is_correct' => false],
                        ['option_text' => '7', 'is_correct' => false],
                        ['option_text' => '10', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika f(x) = 3x - 2, maka nilai f(5) adalah ....',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '13', 'is_correct' => true],
                        ['option_text' => '15', 'is_correct' => false],
                        ['option_text' => '17', 'is_correct' => false],
                        ['option_text' => '10', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Domain dari fungsi f(x) = 1/(x - 3) adalah ....',
                    'estimated_duration' => 100,
                    'options' => [
                        ['option_text' => 'Semua bilangan real kecuali x = 3', 'is_correct' => true],
                        ['option_text' => 'Semua bilangan real', 'is_correct' => false],
                        ['option_text' => 'Hanya x = 3', 'is_correct' => false],
                        ['option_text' => 'Semua bilangan real kecuali x = -3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Diketahui f(x) = x² + 2x - 1. Nilai f(-2) adalah ....',
                    'estimated_duration' => 100,
                    'options' => [
                        ['option_text' => '-1', 'is_correct' => true],
                        ['option_text' => '1', 'is_correct' => false],
                        ['option_text' => '7', 'is_correct' => false],
                        ['option_text' => '-7', 'is_correct' => false],
                    ],
                ],
            ],

            'hard' => [
                [
                    'question_text'      => 'Diketahui f(1)=3, f(2)=5, dan f(3)=7. Jika pola fungsi linear tersebut berlanjut, rumus fungsi yang tepat adalah ....',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'f(x) = 2x + 1', 'is_correct' => true],
                        ['option_text' => 'f(x) = x + 2', 'is_correct' => false],
                        ['option_text' => 'f(x) = 3x - 1', 'is_correct' => false],
                        ['option_text' => 'f(x) = x² + 2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Diketahui fungsi linear f(x) = ax + b, f(0)=5 dan f(2)=9. Rumus fungsi f(x) adalah ....',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'f(x) = 2x + 5', 'is_correct' => true],
                        ['option_text' => 'f(x) = 5x + 2', 'is_correct' => false],
                        ['option_text' => 'f(x) = 2x + 9', 'is_correct' => false],
                        ['option_text' => 'f(x) = 4x + 5', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika f(x) = (2x + 1)/(x - 1), maka nilai f(3) adalah ....',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '7/2', 'is_correct' => true],
                        ['option_text' => '5/2', 'is_correct' => false],
                        ['option_text' => '3', 'is_correct' => false],
                        ['option_text' => '7', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Domain dari fungsi f(x) = √(x - 3) adalah ....',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '{x | x ≥ 3}', 'is_correct' => true],
                        ['option_text' => '{x | x > 3}', 'is_correct' => false],
                        ['option_text' => '{x | x ≤ 3}', 'is_correct' => false],
                        ['option_text' => 'Semua bilangan real', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Diketahui f(x) = 2x - 1 dengan domain {-1, 0, 1, 2}. Range fungsi tersebut adalah ....',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '{-3, -1, 1, 3}', 'is_correct' => true],
                        ['option_text' => '{-1, 0, 1, 2}', 'is_correct' => false],
                        ['option_text' => '{1, 3, 5, 7}', 'is_correct' => false],
                        ['option_text' => '{-2, 0, 2, 4}', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah taksi memiliki tarif awal Rp 5.000 dan tarif per km Rp 3.000. Jika jarak perjalanan d km, fungsi tarif yang tepat adalah ....',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'f(d) = 5.000 + 3.000d', 'is_correct' => true],
                        ['option_text' => 'f(d) = 3.000 + 5.000d', 'is_correct' => false],
                        ['option_text' => 'f(d) = 8.000d', 'is_correct' => false],
                        ['option_text' => 'f(d) = 5.000d - 3.000', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Berdasarkan fungsi tarif taksi f(d) = 5.000 + 3.000d, tarif untuk perjalanan 8 km adalah ....',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Rp 29.000', 'is_correct' => true],
                        ['option_text' => 'Rp 24.000', 'is_correct' => false],
                        ['option_text' => 'Rp 40.000', 'is_correct' => false],
                        ['option_text' => 'Rp 13.000', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah pabrik memiliki biaya tetap Rp 5.000.000 dan biaya produksi Rp 15.000 per unit. Fungsi biaya total untuk x unit adalah ....',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'f(x) = 5.000.000 + 15.000x', 'is_correct' => true],
                        ['option_text' => 'f(x) = 15.000 + 5.000.000x', 'is_correct' => false],
                        ['option_text' => 'f(x) = 5.015.000x', 'is_correct' => false],
                        ['option_text' => 'f(x) = 5.000.000 - 15.000x', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika fungsi biaya produksi adalah f(x) = 5.000.000 + 15.000x, maka biaya untuk memproduksi 100 unit adalah ....',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Rp 6.500.000', 'is_correct' => true],
                        ['option_text' => 'Rp 5.150.000', 'is_correct' => false],
                        ['option_text' => 'Rp 1.500.000', 'is_correct' => false],
                        ['option_text' => 'Rp 7.000.000', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Hubungan suhu Celsius dan Fahrenheit dinyatakan F = (9/5)C + 32. Jika C = 30, maka nilai F adalah ....',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '86°F', 'is_correct' => true],
                        ['option_text' => '54°F', 'is_correct' => false],
                        ['option_text' => '62°F', 'is_correct' => false],
                        ['option_text' => '90°F', 'is_correct' => false],
                    ],
                ],
            ],

            default => [],
        };
    }
}
