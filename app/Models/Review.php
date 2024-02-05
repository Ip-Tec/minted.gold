<?php

// app/Models/Review.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'userId',
        'rating',
        'comment',
        'hide',
        // Add other fields as needed
    ];

    protected $dates = ['created_at'];

    // public function product()
    // {
    //     return $this->belongsTo(Product::class, 'productId');
    // }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    // Add other relationships as needed

    // Accessor to format the created_at attribute
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d/m/Y');
    }
    
    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d/m/Y');
    }
}
