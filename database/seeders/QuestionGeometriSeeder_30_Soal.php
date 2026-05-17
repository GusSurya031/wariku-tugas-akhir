<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Seeder;

class QuestionGeometriSeeder extends Seeder
{
    public function run(): void
    {
        $material = Material::where('title', 'Geometri')->first();

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
                    'question_text'      => 'Geometri adalah cabang matematika yang mempelajari...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Bentuk, ukuran, dan hubungan objek dalam ruang', 'is_correct' => true],
                        ['option_text' => 'Bilangan prima saja', 'is_correct' => false],
                        ['option_text' => 'Operasi pecahan saja', 'is_correct' => false],
                        ['option_text' => 'Persamaan kuadrat saja', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Objek geometri paling dasar yang tidak memiliki dimensi adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Titik', 'is_correct' => true],
                        ['option_text' => 'Garis', 'is_correct' => false],
                        ['option_text' => 'Bidang', 'is_correct' => false],
                        ['option_text' => 'Ruang', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Bangun datar yang memiliki 3 sisi dan 3 sudut adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Segitiga', 'is_correct' => true],
                        ['option_text' => 'Persegi', 'is_correct' => false],
                        ['option_text' => 'Lingkaran', 'is_correct' => false],
                        ['option_text' => 'Balok', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dua garis yang tidak pernah bertemu dan memiliki jarak yang sama disebut...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Garis sejajar', 'is_correct' => true],
                        ['option_text' => 'Garis berpotongan', 'is_correct' => false],
                        ['option_text' => 'Garis lengkung', 'is_correct' => false],
                        ['option_text' => 'Garis diagonal', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dua garis yang berpotongan membentuk sudut 90 derajat disebut...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Garis tegak lurus', 'is_correct' => true],
                        ['option_text' => 'Garis sejajar', 'is_correct' => false],
                        ['option_text' => 'Garis berimpit', 'is_correct' => false],
                        ['option_text' => 'Garis horizontal', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jumlah sudut dalam pada segitiga adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '180 derajat', 'is_correct' => true],
                        ['option_text' => '90 derajat', 'is_correct' => false],
                        ['option_text' => '270 derajat', 'is_correct' => false],
                        ['option_text' => '360 derajat', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Rumus luas segitiga adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '1/2 × alas × tinggi', 'is_correct' => true],
                        ['option_text' => 's × s', 'is_correct' => false],
                        ['option_text' => 'p × l', 'is_correct' => false],
                        ['option_text' => '2πr', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Rumus keliling persegi dengan sisi s adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '4s', 'is_correct' => true],
                        ['option_text' => 's²', 'is_correct' => false],
                        ['option_text' => '2s', 'is_correct' => false],
                        ['option_text' => 's√2', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Rumus luas persegi panjang dengan panjang p dan lebar l adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'p × l', 'is_correct' => true],
                        ['option_text' => '2(p + l)', 'is_correct' => false],
                        ['option_text' => '4s', 'is_correct' => false],
                        ['option_text' => 'πr²', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika sebuah persegi memiliki sisi 5 cm, luasnya adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '25 cm²', 'is_correct' => true],
                        ['option_text' => '20 cm²', 'is_correct' => false],
                        ['option_text' => '10 cm²', 'is_correct' => false],
                        ['option_text' => '15 cm²', 'is_correct' => false],
                    ],
                ],
            ],

            'medium' => [
                [
                    'question_text'      => 'Bangun ruang memiliki elemen berupa...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Sisi, rusuk, dan titik sudut', 'is_correct' => true],
                        ['option_text' => 'Alas, tinggi, dan diameter saja', 'is_correct' => false],
                        ['option_text' => 'Panjang dan lebar saja', 'is_correct' => false],
                        ['option_text' => 'Jari-jari dan diameter saja', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Hubungan Euler pada bangun ruang ditulis sebagai...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Sisi + Titik Sudut - Rusuk = 2', 'is_correct' => true],
                        ['option_text' => 'Sisi + Rusuk + Titik Sudut = 2', 'is_correct' => false],
                        ['option_text' => 'Rusuk - Sisi = 2', 'is_correct' => false],
                        ['option_text' => 'Volume = Sisi + Rusuk', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Kubus memiliki jumlah sisi sebanyak...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '6 sisi', 'is_correct' => true],
                        ['option_text' => '8 sisi', 'is_correct' => false],
                        ['option_text' => '12 sisi', 'is_correct' => false],
                        ['option_text' => '4 sisi', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Kubus memiliki jumlah rusuk sebanyak...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '12 rusuk', 'is_correct' => true],
                        ['option_text' => '6 rusuk', 'is_correct' => false],
                        ['option_text' => '8 rusuk', 'is_correct' => false],
                        ['option_text' => '10 rusuk', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Rumus volume kubus dengan sisi s adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 's³', 'is_correct' => true],
                        ['option_text' => '6s²', 'is_correct' => false],
                        ['option_text' => '4s', 'is_correct' => false],
                        ['option_text' => 's√3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Rumus luas permukaan kubus dengan sisi s adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '6s²', 'is_correct' => true],
                        ['option_text' => 's³', 'is_correct' => false],
                        ['option_text' => '4s', 'is_correct' => false],
                        ['option_text' => '2(pl + pt + lt)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Volume balok dengan panjang 10 cm, lebar 6 cm, dan tinggi 5 cm adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '300 cm³', 'is_correct' => true],
                        ['option_text' => '210 cm³', 'is_correct' => false],
                        ['option_text' => '110 cm³', 'is_correct' => false],
                        ['option_text' => '600 cm³', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Luas permukaan kubus dengan sisi 4 cm adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '96 cm²', 'is_correct' => true],
                        ['option_text' => '64 cm²', 'is_correct' => false],
                        ['option_text' => '24 cm²', 'is_correct' => false],
                        ['option_text' => '16 cm²', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Volume balok dengan panjang 8 cm, lebar 5 cm, dan tinggi 6 cm adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '240 cm³', 'is_correct' => true],
                        ['option_text' => '190 cm³', 'is_correct' => false],
                        ['option_text' => '480 cm³', 'is_correct' => false],
                        ['option_text' => '120 cm³', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Bangun ruang yang tidak memiliki rusuk dan titik sudut adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Bola', 'is_correct' => true],
                        ['option_text' => 'Kubus', 'is_correct' => false],
                        ['option_text' => 'Balok', 'is_correct' => false],
                        ['option_text' => 'Prisma', 'is_correct' => false],
                    ],
                ],
            ],

            'hard' => [
                [
                    'question_text'      => 'Transformasi geometri adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Perubahan posisi atau bentuk suatu bangun geometri', 'is_correct' => true],
                        ['option_text' => 'Penghitungan luas bangun datar saja', 'is_correct' => false],
                        ['option_text' => 'Penghitungan volume bangun ruang saja', 'is_correct' => false],
                        ['option_text' => 'Penyusunan bilangan dalam himpunan', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Transformasi berupa pergeseran semua titik dengan jarak dan arah yang sama disebut...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Translasi', 'is_correct' => true],
                        ['option_text' => 'Refleksi', 'is_correct' => false],
                        ['option_text' => 'Rotasi', 'is_correct' => false],
                        ['option_text' => 'Dilatasi', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Transformasi berupa pencerminan terhadap garis atau titik simetri disebut...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Refleksi', 'is_correct' => true],
                        ['option_text' => 'Translasi', 'is_correct' => false],
                        ['option_text' => 'Rotasi', 'is_correct' => false],
                        ['option_text' => 'Dilatasi', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Transformasi yang mengubah ukuran bangun dengan faktor skala tertentu disebut...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Dilatasi', 'is_correct' => true],
                        ['option_text' => 'Translasi', 'is_correct' => false],
                        ['option_text' => 'Refleksi', 'is_correct' => false],
                        ['option_text' => 'Rotasi', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Titik A(2, 3) ditranslasi 3 satuan ke kanan dan 2 satuan ke atas. Koordinat A\' adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '(5, 5)', 'is_correct' => true],
                        ['option_text' => '(3, 2)', 'is_correct' => false],
                        ['option_text' => '(5, 1)', 'is_correct' => false],
                        ['option_text' => '(-1, 1)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah taman berbentuk persegi panjang memiliki panjang 20 m dan lebar 15 m. Luas taman adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '300 m²', 'is_correct' => true],
                        ['option_text' => '70 m²', 'is_correct' => false],
                        ['option_text' => '35 m²', 'is_correct' => false],
                        ['option_text' => '150 m²', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah taman berbentuk persegi panjang memiliki panjang 20 m dan lebar 15 m. Keliling pagar yang diperlukan adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '70 m', 'is_correct' => true],
                        ['option_text' => '300 m', 'is_correct' => false],
                        ['option_text' => '35 m', 'is_correct' => false],
                        ['option_text' => '150 m', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Akuarium berbentuk balok berukuran 80 cm × 60 cm × 50 cm. Volume air yang dapat ditampung adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '240 liter', 'is_correct' => true],
                        ['option_text' => '24 liter', 'is_correct' => false],
                        ['option_text' => '2400 liter', 'is_correct' => false],
                        ['option_text' => '190 liter', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dinding berbentuk segitiga memiliki alas 8 m dan tinggi 4 m. Luas dinding yang perlu dicat adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '16 m²', 'is_correct' => true],
                        ['option_text' => '32 m²', 'is_correct' => false],
                        ['option_text' => '12 m²', 'is_correct' => false],
                        ['option_text' => '24 m²', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga dengan titik A(1,1), B(5,1), C(3,5) didilatasi dengan faktor skala 2 dari pusat (0,0). Koordinat bayangan titik C adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'C\'(6, 10)', 'is_correct' => true],
                        ['option_text' => 'C\'(3, 10)', 'is_correct' => false],
                        ['option_text' => 'C\'(6, 5)', 'is_correct' => false],
                        ['option_text' => 'C\'(1, 5)', 'is_correct' => false],
                    ],
                ],
            ],

            default => [],
        };
    }
}
