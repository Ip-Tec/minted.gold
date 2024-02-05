<?php

// app/Models/Product.php

namespace App\Models;

use App\Models\Models\Admin\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'description',
        'price',
        'adminName',
        'category',
        'image',
        'stock',
        // Add other fields as needed
    ];
    
    protected $hidden = [
        // 'adminName',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'image' => 'json', // Specify the cast for the JSON field
    ];
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'adminId');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'adminName', 'email');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category', 'name');
    }

    public function reviews()
{
    return $this->hasMany(Review::class, 'product_id');
}

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_product', 'product_id', 'order_id');
    }

    public function buyers()
    {
        return $this->belongsToMany(Buyer::class, 'wishlist', 'product_id', 'buyer_id');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d/m/Y');
    }

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d/m/Y');
    }


    public function featuredProducts()
    {
        return $this->hasMany(Product::class);
    }
    // Add other relationships as needed
}
