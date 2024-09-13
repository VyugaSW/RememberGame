<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GameTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("game_types")->insert([
            'id' => '1',
            'type' => '8'
        ]);
        DB::table("game_types")->insert([
            'id' => '2',
            'type' => '16'
        ]);
        DB::table("game_types")->insert([
            'id' => '3',
            'type' => '32'
        ]);
    }
}
