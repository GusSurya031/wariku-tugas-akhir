<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


#[Fillable(['material_has_variant_id', 'title', 'content', 'order_number'])]

class Chapter extends Model
{
    use HasFactory;

    public function materialHasVariant()
    {
        return $this->belongsTo(MaterialHasVariant::class);
    }
}
