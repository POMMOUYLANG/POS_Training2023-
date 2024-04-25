<?php

namespace App\Http\Controllers\Admin;

// =================================================>> Core Library
use Illuminate\Http\Response; // For Responsing data back to Client

// ============================================================================>> Custom Library
// Controller
use App\Http\Controllers\MainController;

// Model
use App\Models\Order\Order;

class DashboardController extends MainController
{
    public function getDashboardInfo(){

        // ===>> Get order data from DB and sum total_price using Function Sum
        $totalSaleToday = Order::sum('total_price');

        // ===>> Prepare response format
        $data = [
            'total_sale_today'      => $totalSaleToday
        ];

        // ===>> Success Response Back to Client
        return response()->json($data, Response::HTTP_OK);

    }
}
