<?php

namespace Database\Seeders;

use App\Models\Role;
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
        // Role::create(['role_name' => 'admin']);
        // Role::create(['role_name' => 'student']);

        $this->call([
            // RecommendationRuleSeeder::class,
            // RecommendationRulePostQuizSeeder::class,
            QuestionAljabarSeeder::class,
            QuestionFungsiLinearSeeder::class,
            QuestionGeometriSeeder::class,
            QuestionPersamaanLinearSeeder::class,
            QuestionPertidaksamaanLinearSeeder::class,
            QuestionPhytagorasSeeder::class,
            QuestionRelasiFungsiSeeder::class,
            QuestionSegitigaSegiempatSeeder::class,
            QuestionSPLDVSeeder::class,
            QuestionStatistikaSeeder::class,
        ]);
    }
}
