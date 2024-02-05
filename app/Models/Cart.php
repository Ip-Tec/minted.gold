<?php

// app/Models/Cart.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'products',
        'productCount',
        'totalPrice',
    ];

    protected $casts = [
        'products' => 'json',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function updateCart()
    {
        $this->updateProductCount();
        $this->updateTotalPrice();
        $this->save();
    }

    protected function updateProductCount()
    {
        $this->productCount = count($this->products);
    }

    protected function updateTotalPrice()
    {
        $this->totalPrice = collect($this->products)->sum('price');
    }

    public function addProduct($product)
    {
        $this->products[] = $product;
        $this->updateCart();
    }

    public function removeProduct($productId)
    {
        $this->products = array_values(array_filter($this->products, function ($product) use ($productId) {
            return $product['id'] != $productId;
        }));
        $this->updateCart();
    }

    // Add other methods as needed
}
