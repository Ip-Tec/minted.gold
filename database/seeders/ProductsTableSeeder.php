<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
    
        // Define the number of products you want to create
        $numberOfProducts = 60;
    
        // Insert products into the 'products' table
        for ($i = 0; $i < $numberOfProducts; $i++) {
            $product = [
                'title' => $faker->sentence,
                'description' => $faker->paragraph,
                'price' => $faker->randomFloat(2, 10, 100),
                'adminName' => 'admin' . $faker->numberBetween(1, 5), // Change to numberBetween
                'category' => $faker->word,
                'image' => json_encode([$faker->imageUrl(), $faker->imageUrl(), $faker->imageUrl(), $faker->imageUrl()]),
                'stock' => $faker->randomFloat(2, 10, 100),
            ];
    
            $product['slug'] = Str::slug($product['title']); // Generate slug from title
    
            DB::table('products')->insert($product);
        }
    }
}
