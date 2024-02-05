<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        // Define roles data
        $roles = [
            ['name' => 'Admin', 'description' => $faker->word],
            ['name' => 'User', 'description' => $faker->word],
            // Add more roles as needed
        ];

        // Insert roles into the 'roles' table
        DB::table('roles')->insert($roles);
    }
}
