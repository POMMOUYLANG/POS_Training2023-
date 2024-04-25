<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Type extends Model
{
    use HasFactory;
    protected $table = 'users_type';


    public function users(): HasMany //1:M
    {
        return $this->hasMany(User::class, 'tyep_id');
    }
}
