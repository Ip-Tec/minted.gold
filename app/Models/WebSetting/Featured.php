<?php

namespace App\Models\WebSetting;

use App\Models\Admin;
use App\Models\Admin\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Featured extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'image',
        'description',
        // Add other fields as needed
    ];

    protected $hidden = [
        // 'adminName',
    ];

   
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $table = 'featured';

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
