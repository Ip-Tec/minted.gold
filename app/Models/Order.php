<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'status',
        'total_price',
        'paid_at',
        'delivered_at',
    ];

    public const STATUS_ONGOING = 'Ongoing';
    public const STATUS_SUCCESSFUL = 'Successfully';
    public const STATUS_CANCELED = 'Canceled';
    public const STATUS_RETURNED = 'Returned';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
