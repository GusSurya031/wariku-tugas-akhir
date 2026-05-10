<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recommendation_rules', function (Blueprint $table) {
            $table->id();
            $table->enum('rule_type', ['first_login', 'post_quiz']);
            $table->string('rule_code', 20)->unique();

            // Conditions
            $table->tinyInteger('mood_value')->unsigned()->nullable();
            $table->json('catur_bekel_values')->nullable();
            // null = first_login (belum ada data performance)
            // A = belum paham, B = paham, C = sangat paham
            $table->enum('performance_cluster', ['A', 'B', 'C'])->nullable();

            // Output
            $table->enum('recommended_content_type', ['text', 'illustration', 'random']);
            $table->enum('recommended_difficulty', ['easy', 'medium', 'hard']);
            // null untuk first_login rules (belum ada soal)
            // mix_medium = campuran easy+medium, mix_hard = campuran medium+hard
            $table->enum('recommended_quiz_difficulty', ['easy', 'medium', 'hard', 'mix_medium', 'mix_hard'])->nullable();

            $table->text('description')->nullable();
            $table->smallInteger('priority')->unsigned()->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recommendation_rules');
    }
};