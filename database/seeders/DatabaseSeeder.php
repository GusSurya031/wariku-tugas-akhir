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
        // User::factory(10)->create();

    //     User::factory()->create([
    //         'name' => 'Test User',
    //         'email' => 'test@example.com',
    //     ]);
        Role::create(['role_name' => 'admin']);
        Role::create(['role_name' => 'student']);

        $this->call([
            RecommendationRuleSeeder::class,
            RecommendationRulePostQuizSeeder::class,
            // MaterialSeeder::class,
            // ChapterSeeder::class,
            // QuestionSeeder::class,
        ]);
    }
}
