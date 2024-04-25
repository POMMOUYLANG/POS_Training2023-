<?php

namespace App\Http\Controllers\Admin;

// ============================================================================>> Core Library
use Illuminate\Http\Request; // For Getting Request from Client
use Illuminate\Http\Response; // To Response Back to Client

// ============================================================================>> Third Library
use Tymon\JWTAuth\Facades\JWTAuth; // Get Currently Logged in User

// ================================>> Custom Library

// Use Controller
use App\Http\Controllers\MainController;

// Model
use App\Models\Order\Order;

class SaleController extends MainController
{
    // Declare function Validate
    private function _isValidDate($data)
    {
        if (false === strtotime($data)) {
            return false;
        } else {
            return true;
        }
    }

    public function getData(Request $req) 
    {
        // Initialize Query Builder
        $data = Order::select('*')
        ->with([
            'cashier', // M:1
            'details' // 1:M
        ]);

        // Filter by Date Range
        if ($req->from && $req->to && $this->_isValidDate($req->from) && $this->_isValidDate($req->to)) {
            $data = $data->whereBetween('created_at', [$req->from . " 00:00:00", $req->to . " 23:59:59"]);
        }

        // Filter by Receipt Number
        if ($req->receipt_number && $req->receipt_number != "") {
            $data = $data->where('receipt_number', $req->receipt_number);
        }

        // Filter by Receipt Number
        if ($req->receipt_number) {
            $data = $data->where('receipt_number', $req->receipt_number);
        }

        // Filter by Cashier ID
        $user = JWTAuth::parseToken()->authenticate();
        if ($user->type_id == 2) {
            $data = $data->where('cashier_id', $user->id);
        }

        // Order by ID in Descending Order
        $data = $data->orderBy('id', 'desc')
        ->paginate($req->limit ? $req->limit : 10);

        // Return JSON Response
        return response()->json($data, Response::HTTP_OK);
    }

    // Declare function Delete
    public function delete($id = 0)
    {

        // Retrieve Order Data
        $data = Order::find($id);

        // Check if Order Data Exists
        if ($data) {

            // Delete Order
            $data->delete();
            
            // Return JSON Response (Success)
            return response()->json([
                'status'    => 'ជោគជ័យ',
                'message'   => 'ទិន្នន័យត្រូវបានលុប',
            ], Response::HTTP_OK);
            
        } else {

            // Return JSON Response (Failure)
            return response()->json([
                'status'    => 'បរាជ័យ',
                'message'   => 'ទិន្នន័យមិនត្រឹមត្រូវ។',
            ], Response::HTTP_BAD_REQUEST);
        }
    }


}
