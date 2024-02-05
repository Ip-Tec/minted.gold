<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ComponentAdsOneTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Define the number of component_ads_one you want to create
        $numberOfComponentAdsOne = 2;

        // Insert component_ads_one into the 'component_ads_one' table
        for ($i = 0; $i < $numberOfComponentAdsOne; $i++) {
            $component_ads_one = [
                'title' => $faker->sentence,
                'description' => $faker->paragraph,
                'price' => $faker->randomFloat(2, 10, 100),
                'adminName' => 'admin' . $faker->numberBetween(1, 5),
                'category' => $faker->word,
                'image' => json_encode([$faker->imageUrl(), $faker->imageUrl(), $faker->imageUrl(), $faker->imageUrl()]),
                'stock' => $faker->randomFloat(2, 10, 100),
            ];

            $component_ads_one['slug'] = Str::slug($component_ads_one['title']); // Generate slug from title

            DB::table('component_ads_one')->insert($component_ads_one);
        }
    }
}
