<?php

namespace App\Services;

use Carbon\Carbon;

class ThemeDayService
{
    public static function resolveThemeDay(string $offset, $referenceDate = null): string
    {
        $days      = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        $reference = $referenceDate ?? now();
        $index     = $offset === 'next'
            ? ($reference->dayOfWeek + 1) % 7
            : $reference->dayOfWeek;

        return $days[$index];
    }
}
