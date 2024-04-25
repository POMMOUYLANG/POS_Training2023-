<?php

namespace App\Http\Controllers\Admin;

// ============================================================================>> Core Library
use Illuminate\Http\Request; // For Getting requested Payload from Client
use Illuminate\Http\Response; // For Responsing data back to Client

// ============================================================================>> Third Party Library កខគឃង
use Carbon\Carbon; // Data Time format & Calculation

// ============================================================================>> Custome Library
// Controller
use App\Http\Controllers\MainController;

// Service
use App\Services\FileUpload; // Upload Image/File to File Micro Serivce

// Model
use App\Models\Product\Product;

class ProductController extends MainController
{
    public function getData(Request $req){

        // Declar Variable
        $data = Product::select('*')
        ->with(['type'])
        ;

        // ===>> Filter Data
        // By Key compared with Code or Name
        if ($req->key && $req->key != '') {

            $data = $data->where('code', 'LIKE', '%' . $req->key . '%')
            ->Orwhere('name', 'LIKE', '%' . $req->key . '%');
        }

        // By Product Type
        if ($req->type && $req->type != 0) {

            $data = $data->where('type_id', $req->type);

        }

        $data = $data->orderBy('id', 'desc') // Order Data by Giggest ID to small
        ->paginate($req->limit ? $req->limit : 10,'per_page'); // Paginate Data

        // ===> Success Response Back to Client
        return response()->json($data, Response::HTTP_OK);

    }

    public function view($id = 0){

        // Find record from DB
        $data = Product::select('*')->find($id);

        // ===>> Check if data is valide
        if ($data) { // Yes

            // ===> Success Response Back to Client
            return response()->json($data, Response::HTTP_OK);

        } else { // No

            // ===> Failed Response Back to Client
            return response()->json([
                'status'    => 'បរាជ័យ',
                'message'   => 'ទិន្នន័យមិនត្រឹមត្រូវ',
            ], Response::HTTP_BAD_REQUEST);

        }

    }

    public function create(Request $req){

        // ===>> Check validation
        $this->validate(
            $req,
            [
                'name'              => 'required|max:50',
                'code'              => 'required|max:20',
                'unit_price'        => 'required|numeric',
                'type_id'           => 'required|exists:products_type,id'
            ],
            [
                'name.required'         => 'សូមបញ្ចូលឈ្មោះផលិតផល',
                'name.max'              => 'ឈ្មោះផលិតផលមិនអាចលើសពី50ខ្ទង់',

                'code.required'         => 'សូមបញ្ចូលឈ្មោះលេខកូដផលិតផល',
                'code.max'              => 'សូមបញ្ចូលឈ្មោះលេខកូដផលិតផលមិនអាចលើសពី២០ខ្ទង់',

                'unit_price.required'   => 'សូមបញ្ចូលតម្លៃរាយ',
                'unit_price.numeric'    => 'សូមបញ្ចូលតម្លៃរាយជាលេខ',

                'type_id.exists'        => 'សូមជ្រើសរើសឈ្មោះផលិតផល អោយបានត្រឹមត្រូវ កុំបោកពេក'

            ]
        );

        // ===>> Create Product
        // Map field of table in DB Vs. requested value from client
        $product                =   new Product;
        $product->name          =   $req->name;
        $product->code          =   $req->code;
        $product->type_id       =   $req->type_id;
        $product->unit_price    =   $req->unit_price;

        // ===>> Save To DB
        $product->save();

        // ===>> Image Upload
        if ($req->image) {

            // Need to create folder before storing images
            $folder = Carbon::today()->format('d-m-y');

            // ===>> Send to File Service
            $image  = FileUpload::uploadFile($req->image, 'products/', $req->fileName);

            // ===>> Check if image has been successfully uploaded
            if ($image['url']) {

                // Map field of table in DB Vs. uri from File Service
                $product->image     = $image['url'];

                // ===>> Save to DB
                $product->save();

            }
        }

        // ===> Success Response Back to Client
        return response()->json([
            'data'      =>  Product::select('*')->with(['type'])->find($product->id),
            'message'   => 'ផលិតផលត្រូវបានបង្កើតដោយជោគជ័យ។'
        ], Response::HTTP_OK);

    }

    public function update(Request $req, $id = 0){

        // ===>> Check validation
        $this->validate(
            $req,
            [
                'name'              => 'required|max:20',
                'code'              => 'required|max:20',
                'unit_price'        => 'required',
                'type_id'           => 'required|exists:products_type,id'
            ],
            [
                'name.required'         => 'សូមបញ្ចូលឈ្មោះផលិតផល',
                'name.max'              => 'ឈ្មោះផលិតផលមិនអាចលើសពី២០ខ្ទង់',
                'unit_price.required'   => 'សូមបញ្ចូលឈ្មោះ unit_price',
                'code.required'         => 'សូមបញ្ចូលឈ្មោះលេខកូដផលិតផល',
                'code.max'              => 'សូមបញ្ចូលឈ្មោះលេខកូដផលិតផលមិនអាចលើសពី២០ខ្ទង់',
                'type_id.exists'        => 'សូមជ្រើសរើសឈ្មោះផលិតផល'
            ]
        );

        // ===>> Update Product
        // Find record from DB
        $product                    = Product::find($id);

        // ===>> Check if data is valide
        if ($product) { //Yes

            // Map field of table in DB Vs. requested value from client
            $product->name          = $req->name;
            $product->code          = $req->code;
            $product->type_id       = $req->type_id;
            $product->unit_price    = $req->unit_price;

            // ===>> Save to DB
            $product->save();

            // ===>> Image Upload
            if ($req->image) {

                // Need to create folder before storing images
                $folder = Carbon::today()->format('d-m-y');

                // ===>> Send to File Service
                $image  = FileUpload::uploadFile($req->image, 'products/', $req->fileName);

                // ===>> Check if image has been successfully uploaded
                if ($image['url']) {

                    // Map field of table in DB Vs. uri from File Service
                    $product->image     = $image['url'];

                    // ===>> Save to DB
                    $product->save();

                }
            }

            // Prepare Data backt to Client
            $product = Product::select('*')
            ->with([
                'type'
            ])
            ->find($product->id);

            // ===> Success Response Back to Client
            return response()->json([
                'status'    => 'ជោគជ័យ',
                'message'   => 'ផលិតផលត្រូវបានកែប្រែជោគជ័យ',
                'product'   => $product,
            ], Response::HTTP_OK);

        } else { // No

            // ===> Failed Response Back to Client
            return response()->json([

                'status'    => 'បរាជ័យ',
                'message'   => 'ទិន្នន័យមិនត្រឹមត្រូវ',

            ], Response::HTTP_BAD_REQUEST);

        }

    }

    public function delete($id = 0){

        // Find record from DB
        $data = Product::find($id);

        // ===>> Check if data is valide
        if ($data) { // Yes

            // ===>> Delete Data from DB
            $data->delete();

            // ===> Success Response Back to Client
            return response()->json([
                'status'    => 'ជោគជ័យ',
                'message'   => 'ទិន្នន័យត្រូវបានលុប',
            ], Response::HTTP_OK);

        } else { // No

            // ===> Failed Response Back to Client
            return response()->json([
                'status'    => 'បរាជ័យ',
                'message'   => 'ទិន្នន័យមិនត្រឹមត្រូវ',
            ], Response::HTTP_BAD_REQUEST);

        }
    }

    public function getProduct($id = 0, Request $req){
        try {

            // Fetch a specific product by ID
            $product = Product::with(['orderDetails.order'])
                ->find($id);
                    
            if (!$product) {
                // Return an error response if the product is not found
                return response()->json(['error' => 'Product not found.'], Response::HTTP_NOT_FOUND);
            }

             // ===>> Date Range
            // Date Range Filter
        if ($req->from && $req->to && $this->_isValidDate($req->from) && $this->_isValidDate($req->to)) {
            $product->orderDetails = $product->orderDetails->filter(function ($orderDetail) use ($req) {
                $orderedAt = strtotime($orderDetail->order->ordered_at);
                $fromTimestamp = strtotime($req->from . " 00:00:00");
                $toTimestamp = strtotime($req->to . " 23:59:59");
                return $orderedAt >= $fromTimestamp && $orderedAt <= $toTimestamp;
            });
        }

        // Filter by receipt number if it's provided in the request
        if ($req->has('receipt_number') && $req->filled('receipt_number')) {
            $product->orderDetails = $product->orderDetails->filter(function ($orderDetail) use ($req) {
                return $orderDetail->order->receipt_number == $req->input('receipt_number');
            });
        }

        // Get the limit from the request or use a default of 10
        $limit = $req->input('limit', 10);

        // Paginate the orderDetails array with the specified limit
        $orderDetails = new \Illuminate\Pagination\LengthAwarePaginator(
            $product->orderDetails->values()->forPage($req->input('page', 1), $limit),
            count($product->orderDetails),
            $limit,
            $req->input('page', 1)
        );

        // Append the paginated orderDetails to the product
        $product->setRelation('orderDetails', $orderDetails);

        // Return the product along with its paginated and ordered orderDetails
        return response()->json($product, Response::HTTP_OK);
        
        } catch (\Exception $e) {
            // Handle any exceptions, if needed
            return response()->json([
                'status'    => 'បរាជ័យ',
                'message'   => 'ទិន្នន័យមិនត្រឹមត្រូវ',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

}

