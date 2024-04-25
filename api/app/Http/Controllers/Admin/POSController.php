<?php

namespace App\Http\Controllers\Admin;

// ============================================================================>> Core Library
use Illuminate\Http\Request; // For Getting requested Payload from Client
use Illuminate\Http\Response; // For Responsing data back to Client

// ============================================================================>> Third Library
use Tymon\JWTAuth\Facades\JWTAuth; // Get Current Logged User

// ============================================================================>> Custom Library
// Controller
use App\Http\Controllers\MainController;

// Service
use App\Services\TelegramService; //Send Notifications to Telegram Bot

// Model
use App\Models\Product\Type as ProductType; // Rename
use App\Models\Product\Product;
use App\Models\Order\Order;
use App\Models\Order\Detail as OrderDetail; // Rename


class POSController extends MainController
{
    public function getProducts(){

        // ===>> Get Data from DB (group by Product type from DB)
        $data = ProductType::select('id', 'name')
            ->with([
            'products:id,name,image,type_id,unit_price' // 1:M
        ])
        ->get();

        // ===> Success Response Back to Client
        return response()->json($data, Response::HTTP_OK);

    }

    public function makeOrder(Request $req){

        // ===>> Check validation
        $this->validate($req, [
            'cart'      => 'required|json'
        ]);

        //==============================>> Get Current Login User to save who make orders.
        $user = JWTAuth::parseToken()->authenticate();

        // ===>> Create Order
        $order                  = new Order;
        $order->cashier_id      = $user->id; // the current login account
        $order->total_price     = 0; // Set to 0 first. Find total Price later
        $order->receipt_number  = $this->_generateReceiptNumber(); // return 6 digit unique random invoice number.

        // ===>> Save To DB
        $order->save();

        // ===>> Find Total Price & Order Detail
        $details    = [];
        $totalPrice = 0;
        $cart       = json_decode($req->cart); // Turn Json String to PHP Array.

        // ===>> Loop Each Product ID along with QTY
        foreach ($cart as $productId => $qty) {

            // ===>> Find Each Product by ID
            $product = Product::find($productId);

            // ===>> Check if product is valid
            if ($product) { // Yes

                // ===>> Add New Record to Array
                $details[] = [
                    'order_id'      => $order->id,
                    'product_id'    => $productId,
                    'qty'           => $qty,
                    'unit_price'    => $product->unit_price,
                ];

                // ===>> Calculate the total Price
                $totalPrice +=  $qty * $product->unit_price;

            }
        }

        // ===>> Save Order Detail to DB
        OrderDetail::insert($details);

        // ===>> Update Order
        $order->total_price     = $totalPrice;
        $order->ordered_at      = Date('Y-m-d H:i:s');
        $order->save();

        // ===> Get Data for Client Reponse to view the order in Popup.
        $orderData = Order::select('*')
        ->with([

            'cashier:id,name,type_id', // M:1
            'cashier.type:id,name',  // M:1

            'details:id,order_id,product_id,unit_price,qty', // 1:M
            'details.product:id,name,type_id', // M:1 (order_details -> product)
            'details.product.type:id,name'  // M:1 (product -> products_type)

        ])
        ->find($order->id);

        // ===>> Send Telegram Notification
        $this->_sendNotification($orderData);

        // ===> Success Response Back to Client
        return response()->json([
            'order'         => $orderData,
            'message'       => 'ការបញ្ជាទិញត្រូវបានបង្កើតដោយជោគជ័យ។'
        ], Response::HTTP_OK);

    }

    private function _generateReceiptNumber(){

        // ===>> Generate 6 Random Number bigger than 1000000 and smaller than 9999999
        $number = rand(1000000, 9999999);

        // ===>> Get Data from DB the random number
        $data  = Order::where('receipt_number', $number)->first();

        // ===>> Check if the number exist in th DB record
        if ($data) { // Yes exist

            // ===>> Check Again
            return $this->_generateReceiptNumber();
        }

        // ===>> Return the unique number back
        return $number;
    }

    private function _sendNotification($orderData){

        // ===>> Prepare Header Format
        $htmlMessage = "<b>ការបញ្ជាទិញទទួលបានជោគជ័យ!</b>\n";
        $htmlMessage .= "- លេខវិកយប័ត្រ៖ " . $orderData->receipt_number . "\n";
        $htmlMessage .= "- អ្នកគិតលុយ៖ " . $orderData->cashier->name;

        $productList    = '';
        $totalProducts  = 0;

        // ===>> Prepare Detail Format & Find total Price
        foreach ($orderData->details as $detail) {
            $productList .= sprintf(
                "%-20s | %-15s | %-10s | %s\n",
                $detail->product->name,
                $detail->unit_price,
                $detail->qty,
                PHP_EOL
            );
            $totalProducts += $detail->qty;
        }

        // ===>> Prepare Footer Format
        $htmlMessage .= "\n---------------------------------------\n";
        $htmlMessage .= "ផលិតផល             | តម្លៃដើម(៛)     | បរិមាណ\n";
        $htmlMessage .= $productList . "\n";
        $htmlMessage .= "<b>* សរុបទាំងអស់៖</b> $totalProducts ទំនិញ $orderData->total_price ៛\n";
        $htmlMessage .= "- កាលបរិច្ឆេទ: " . $orderData->ordered_at;

        // ===>> Send to Telegram Server
        TelegramService::sendMessage($htmlMessage);

    }
}
