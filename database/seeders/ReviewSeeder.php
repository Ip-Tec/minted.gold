<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Adjust the range based on the number of reviews you want to seed
        for ($i = 1; $i <= 50; $i++) {
            DB::table('reviews')->insert([
                // Adjust the range based on your product IDs
                'product_id' => $faker->numberBetween(1, 70),
                'userId' => null,
                'rating' => $faker->numberBetween(1, 5),
                'comment' => $faker->text,
                'hide' => $faker->boolean(10), // 10% chance of hiding a review
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}