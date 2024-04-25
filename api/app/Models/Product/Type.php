<?php

namespace App\Models\Product;

// ===================================================>> Core Library
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

// ===================================================>> Custom Library
use App\Models\Product\Product;

class Type extends Model
{
    use HasFactory;
    protected $table = 'products_type';
    
    public function products(): HasMany //1:M
    {
        return $this->hasMany(Product::class, 'type_id');
    }
}


