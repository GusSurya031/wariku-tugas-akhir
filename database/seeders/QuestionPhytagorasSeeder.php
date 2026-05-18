<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionPhytagorasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $material = Material::where('title', 'Teorema Phytagoras')->first();

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
                    'question_text'      => 'Teorema Pythagoras hanya berlaku pada segitiga...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Segitiga siku-siku', 'is_correct' => true],
                        ['option_text' => 'Segitiga sama sisi', 'is_correct' => false],
                        ['option_text' => 'Segitiga sembarang', 'is_correct' => false],
                        ['option_text' => 'Segitiga lancip saja', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sisi terpanjang pada segitiga siku-siku disebut...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Hipotenusa atau sisi miring', 'is_correct' => true],
                        ['option_text' => 'Sisi alas', 'is_correct' => false],
                        ['option_text' => 'Sisi tegak', 'is_correct' => false],
                        ['option_text' => 'Sisi pendek', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Rumus Teorema Pythagoras yang benar adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'c² = a² + b²', 'is_correct' => true],
                        ['option_text' => 'c = a + b', 'is_correct' => false],
                        ['option_text' => 'a² = b² + c²', 'is_correct' => false],
                        ['option_text' => 'a + b + c = 180°', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Pada rumus c² = a² + b², simbol c menyatakan...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Sisi miring', 'is_correct' => true],
                        ['option_text' => 'Sisi alas saja', 'is_correct' => false],
                        ['option_text' => 'Sisi tegak saja', 'is_correct' => false],
                        ['option_text' => 'Sudut siku-siku', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sudut siku-siku memiliki besar...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '90°', 'is_correct' => true],
                        ['option_text' => '60°', 'is_correct' => false],
                        ['option_text' => '45°', 'is_correct' => false],
                        ['option_text' => '180°', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika sisi siku-siku segitiga adalah 3 cm dan 4 cm, maka sisi miringnya adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '5 cm', 'is_correct' => true],
                        ['option_text' => '6 cm', 'is_correct' => false],
                        ['option_text' => '7 cm', 'is_correct' => false],
                        ['option_text' => '4 cm', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Manakah pasangan bilangan yang membentuk triple Pythagoras?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => '(3, 4, 5)', 'is_correct' => true],
                        ['option_text' => '(2, 3, 4)', 'is_correct' => false],
                        ['option_text' => '(4, 4, 5)', 'is_correct' => false],
                        ['option_text' => '(1, 2, 3)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Dalam bukti aljabar Pythagoras, luas persegi dengan sisi (a + b) adalah...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'a² + 2ab + b²', 'is_correct' => true],
                        ['option_text' => 'a² + b²', 'is_correct' => false],
                        ['option_text' => '2ab', 'is_correct' => false],
                        ['option_text' => 'a + b', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Manakah pernyataan yang benar tentang Teorema Pythagoras?',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Kuadrat sisi miring sama dengan jumlah kuadrat dua sisi siku-siku', 'is_correct' => true],
                        ['option_text' => 'Jumlah semua sisi selalu 180', 'is_correct' => false],
                        ['option_text' => 'Semua segitiga memenuhi c² = a² + b²', 'is_correct' => false],
                        ['option_text' => 'Sisi miring selalu sisi terpendek', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Teorema Pythagoras tidak boleh digunakan jika segitiga...',
                    'estimated_duration' => 60,
                    'options' => [
                        ['option_text' => 'Tidak memiliki sudut 90°', 'is_correct' => true],
                        ['option_text' => 'Memiliki sisi miring', 'is_correct' => false],
                        ['option_text' => 'Memiliki tiga sisi', 'is_correct' => false],
                        ['option_text' => 'Memiliki jumlah sudut 180°', 'is_correct' => false],
                    ],
                ],
            ],

            'medium' => [
                [
                    'question_text'      => 'Segitiga siku-siku memiliki sisi siku-siku 5 cm dan 12 cm. Panjang sisi miringnya adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '13 cm', 'is_correct' => true],
                        ['option_text' => '17 cm', 'is_correct' => false],
                        ['option_text' => '12 cm', 'is_correct' => false],
                        ['option_text' => '10 cm', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga siku-siku memiliki sisi miring 10 cm dan salah satu sisi siku-siku 6 cm. Panjang sisi siku-siku lainnya adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '8 cm', 'is_correct' => true],
                        ['option_text' => '6 cm', 'is_correct' => false],
                        ['option_text' => '10 cm', 'is_correct' => false],
                        ['option_text' => '12 cm', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga siku-siku memiliki sisi miring 13 cm dan salah satu sisi siku-siku 5 cm. Sisi siku-siku lainnya adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '12 cm', 'is_correct' => true],
                        ['option_text' => '8 cm', 'is_correct' => false],
                        ['option_text' => '10 cm', 'is_correct' => false],
                        ['option_text' => '14 cm', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga dengan sisi 3 cm, 4 cm, dan 5 cm termasuk jenis segitiga...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Siku-siku', 'is_correct' => true],
                        ['option_text' => 'Lancip', 'is_correct' => false],
                        ['option_text' => 'Tumpul', 'is_correct' => false],
                        ['option_text' => 'Sama sisi', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga dengan sisi 3 cm, 4 cm, dan 6 cm termasuk jenis segitiga...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Tumpul', 'is_correct' => true],
                        ['option_text' => 'Siku-siku', 'is_correct' => false],
                        ['option_text' => 'Lancip', 'is_correct' => false],
                        ['option_text' => 'Sama sisi', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga dengan sisi 4 cm, 5 cm, dan 6 cm termasuk jenis segitiga...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Lancip', 'is_correct' => true],
                        ['option_text' => 'Siku-siku', 'is_correct' => false],
                        ['option_text' => 'Tumpul', 'is_correct' => false],
                        ['option_text' => 'Tidak dapat ditentukan', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika sisi terpanjang suatu segitiga adalah c, maka segitiga siku-siku memenuhi syarat...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'c² = a² + b²', 'is_correct' => true],
                        ['option_text' => 'c² > a² + b²', 'is_correct' => false],
                        ['option_text' => 'c² < a² + b²', 'is_correct' => false],
                        ['option_text' => 'c = a + b', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika c² > a² + b², maka segitiga tersebut adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Segitiga tumpul', 'is_correct' => true],
                        ['option_text' => 'Segitiga siku-siku', 'is_correct' => false],
                        ['option_text' => 'Segitiga lancip', 'is_correct' => false],
                        ['option_text' => 'Segitiga sama kaki', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika c² < a² + b², maka segitiga tersebut adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => 'Segitiga lancip', 'is_correct' => true],
                        ['option_text' => 'Segitiga tumpul', 'is_correct' => false],
                        ['option_text' => 'Segitiga siku-siku', 'is_correct' => false],
                        ['option_text' => 'Segitiga sama sisi', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Segitiga siku-siku memiliki sisi siku-siku 7 cm dan 9 cm. Panjang sisi miringnya adalah...',
                    'estimated_duration' => 90,
                    'options' => [
                        ['option_text' => '√130 cm', 'is_correct' => true],
                        ['option_text' => '16 cm', 'is_correct' => false],
                        ['option_text' => '√32 cm', 'is_correct' => false],
                        ['option_text' => '11 cm', 'is_correct' => false],
                    ],
                ],
            ],

            'hard' => [
                [
                    'question_text'      => 'Manakah yang merupakan triple Pythagoras?',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '(5, 12, 13)', 'is_correct' => true],
                        ['option_text' => '(5, 10, 12)', 'is_correct' => false],
                        ['option_text' => '(6, 7, 8)', 'is_correct' => false],
                        ['option_text' => '(4, 5, 6)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Kelipatan 3 dari triple Pythagoras (3, 4, 5) adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '(9, 12, 15)', 'is_correct' => true],
                        ['option_text' => '(6, 8, 10)', 'is_correct' => false],
                        ['option_text' => '(12, 16, 20)', 'is_correct' => false],
                        ['option_text' => '(3, 12, 15)', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Jika (a, b, c) adalah triple Pythagoras, maka (ka, kb, kc) juga merupakan triple Pythagoras untuk...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => 'Setiap bilangan bulat positif k', 'is_correct' => true],
                        ['option_text' => 'Hanya k = 0', 'is_correct' => false],
                        ['option_text' => 'Hanya k negatif', 'is_correct' => false],
                        ['option_text' => 'Tidak pernah benar', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah tangga bersandar pada dinding. Jarak kaki tangga ke dinding 1,5 m dan tinggi ujung tangga 2 m. Panjang tangga adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '2,5 m', 'is_correct' => true],
                        ['option_text' => '3,5 m', 'is_correct' => false],
                        ['option_text' => '2 m', 'is_correct' => false],
                        ['option_text' => '1,5 m', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah layar televisi memiliki panjang 60 cm dan lebar 45 cm. Panjang diagonal layar adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '75 cm', 'is_correct' => true],
                        ['option_text' => '90 cm', 'is_correct' => false],
                        ['option_text' => '105 cm', 'is_correct' => false],
                        ['option_text' => '65 cm', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah kapal bergerak 12 km ke timur lalu 5 km ke utara. Jarak kapal dari posisi awal adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '13 km', 'is_correct' => true],
                        ['option_text' => '17 km', 'is_correct' => false],
                        ['option_text' => '12 km', 'is_correct' => false],
                        ['option_text' => '5 km', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Seorang tukang menggunakan tali yang dibagi menjadi 3 m, 4 m, dan 5 m untuk membuat sudut bangunan. Metode ini dapat membuat sudut siku-siku karena...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '3² + 4² = 5²', 'is_correct' => true],
                        ['option_text' => '3 + 4 = 5', 'is_correct' => false],
                        ['option_text' => '3 × 4 = 5', 'is_correct' => false],
                        ['option_text' => '5² + 4² = 3²', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah persegi panjang memiliki panjang 24 cm dan lebar 7 cm. Panjang diagonalnya adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '25 cm', 'is_correct' => true],
                        ['option_text' => '31 cm', 'is_correct' => false],
                        ['option_text' => '17 cm', 'is_correct' => false],
                        ['option_text' => '20 cm', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah lapangan berbentuk persegi panjang berukuran 9 m × 12 m. Jarak diagonal dari satu sudut ke sudut seberangnya adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '15 m', 'is_correct' => true],
                        ['option_text' => '21 m', 'is_correct' => false],
                        ['option_text' => '12 m', 'is_correct' => false],
                        ['option_text' => '9 m', 'is_correct' => false],
                    ],
                ],
                [
                    'question_text'      => 'Sebuah tiang setinggi 8 m diberi kawat penyangga dari puncak tiang ke tanah sejauh 6 m dari kaki tiang. Panjang kawat penyangga adalah...',
                    'estimated_duration' => 120,
                    'options' => [
                        ['option_text' => '10 m', 'is_correct' => true],
                        ['option_text' => '14 m', 'is_correct' => false],
                        ['option_text' => '8 m', 'is_correct' => false],
                        ['option_text' => '6 m', 'is_correct' => false],
                    ],
                ],
            ],

            default => [],
        };
    }
}
