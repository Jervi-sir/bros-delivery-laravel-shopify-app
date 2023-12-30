<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DeliveryCompany extends Model
{
    use HasFactory;

    public function userDeliveryTokens(): HasMany
    {
        return $this->hasMany(ShopDeliveryToken::class);
    }

}
