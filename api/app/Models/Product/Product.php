<?php

namespace App\Models\Product;

// ===================================================>> Core Library
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

// ===================================================>>Model
use App\Models\Order\Detail;

// ===================================================>> Custom Library
use App\Models\Product\Type;

class Product extends Model
{
    use HasFactory;
    protected $table = 'product';

    public function type(): BelongsTo //M:1
    {
        return $this->belongsTo(Type::class, 'type_id', 'id')->select('id', 'name');
    }

    public function orderDetails(): HasMany // 1:M relationship with OrderDetail
    {
        return $this->hasMany(Detail::class, 'product_id');
    }

}
