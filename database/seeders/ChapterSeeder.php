<?php

namespace Database\Seeders;

use App\Models\Chapter;
use App\Models\MaterialHasVariant;
use Illuminate\Database\Seeder;

class ChapterSeeder extends Seeder
{
    public function run(): void
    {
        // Data chapter hasil ekspor dari database lama (lihat database/seeders/data/chapters.json)
        $chapters = json_decode(file_get_contents(__DIR__ . '/data/chapters.json'), true, flags: JSON_THROW_ON_ERROR);

        // Key: "judul materi|difficulty|learning_type" → id varian
        $variantIds = MaterialHasVariant::with('material')->get()
            ->mapWithKeys(fn($v) => ["{$v->material->title}|{$v->difficulty_level}|{$v->learning_type}" => $v->id]);

        foreach ($chapters as $data) {
            $key = "{$data['material_title']}|{$data['difficulty_level']}|{$data['learning_type']}";

            if (!$variantIds->has($key)) {
                $this->command?->warn("Varian tidak ditemukan untuk chapter '{$data['title']}' ({$key}), dilewati.");
                continue;
            }

            Chapter::updateOrCreate(
                [
                    'material_has_variant_id' => $variantIds[$key],
                    'order_number'            => $data['order_number'],
                ],
                [
                    'title'   => $data['title'],
                    'content' => $data['content'],
                ]
            );
        }
    }
}
