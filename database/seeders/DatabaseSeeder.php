<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */

    
    public function run(): void
    {
        $seedDate = Carbon::now();

        for ($i =1; $i < 20-1; $i++) {
            $projectId = DB::table('projects')->insertGetId([
                'name' => Str::random(10),
                'user_id' => 6
            ]);
        
            for ($y=1; $y < 5-1; $y++) {
                $listId = DB::table('lists')->insertGetId([
                    'title' => Str::random(10),
                    'project_id' => $projectId
                ]);

                for ($z=1; $z < 11-1; $z++) {
                    DB::table('tasks')->insert([
                        'title' => Str::random(10),
                        'description' => Str::random(30),
                        'deadline' => $seedDate,
                        'list_id' => $listId    
                    ]);
                }
            }
        }
        
        
    }
}
