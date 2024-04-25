<?php

namespace Database\Seeders;

use App\Models\Order\Order;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * 
     * Run the database seeds.
     * 
     */
    public function run(): void
    {
        // ============ Order Status ============ \\
        // DB::table('order_status')->insert([
        //     ['name' => 'paid', 'color' => '#00FF00'], // Green color for 'paid' status
        //     ['name' => 'pending', 'color' => '#FFFF00'], // Yellow color for 'pending' status
        //     ['name' => 'cancelled', 'color' => '#FF0000'], // Red color for 'cancelled' status
        // ]);

        // ===>> Create Order Records
        $data = [];
        for ($i = 1; $i <= 100; $i++) {

            $data[] = [
                'receipt_number'    => $this->generateReceiptNumber(),
                'cashier_id'        => rand (2, 11),
                'total_price'       => 0,
                'ordered_at'        => Date('Y-m-d H:i:s')
            ];
        }

        // ===>> Create Order Records
        DB::table('order')->insert($data);

        // ===>> Create Order Detail
        $orders = Order::get();
        
        foreach ($orders as $order) {
            
            $details        = [];
            $totalPrice     = 0; 
            $nOfDetails     = rand(1, 6); 

            for ($i = 1; $i <= $nOfDetails; $i++) {

                $product    = DB::table('product')->find(rand(1, 20));
                $qty        = rand(1, 10);
                $totalPrice += $product->unit_price * $qty;

                $details[]  = [
                    'order_id'      => $order->id,
                    'product_id'    => $product->id,
                    'qty'           => $qty,
                    'unit_price'    => $product->unit_price
                ];
            }

            DB::table('order_details')->insert($details);

            // ===>> Update table order for total price

            $order->total_price     = $totalPrice;
            $order->save();
        }
    }

    public function generateReceiptNumber()
    {

        $number     = rand(100000, 999999);
        $check      = DB::table('order')->where('receipt_number', $number)->first();

        if ($check) {

            return $this->generateReceiptNumber();

        } else {

            return $number;

        }
    }
}
