<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'description', 'estimated_duration', 'topic'])]
class Material extends Model
{
    use HasFactory;

    public function variantMaterials()
    {
        return $this->hasMany(MaterialHasVariant::class);
    }
}
