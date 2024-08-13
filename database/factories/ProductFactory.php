<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = \App\Models\Product::class;
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'category_id' => Category::factory(),
            'price' => $this->faker->randomFloat(2, 10, 100),
            'slang_price' => function (array $attributes) {
                return $attributes['price'] * (1 + (rand(5, 20) / 100));
            },
            'rating' => 3.2,
            'slug' => function (array $attributes) {
                return Str::slug($attributes['name'] . '-' . Str::random(6));
            },
            'main_image' => $this->faker->imageUrl(640, 480, 'products', true),
            'images' => json_encode([
                $this->faker->imageUrl(640, 480, 'products', true),
                $this->faker->imageUrl(640, 480, 'products', true),
            ]),
        ];
    }
}
