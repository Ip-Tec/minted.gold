<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// app/Models/Order.php

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'orderNumber',
        'orderStatus',
        'buyerId',
    ];

    // Define relationships
    public function buyer()
    {
        return $this->belongsTo(Buyer::class, 'buyerId');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'orderId');
    }
}

