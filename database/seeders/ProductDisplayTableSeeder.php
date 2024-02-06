<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductDisplayTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Define the number of product_displays you want to create
        $numberOfProductDisplays = 6;

        // Insert product_displays into the 'product_displays' table
        for ($i = 0; $i < $numberOfProductDisplays; $i++) {
            $product_display = [
                'title' => $faker->sentence,
                'description' => $faker->paragraph,
                'price' => $faker->randomFloat(2, 10, 100),
                'adminName' => 'admin' . $faker->numberBetween(1, 5),
                'category' => $faker->word,
                'image' => json_encode([$faker->imageUrl(), $faker->imageUrl(), $faker->imageUrl(), $faker->imageUrl()]),
                'stock' => $faker->randomFloat(2, 10, 100),
            ];

            $product_display['slug'] = Str::slug($product_display['title']); // Generate slug from title

            DB::table('products_display')->insert($product_display);
        }
    }
}
