<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class FeaturedTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
    
        // Define the number of featureds you want to create
        $numberOfFeatureds = 6;
    
        // Insert featureds into the 'featureds' table
        for ($i = 0; $i < $numberOfFeatureds; $i++) {
            $featured = [
                'title' => $faker->sentence,
                'description' => $faker->paragraph,
                'image' => $faker->imageUrl(),
            ];
    
            $featured['slug'] = Str::slug($featured['title']); // Generate slug from title
    
            DB::table('featured')->insert($featured);
        }
    }
}
