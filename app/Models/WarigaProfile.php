<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['user_id', 'wuku', 'urip_wuku', 'panca_wara', 'urip_panca_wara', 'urip_sapta_wara', 'sapta_wara', 'characteristic'])]

class WarigaProfile extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
