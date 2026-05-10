<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\MaterialHasVariant;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        $materials = [
            [
                'title'              => 'Aljabar Dasar',
                'description'        => 'Memahami konsep dasar aljabar: variabel, ekspresi, dan persamaan sederhana.',
                'estimated_duration' => 45,
                'topic'              => 'Aljabar',
            ],
            [
                'title'              => 'Geometri Bangun Datar',
                'description'        => 'Mempelajari sifat-sifat bangun datar: segitiga, persegi, lingkaran, dan lainnya.',
                'estimated_duration' => 50,
                'topic'              => 'Geometri',
            ],
            [
                'title'              => 'Statistika Dasar',
                'description'        => 'Pengenalan konsep statistika: mean, median, modus, dan penyajian data.',
                'estimated_duration' => 40,
                'topic'              => 'Statistika',
            ],
        ];

        foreach ($materials as $data) {
            $material = Material::create($data);

            foreach (['easy', 'medium', 'hard'] as $difficulty) {
                foreach (['text', 'illustration'] as $learningType) {
                    MaterialHasVariant::create([
                        'material_id'    => $material->id,
                        'difficulty_level' => $difficulty,
                        'learning_type'  => $learningType,
                    ]);
                }
            }
        }
    }
}
