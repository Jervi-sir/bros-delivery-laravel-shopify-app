<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryCredential extends Model
{
    use HasFactory;

    protected $fillable = [
        'platform',
        'token_1',
        'token_2',
        'phone_number'
    ];
}
