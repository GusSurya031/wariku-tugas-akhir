<?php

namespace Tests\Feature;

use App\Models\RecommendationRule;
use Database\Seeders\RecommendationRulePostQuizSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PostQuizRecommendationRuleInferenceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RecommendationRulePostQuizSeeder::class);
    }

    private function resolveCluster(float $scorePerformance): string
    {
        return match (true) {
            $scorePerformance >= 0 && $scorePerformance <= 60  => 'A',
            $scorePerformance > 60 && $scorePerformance <= 80  => 'B',
            $scorePerformance > 80 && $scorePerformance <= 100 => 'C',
            default => 'Unclustered',
        };
    }

    private function inferRule(string $cluster, int $moodValue, string $caturBekel): ?RecommendationRule
    {
        return RecommendationRule::active()
            ->postQuiz()
            ->where('performance_cluster', $cluster)
            ->where('mood_value', $moodValue)
            ->whereJsonContains('catur_bekel_values', $caturBekel)
            ->orderBy('priority')
            ->first();
    }

    // -------------------------------------------------------------------------
    // Data Provider — 18 skenario positif (TC-2-01 s.d. TC-2-18)
    // [scorePerformance, moodValue, caturBekel, ruleCode, contentType, difficulty, themeDayOffset, quizDifficulty]
    // -------------------------------------------------------------------------
    public static function scenarioProvider(): array
    {
        return [
            // mood=3 | Guru/Ratu (kluster A, B, C)
            'TC-2-01 | SP=30(A) | mood=3 | Guru/Ratu' => [30, 3, 'guru', 'PQ_001', 'text', 'medium', 'current', 'mix_easy_medium'],
            'TC-2-02 | SP=70(B) | mood=3 | Guru/Ratu' => [70, 3, 'guru', 'PQ_002', 'text', 'hard',   'current', 'mix_medium_hard'],
            'TC-2-03 | SP=90(C) | mood=3 | Guru/Ratu' => [90, 3, 'guru', 'PQ_003', 'text', 'hard',   'current', 'hard'],

            // mood=3 | Lara/Pati (kluster A, B, C)
            'TC-2-04 | SP=30(A) | mood=3 | Lara/Pati' => [30, 3, 'lara', 'PQ_004', 'text', 'easy',   'next', 'easy'],
            'TC-2-05 | SP=70(B) | mood=3 | Lara/Pati' => [70, 3, 'lara', 'PQ_005', 'text', 'medium', 'next', 'medium'],
            'TC-2-06 | SP=90(C) | mood=3 | Lara/Pati' => [90, 3, 'lara', 'PQ_006', 'text', 'hard',   'next', 'mix_easy_medium'],

            // mood=1 | Guru/Ratu (kluster A, B, C)
            'TC-2-07 | SP=30(A) | mood=1 | Guru/Ratu' => [30, 1, 'guru', 'PQ_007', 'illustration', 'easy',   'current', 'easy'],
            'TC-2-08 | SP=70(B) | mood=1 | Guru/Ratu' => [70, 1, 'guru', 'PQ_008', 'illustration', 'medium', 'current', 'mix_easy_medium'],
            'TC-2-09 | SP=90(C) | mood=1 | Guru/Ratu' => [90, 1, 'guru', 'PQ_009', 'illustration', 'medium', 'current', 'mix_medium_hard'],

            // mood=1 | Lara/Pati (kluster A, B, C)
            'TC-2-10 | SP=30(A) | mood=1 | Lara/Pati' => [30, 1, 'lara', 'PQ_010', 'illustration', 'easy',   'next', 'easy'],
            'TC-2-11 | SP=70(B) | mood=1 | Lara/Pati' => [70, 1, 'lara', 'PQ_011', 'illustration', 'easy',   'next', 'mix_easy_medium'],
            'TC-2-12 | SP=90(C) | mood=1 | Lara/Pati' => [90, 1, 'lara', 'PQ_012', 'illustration', 'medium', 'next', 'medium'],

            // mood=2 | Guru/Ratu (kluster A, B, C)
            'TC-2-13 | SP=30(A) | mood=2 | Guru/Ratu' => [30, 2, 'guru', 'PQ_013', 'random', 'easy',   'current', 'easy'],
            'TC-2-15 | SP=70(B) | mood=2 | Guru/Ratu' => [70, 2, 'guru', 'PQ_015', 'random', 'medium', 'current', 'medium'],
            'TC-2-17 | SP=90(C) | mood=2 | Guru/Ratu' => [90, 2, 'guru', 'PQ_017', 'random', 'hard',   'current', 'hard'],

            // mood=2 | Lara/Pati (kluster A, B, C)
            'TC-2-14 | SP=30(A) | mood=2 | Lara/Pati' => [30, 2, 'lara', 'PQ_014', 'random', 'easy',   'next', 'easy'],
            'TC-2-16 | SP=70(B) | mood=2 | Lara/Pati' => [70, 2, 'lara', 'PQ_016', 'random', 'medium', 'next', 'medium'],
            'TC-2-18 | SP=90(C) | mood=2 | Lara/Pati' => [90, 2, 'lara', 'PQ_018', 'random', 'hard',   'next', 'hard'],
        ];
    }

    /**
     * TC-2-01 s.d. TC-2-18 — Rule ditemukan dan output sesuai skenario.
     */
    #[DataProvider('scenarioProvider')]
    #[Test]
    public function inferensi_post_quiz_mengembalikan_rule_yang_sesuai(
        float $scorePerformance,
        int $moodValue,
        string $caturBekel,
        string $expectedRuleCode,
        string $expectedContentType,
        string $expectedDifficulty,
        string $expectedThemeDayOffset,
        string $expectedQuizDifficulty
    ): void {
        $cluster = $this->resolveCluster($scorePerformance);

        $rule = $this->inferRule($cluster, $moodValue, $caturBekel);

        $this->assertNotNull(
            $rule,
            "Rule tidak ditemukan untuk cluster={$cluster}, mood={$moodValue}, catur_bekel={$caturBekel}"
        );
        $this->assertSame($expectedRuleCode, $rule->rule_code, 'Rule code tidak sesuai');
        $this->assertSame($expectedContentType, $rule->recommended_content_type, 'Tipe materi tidak sesuai');
        $this->assertSame($expectedDifficulty, $rule->recommended_difficulty, 'Bobot kesulitan tidak sesuai');
        $this->assertSame($expectedThemeDayOffset, $rule->theme_day_offset, 'Tema hari tidak sesuai');
        $this->assertSame($expectedQuizDifficulty, $rule->recommended_quiz_difficulty, 'Bobot soal tidak sesuai');
    }

    /**
     * TC-2-19 — Rule yang dinonaktifkan (is_active=false) tidak boleh dikembalikan.
     */
    #[Test]
    public function tc_2_19_rule_nonaktif_tidak_dikembalikan(): void
    {
        RecommendationRule::where('rule_code', 'PQ_007')->update(['is_active' => false]);

        $cluster = $this->resolveCluster(30); // cluster A
        $rule    = $this->inferRule($cluster, 1, 'guru');

        $this->assertNull($rule, 'Rule yang is_active=false tidak boleh dikembalikan oleh inferensi');
    }

    /**
     * TC-2-20 — Tidak ada rule yang cocok jika catur_bekel tidak dikenal.
     */
    #[Test]
    public function tc_2_20_tidak_ada_rule_untuk_catur_bekel_tidak_dikenal(): void
    {
        $cluster = $this->resolveCluster(30); // cluster A
        $rule    = $this->inferRule($cluster, 3, 'unknown_bekel');

        $this->assertNull($rule, 'Inferensi harus mengembalikan null jika tidak ada rule yang cocok');
    }
}
