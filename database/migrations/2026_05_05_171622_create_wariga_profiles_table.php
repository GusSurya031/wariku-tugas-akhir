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
        Schema::create('wariga_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('wuku');
            $table->tinyInteger('urip_wuku');
            $table->enum('panca_wara', ['Umanis', 'Paing', 'Pon', 'Wage', 'Kliwon']);
            $table->tinyInteger('urip_panca_wara');
            $table->enum('sapta_wara', ['Redite', 'Soma', 'Anggara', 'Buda', 'Wrespati', 'Sukra', 'Saniscara']);
            $table->tinyInteger('urip_sapta_wara');
            // $table->string('characteristic', 255);
            $table->enum('catur_bekel_kahuripan', ['guru', 'ratu', 'lara', 'pati'])->nullable();
            $table->date('catur_bekel_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wariga_profiles');
    }
};
