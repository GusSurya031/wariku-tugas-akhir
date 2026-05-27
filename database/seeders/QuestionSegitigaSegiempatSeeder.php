<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSegitigaSegiempatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $material = Material::where('title', 'Segitiga dan Segiempat')->first();

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
                    'question_text'      => 'Segitiga sama sisi memiliki ciri utama...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Ketiga sisinya sama panjang', 'is_correct' => true],
                        ['option_text' => 'Dua sisinya sama panjang', 'is_correct' => false],
                        ['option_text' => 'Ketiga sisinya berbeda panjang', 'is_correct' => false],
                        ['option_text' => 'Memiliki satu sudut tumpul', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Besar masing-masing sudut pada segitiga sama sisi adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '60°', 'is_correct' => true],
                        ['option_text' => '90°', 'is_correct' => false],
                        ['option_text' => '45°', 'is_correct' => false],
                        ['option_text' => '30°', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga yang memiliki dua sisi sama panjang disebut...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Segitiga sama kaki', 'is_correct' => true],
                        ['option_text' => 'Segitiga sama sisi', 'is_correct' => false],
                        ['option_text' => 'Segitiga sembarang', 'is_correct' => false],
                        ['option_text' => 'Segitiga tumpul', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga yang ketiga sisinya berbeda panjang disebut...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Segitiga sembarang', 'is_correct' => true],
                        ['option_text' => 'Segitiga sama sisi', 'is_correct' => false],
                        ['option_text' => 'Segitiga sama kaki', 'is_correct' => false],
                        ['option_text' => 'Segitiga siku-siku', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga siku-siku memiliki satu sudut sebesar...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '90°', 'is_correct' => true],
                        ['option_text' => '60°', 'is_correct' => false],
                        ['option_text' => '120°', 'is_correct' => false],
                        ['option_text' => '180°', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jumlah semua sudut dalam segitiga adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '180°', 'is_correct' => true],
                        ['option_text' => '90°', 'is_correct' => false],
                        ['option_text' => '270°', 'is_correct' => false],
                        ['option_text' => '360°', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Rumus keliling segitiga dengan sisi a, b, dan c adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'a + b + c', 'is_correct' => true],
                        ['option_text' => '1/2 × alas × tinggi', 'is_correct' => false],
                        ['option_text' => 'a × b × c', 'is_correct' => false],
                        ['option_text' => '2(a + b)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga dengan sisi 5 cm, 6 cm, dan 7 cm memiliki keliling...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '18 cm', 'is_correct' => true],
                        ['option_text' => '12 cm', 'is_correct' => false],
                        ['option_text' => '20 cm', 'is_correct' => false],
                        ['option_text' => '30 cm', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Rumus luas segitiga adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '1/2 × alas × tinggi', 'is_correct' => true],
                        ['option_text' => 'alas × tinggi', 'is_correct' => false],
                        ['option_text' => 'sisi × sisi', 'is_correct' => false],
                        ['option_text' => '2 × alas × tinggi', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga dengan alas 8 cm dan tinggi 6 cm memiliki luas...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '24 cm²', 'is_correct' => true],
                        ['option_text' => '48 cm²', 'is_correct' => false],
                        ['option_text' => '14 cm²', 'is_correct' => false],
                        ['option_text' => '36 cm²', 'is_correct' => false],
                    ],
                ],
            ],

            'medium' => [
                [
                    'question_text'      => 'Segiempat yang memiliki keempat sisi sama panjang dan keempat sudut siku-siku adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Persegi', 'is_correct' => true],
                        ['option_text' => 'Persegi panjang', 'is_correct' => false],
                        ['option_text' => 'Trapesium', 'is_correct' => false],
                        ['option_text' => 'Jajargenjang', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Persegi panjang memiliki sifat...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Sisi berhadapan sama panjang dan sejajar', 'is_correct' => true],
                        ['option_text' => 'Semua sisi harus berbeda panjang', 'is_correct' => false],
                        ['option_text' => 'Diagonal selalu saling tegak lurus', 'is_correct' => false],
                        ['option_text' => 'Tidak memiliki sudut siku-siku', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jajargenjang memiliki sifat...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Sisi yang berhadapan sama panjang dan sejajar', 'is_correct' => true],
                        ['option_text' => 'Semua sudut selalu 90°', 'is_correct' => false],
                        ['option_text' => 'Hanya memiliki satu sisi sejajar', 'is_correct' => false],
                        ['option_text' => 'Semua diagonal selalu sama panjang dan tegak lurus', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Belah ketupat memiliki ciri utama...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Keempat sisinya sama panjang', 'is_correct' => true],
                        ['option_text' => 'Hanya satu pasang sisi sejajar', 'is_correct' => false],
                        ['option_text' => 'Tidak memiliki diagonal', 'is_correct' => false],
                        ['option_text' => 'Semua sudut pasti siku-siku', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Layang-layang memiliki sifat...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Dua pasang sisi berdekatan sama panjang', 'is_correct' => true],
                        ['option_text' => 'Semua sisi berhadapan sejajar', 'is_correct' => false],
                        ['option_text' => 'Semua sudut selalu sama besar', 'is_correct' => false],
                        ['option_text' => 'Tidak memiliki sumbu simetri', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Trapesium adalah segiempat yang memiliki...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Sepasang sisi sejajar', 'is_correct' => true],
                        ['option_text' => 'Empat sisi sama panjang', 'is_correct' => false],
                        ['option_text' => 'Empat sudut siku-siku', 'is_correct' => false],
                        ['option_text' => 'Tidak memiliki sisi sejajar', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Persegi dengan sisi 5 cm memiliki keliling dan luas berturut-turut...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '20 cm dan 25 cm²', 'is_correct' => true],
                        ['option_text' => '25 cm dan 20 cm²', 'is_correct' => false],
                        ['option_text' => '10 cm dan 25 cm²', 'is_correct' => false],
                        ['option_text' => '20 cm dan 10 cm²', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Persegi panjang dengan panjang 10 cm dan lebar 6 cm memiliki luas...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '60 cm²', 'is_correct' => true],
                        ['option_text' => '32 cm²', 'is_correct' => false],
                        ['option_text' => '16 cm²', 'is_correct' => false],
                        ['option_text' => '120 cm²', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jajargenjang dengan alas 8 cm dan tinggi 5 cm memiliki luas...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '40 cm²', 'is_correct' => true],
                        ['option_text' => '28 cm²', 'is_correct' => false],
                        ['option_text' => '13 cm²', 'is_correct' => false],
                        ['option_text' => '80 cm²', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Trapesium dengan alas 6 cm dan 10 cm serta tinggi 4 cm memiliki luas...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '32 cm²', 'is_correct' => true],
                        ['option_text' => '64 cm²', 'is_correct' => false],
                        ['option_text' => '20 cm²', 'is_correct' => false],
                        ['option_text' => '26 cm²', 'is_correct' => false],
                    ],
                ],
            ],

            'hard' => [
                [
                    'question_text'      => 'Dua segitiga dikatakan kongruen jika...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Memiliki bentuk dan ukuran yang sama', 'is_correct' => true],
                        ['option_text' => 'Memiliki bentuk sama tetapi ukuran berbeda', 'is_correct' => false],
                        ['option_text' => 'Hanya memiliki sudut yang berbeda', 'is_correct' => false],
                        ['option_text' => 'Hanya memiliki luas yang sama', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Syarat kongruensi segitiga SSS berarti...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Ketiga sisi yang bersesuaian sama panjang', 'is_correct' => true],
                        ['option_text' => 'Ketiga sudut berbeda besar', 'is_correct' => false],
                        ['option_text' => 'Dua sisi dan satu sudut tidak bersesuaian', 'is_correct' => false],
                        ['option_text' => 'Semua sisi sebanding tetapi tidak sama', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dua segitiga dikatakan sebangun jika...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Memiliki bentuk yang sama dan sisi-sisinya sebanding', 'is_correct' => true],
                        ['option_text' => 'Selalu memiliki ukuran yang sama persis', 'is_correct' => false],
                        ['option_text' => 'Tidak memiliki sudut yang sama', 'is_correct' => false],
                        ['option_text' => 'Semua sisinya berbeda tanpa perbandingan', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga ABC memiliki sisi 6 cm, 8 cm, 10 cm. Segitiga PQR memiliki sisi 3 cm, 4 cm, 5 cm. Kedua segitiga tersebut...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Sebangun dengan skala 2:1', 'is_correct' => true],
                        ['option_text' => 'Kongruen', 'is_correct' => false],
                        ['option_text' => 'Tidak memiliki hubungan', 'is_correct' => false],
                        ['option_text' => 'Sebangun dengan skala 1:3', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah kertas berbentuk segitiga memiliki alas 12 cm dan tinggi 8 cm. Luas kertas tersebut adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '48 cm²', 'is_correct' => true],
                        ['option_text' => '96 cm²', 'is_correct' => false],
                        ['option_text' => '20 cm²', 'is_correct' => false],
                        ['option_text' => '40 cm²', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah taman berbentuk persegi panjang memiliki panjang 25 m dan lebar 15 m. Luas taman adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '375 m²', 'is_correct' => true],
                        ['option_text' => '80 m²', 'is_correct' => false],
                        ['option_text' => '40 m²', 'is_correct' => false],
                        ['option_text' => '300 m²', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah kolam berbentuk persegi memiliki sisi 8 m. Jika biaya pagar Rp 50.000 per meter, total biaya memagari kolam adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Rp 1.600.000', 'is_correct' => true],
                        ['option_text' => 'Rp 400.000', 'is_correct' => false],
                        ['option_text' => 'Rp 3.200.000', 'is_correct' => false],
                        ['option_text' => 'Rp 800.000', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah pohon memiliki bayangan 6 m. Tongkat 1,5 m memiliki bayangan 0,5 m pada waktu yang sama. Tinggi pohon adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '18 m', 'is_correct' => true],
                        ['option_text' => '12 m', 'is_correct' => false],
                        ['option_text' => '9 m', 'is_correct' => false],
                        ['option_text' => '3 m', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah rumah memiliki atap segitiga dengan alas 10 m dan tinggi 3 m. Luas atap tersebut adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '15 m²', 'is_correct' => true],
                        ['option_text' => '30 m²', 'is_correct' => false],
                        ['option_text' => '45 m²', 'is_correct' => false],
                        ['option_text' => '13 m²', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Atap segitiga memiliki luas 15 m² dan dinding persegi panjang memiliki luas 30 m². Jika harga cat Rp 50.000 per m², biaya total pengecatan adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Rp 2.250.000', 'is_correct' => true],
                        ['option_text' => 'Rp 1.500.000', 'is_correct' => false],
                        ['option_text' => 'Rp 750.000', 'is_correct' => false],
                        ['option_text' => 'Rp 3.000.000', 'is_correct' => false],
                    ],
                ],
            ],

            default => [],
        };
    }
}
