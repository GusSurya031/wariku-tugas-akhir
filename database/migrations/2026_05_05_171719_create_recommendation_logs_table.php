<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recommendation_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('recommendation_rules_id')->constrained()->onDelete('cascade');
            // $table->foreignId('material_has_variant_id')->constrained()->onDelete('cascade');
            // $table->string('mood_label');
            // $table->integer('mood_level');
            // $table->string('wariga_characteristic');
            // $table->enum('user_learning_type', ['text', 'illustration']);
            // $table->enum('user_difficulty', ['easy', 'medium', 'hard']);
            // $table->enum('final_learning_type', ['text', 'illustration']);
            // $table->enum('final_difficulty', ['easy', 'medium', 'hard']);
            // $table->json('reason');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recommendation_logs');
    }
};
