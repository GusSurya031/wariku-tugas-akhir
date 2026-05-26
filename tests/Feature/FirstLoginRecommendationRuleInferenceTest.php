<?php

namespace Tests\Feature;

use App\Models\RecommendationRule;
use Database\Seeders\RecommendationRuleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class FirstLoginRecommendationRuleInferenceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RecommendationRuleSeeder::class);
    }

    private function inferRule(int $moodValue, string $caturBekel): ?RecommendationRule
    {
        return RecommendationRule::active()
            ->firstLogin()
            ->where('mood_value', $moodValue)
            ->whereJsonContains('catur_bekel_values', $caturBekel)
            ->orderBy('priority')
            ->first();
    }

    // -------------------------------------------------------------------------
    // Data Provider — 6 skenario positif (TC-1-01 s.d. TC-1-06)
    // [moodValue, caturBekel, ruleCode, contentType, difficulty, themeDayOffset]
    // -------------------------------------------------------------------------
    public static function scenarioProvider(): array
    {
        return [
            'TC-1-01 | mood=3 | Guru/Ratu' => [3, 'guru', 'FL_001', 'text',         'hard',   'current'],
            'TC-1-02 | mood=3 | Lara/Pati' => [3, 'lara', 'FL_002', 'text',         'medium', 'next'],
            'TC-1-03 | mood=2 | Guru/Ratu' => [2, 'guru', 'FL_005', 'random',       'medium', 'current'],
            'TC-1-04 | mood=2 | Lara/Pati' => [2, 'lara', 'FL_006', 'random',       'medium', 'next'],
            'TC-1-05 | mood=1 | Guru/Ratu' => [1, 'guru', 'FL_003', 'illustration', 'medium', 'current'],
            'TC-1-06 | mood=1 | Lara/Pati' => [1, 'lara', 'FL_004', 'illustration', 'easy',   'next'],
        ];
    }

    /**
     * TC-1-01 s.d. TC-1-06 — Rule ditemukan dan output sesuai skenario.
     */
    #[DataProvider('scenarioProvider')]
    #[Test]
    public function inferensi_first_login_mengembalikan_rule_yang_sesuai(
        int $moodValue,
        string $caturBekel,
        string $expectedRuleCode,
        string $expectedContentType,
        string $expectedDifficulty,
        string $expectedThemeDayOffset,
    ): void {
        $rule = $this->inferRule($moodValue, $caturBekel);

        $this->assertNotNull(
            $rule,
            "Rule tidak ditemukan untuk mood={$moodValue}, catur_bekel={$caturBekel}"
        );
        $this->assertSame($expectedRuleCode,       $rule->rule_code,                'Rule code tidak sesuai');
        $this->assertSame($expectedContentType,    $rule->recommended_content_type, 'Tipe materi tidak sesuai');
        $this->assertSame($expectedDifficulty,     $rule->recommended_difficulty,   'Bobot kesulitan tidak sesuai');
        $this->assertSame($expectedThemeDayOffset, $rule->theme_day_offset,         'Tema hari tidak sesuai');
        $this->assertNull($rule->recommended_quiz_difficulty, 'First login tidak memiliki bobot soal');
        $this->assertNull($rule->performance_cluster, 'First login tidak memiliki performance cluster');
    }

    /**
     * TC-1-07 (EP-W3 / EP-M1) — catur_bekel tidak dikenal → rule null.
     */
    #[Test]
    public function tc_1_07_tidak_ada_rule_untuk_catur_bekel_nilai_lain(): void
    {
        $rule = $this->inferRule(3, 'nilai_lain');

        $this->assertNull(
            $rule,
            'Inferensi harus mengembalikan null jika catur_bekel tidak ada di rules manapun'
        );
    }

    /**
     * TC-1-08 (EP-W1 / EP-M4) — mood_value=0 di luar rentang valid (1-3) → rule null.
     */
    #[Test]
    public function tc_1_08_tidak_ada_rule_untuk_mood_di_luar_rentang(): void
    {
        $rule = $this->inferRule(0, 'guru');

        $this->assertNull(
            $rule,
            'Inferensi harus mengembalikan null jika mood_value=0 tidak ada di rules manapun'
        );
    }
}
