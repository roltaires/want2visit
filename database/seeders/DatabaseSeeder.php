<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::create([
            'name' => 'Roltaire Solis',
            'email' => 'roltairesolis@gmail.com',
            'password' => Hash::make('Cell5test2022'),
        ]);
    }
}
