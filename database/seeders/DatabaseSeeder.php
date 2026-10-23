<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            RecommendationRuleSeeder::class,
            RecommendationRulePostQuizSeeder::class,

            // Materi → varian → chapter harus ada sebelum seeder soal
            MaterialSeeder::class,
            ChapterSeeder::class,

            QuestionAljabarSeeder::class,
            QuestionPersamaanLinearSeeder::class,
            QuestionPertidaksamaanLinearSeeder::class,
            QuestionSPLDVSeeder::class,
            QuestionRelasiFungsiSeeder::class,
            QuestionFungsiLinearSeeder::class,
            QuestionPhytagorasSeeder::class,
            QuestionGeometriSeeder::class,
            QuestionSegitigaSegiempatSeeder::class,
            QuestionStatistikaSeeder::class,
        ]);
    }
}
