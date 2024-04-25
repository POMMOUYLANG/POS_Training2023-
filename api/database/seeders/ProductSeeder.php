<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*
        |-------------------------------------------------------------------------------
        | Add Product Type First because relationship from products_type to products 1:M
        |-------------------------------------------------------------------------------
        */
        DB::table('products_type')->insert(
            [
                ['name' => 'TV'],
                ['name' => 'Computer'],
                ['name' => 'Phone'],
                ['name' => 'IPad'],
                ['name' => 'Book'],
                ['name' => 'Bag'],
                ['name' => 'Shoe'],
                ['name' => 'Sport'],
                ['name' => 'Food'],
                ['name' => 'Drink'],
            ]
        );


        /*
        |-------------------------------------------------------------------------------
        | Add 20 Products
        |-------------------------------------------------------------------------------
        */
        DB::table('product')->insert(
            [
                [
                    'code' => 'L001',
                    'type_id' => '1',
                    'name' => 'The New Product',
                    'unit_price' => 1200000,
                    'image' => 'static/Products/TV/samsung.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L002',
                    'type_id' => '2',
                    'name' => 'The New Product',
                    'unit_price' => 1000000,
                    'image' => 'static/Products/Computer/msi.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L003',
                    'type_id' => '3',
                    'name' => 'The New Product',
                    'unit_price' => 4000000,
                    'image' => 'static/Products/Phone/Iphone.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L004',
                    'type_id' => '4',
                    'name' => 'The New Product',
                    'unit_price' => 4400000,
                    'image' => 'static/Products/IPad/Ipadup.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L005',
                    'type_id' => '5',
                    'name' => 'The New Product',
                    'unit_price' => 120000,
                    'image' => 'static/Products/Book/coding.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L006',
                    'type_id' => '6',
                    'name' => 'The New Product',
                    'unit_price' => 200000,
                    'image' => 'static/Products/Bag/bagstore.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L007',
                    'type_id' => '7',
                    'name' => 'The New Product',
                    'unit_price' => 100000,
                    'image' => 'static/Products/Shoe/nike.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L008',
                    'type_id' => '8',
                    'name' => 'The New Product',
                    'unit_price' => 10000,
                    'image' => 'static/Products/Sport/ball.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L009',
                    'type_id' => '9',
                    'name' => 'The New Product',
                    'unit_price' => 60000,
                    'image' => 'static/Products/Food/hamburger.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L010',
                    'type_id' => '10',
                    'name' => 'The New Product',
                    'unit_price' => 12000,
                    'image' => 'static/Products/Drink/coca.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L011',
                    'type_id' => '1',
                    'name' => 'The New Product',
                    'unit_price' => 1200000,
                    'image' => 'static/Products/TV/apple.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L012',
                    'type_id' => '2',
                    'name' => 'The New Product',
                    'unit_price' => 1000000,
                    'image' => 'static/Products/Computer/acer.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L013',
                    'type_id' => '3',
                    'name' => 'The New Product',
                    'unit_price' => 4000000,
                    'image' => 'static/Products/Phone/samsung.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L014',
                    'type_id' => '4',
                    'name' => 'The New Product',
                    'unit_price' => 4400000,
                    'image' => 'static/Products/IPad/IpadupII.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L015',
                    'type_id' => '5',
                    'name' => 'The New Product',
                    'unit_price' => 120000,
                    'image' => 'static/Products/Book/testing.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L016',
                    'type_id' => '6',
                    'name' => 'The New Product',
                    'unit_price' => 200000,
                    'image' => 'static/Products/Bag/baghome.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L017',
                    'type_id' => '7',
                    'name' => 'The New Product',
                    'unit_price' => 100000,
                    'image' => 'static/Products/Shoe/adidas.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L018',
                    'type_id' => '8',
                    'name' => 'The New Product',
                    'unit_price' => 10000,
                    'image' => 'static/Products/Sport/tennis.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L019',
                    'type_id' => '9',
                    'name' => 'The New Product',
                    'unit_price' => 60000,
                    'image' => 'static/Products/Food/chicken.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'code' => 'L020',
                    'type_id' => '10',
                    'name' => 'The New Product',
                    'unit_price' => 12000,
                    'image' => 'static/Products/Drink/passioncream.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                
            ]
        );
    }
}

