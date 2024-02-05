<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define admins data
        $admins = [
            [
                'username' => 'admin1',
                'email' => 'admin1@example.com',
                'provider' => 'manual', // Example value, update as needed
                'adminrole' => 'Admin', // Example value, update as needed
                'name' => 'Admin User 1', // Example value, update as needed
                // Add other fields as needed
            ],
            [
                'username' => 'admin2',
                'email' => 'admin2@example.com',
                'provider' => 'manual', // Example value, update as needed
                'adminrole' => 'Admin', // Example value, update as needed
                'name' => 'Admin User 2', // Example value, update as needed
                // Add other fields as needed
            ],
            // Add more admins as needed
        ];

        // Insert admins into the 'admins' table
        DB::table('admins')->insert($admins);
    }
}
