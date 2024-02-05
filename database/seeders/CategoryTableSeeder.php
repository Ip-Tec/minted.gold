<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Define the number of products you want to create
        $numberOfProducts = 3;

        // Define categories data
        // Insert products into the 'products' table
        for ($i = 0; $i < $numberOfProducts; $i++) {
            $categories = [
                'name' => $faker->name,
                'description' => $faker->paragraph,

            ];
        }
        // Insert categories into the 'categories' table
        DB::table('categories')->insert($categories);
    }
}
