<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\MaterialHasVariant;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        // Data materi hasil ekspor dari database lama (lihat database/seeders/data/materials.json)
        $materials = json_decode(file_get_contents(__DIR__ . '/data/materials.json'), true, flags: JSON_THROW_ON_ERROR);

        foreach ($materials as $data) {
            $material = Material::updateOrCreate(
                ['title' => $data['title']],
                [
                    'description'        => $data['description'],
                    'sub_description'    => $data['sub_description'],
                    'estimated_duration' => $data['estimated_duration'],
                    'topic'              => $data['topic'],
                ]
            );

            foreach ($data['variants'] as $variant) {
                MaterialHasVariant::firstOrCreate([
                    'material_id'      => $material->id,
                    'difficulty_level' => $variant['difficulty_level'],
                    'learning_type'    => $variant['learning_type'],
                ]);
            }
        }
    }
}
