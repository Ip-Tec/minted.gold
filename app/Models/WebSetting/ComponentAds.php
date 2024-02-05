<?php

// app/Models/ComponentAds.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComponentAds extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'link',
        'image'
        // Add other fields as needed
    ];

    protected $casts = [
        'image' => 'json', // Specify the cast for the JSON field
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'productId');
    }

    // Add other relationships as needed
}
