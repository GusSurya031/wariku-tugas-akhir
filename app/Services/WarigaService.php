<?php

namespace App\Services;

class WarigaService
{
    public static function calculateCBK(int $pancaWaraBirthUrip, int $saptaWaraBirthUrip, int $pancaWaraTodayUrip, int $saptaWaraTodayUrip)
    {
        // Hitung catur_bekel_kahuripan: (urip lahir + urip hari ini) % 4
        // 1=Guru, 2=Ratu, 3=Lara, 0=Pati
        $modulo = (
            $pancaWaraBirthUrip +
            $saptaWaraBirthUrip +
            $pancaWaraTodayUrip +
            $saptaWaraTodayUrip
        ) % 4;

        $caturBekel = match ($modulo) {
            1 => 'guru',
            2 => 'ratu',
            3 => 'lara',
            default => 'pati',
        };
        return $caturBekel;
    }
}
