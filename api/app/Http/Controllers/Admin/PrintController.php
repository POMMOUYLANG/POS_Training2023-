<?php

namespace App\Http\Controllers\Admin;

// ============================================================================>> Core Library
use Illuminate\Support\Facades\Http; // Handling HTTP Request to Other Service

// ============================================================================>> Custom Library
// Controller
use App\Http\Controllers\MainController;

// Model
use App\Models\Order\Order;

class PrintController extends MainController
{
    //==================== Public Variable ====================
    private $JS_BASE_URL;
    private $JS_USERNAME;
    private $JS_PASSWORD;
    private $JS_TEMPLATE;

    public function __construct()
    {
        // ===>> Get JS Report configration from ENV
        $this->JS_BASE_URL = env('JS_BASE_URL');
        $this->JS_USERNAME = env('JS_USERNAME');
        $this->JS_PASSWORD = env('JS_PASSWORD');
    }

    public function printInvoice($receiptNumber = 0)
    {

        try {

            $payload = [
                "template" => [
                    "name" => '/invoice-pos/invoice-main',
                ],
                "data" => [
                    "data" => [$this->_getReceiptData($receiptNumber)],
                ]
                // "data" => $this->_getReceiptData($receiptNumber),
            ];

            // return $payload;

            // ===>> Send Request ot JS Report Service
            $response = Http::withBasicAuth($this->JS_USERNAME, $this->JS_PASSWORD)
            ->withHeaders([
                'Content-Type' => 'application/json',
            ])
            ->post($this->JS_BASE_URL . '/api/report', $payload);

            // ===> Success Response Back to Client
            return [
                'file_base64'   => base64_encode($response),
                'error'         => '',
            ];

        } catch (\Exception $e) {

            // Handle the exception
            return [
                'file_base64' => '',
                'error' => $e->getMessage(),
            ];
        }
    }


    private function _getReceiptData($receiptNumber = 0)
    {
        try {

            // ===>> Get Data from DB
            $data = Order::select('id', 'receipt_number', 'cashier_id', 'total_price', 'ordered_at')
            ->with([
                'cashier', // M:1
                'details' // 1:M
            ])
            ->where('receipt_number', $receiptNumber) // Condition
            ->first();

            // Return data Back
            return $data;

        } catch (\Exception $e) {

            // ===> Handle the exception
            return [
                'total' => 0,
                'data' => [],
                'error' => $e->getMessage(),
            ];
        }
    }

}
