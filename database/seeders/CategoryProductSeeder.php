<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class CategoryProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 1; $i <= 5; $i++) {
            $category = Category::create([
                'name'        => 'Category ' . $i,
                'description' => $faker->sentence,
            ]);
            for ($j = 1; $j <= 5; $j++) {
                Product::create([
                    'category_id' => $category->id,
                    'name'        => $faker->words(3, true),
                    'description' => $faker->paragraph,
                    'image'       => 'https://api.arabgiftcard.com/upload/Cats/4ac0445c-91b8-4038-ab57-b4795acf4fe5.webp',
                    'stock'       => $faker->numberBetween(1, 100),
                    'price'       => $faker->randomFloat(2, 5, 200),
                    'created_at'  => now(),
                    'updated_at'  => now(),
                ]);
            }
        }

    }
}
