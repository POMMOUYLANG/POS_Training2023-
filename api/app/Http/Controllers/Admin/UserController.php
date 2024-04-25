<?php

namespace App\Http\Controllers\Admin;

// ============================================================================>> Core Library
use Illuminate\Http\Request; // For Getting requested Payload from Client
use Illuminate\Http\Response; // For Responsing data back to Client
use Illuminate\Support\Facades\Hash; // For Encripting data

// ============================================================================>> Third Party Library
use Carbon\Carbon; // Data Time format & Calculation

// ============================================================================>> Custom Library
// Controller
use App\Http\Controllers\MainController;

// Service
use App\Services\FileUpload; // Upload Image/File to File Micro Serivce

// Model
use App\Models\User\Type;
use App\Models\User\User;

class UserController extends MainController
{
    public function getUserType()
    {

        // ===>> Get Data from Database
        $data = Type::get();

        // ===>> Success Response Back to Client
        return response()->json($data, Response::HTTP_OK);
    }

    public function getData(Request $req)
    {

        // ===>> Get Data from DB
        $data = User::select('id', 'name', 'phone', 'email', 'type_id', 'avatar', 'created_at', 'is_active')
            ->with([
                'type' // M:1
            ]);

        // ===>>> Filter
        // By Key for Name or Phone Number
        if ($req->key && $req->key != '') {
            $data = $data->where('name', 'LIKE', '%' . $req->key . '%')->Orwhere('phone', 'LIKE', '%' . $req->key . '%');
        }

        // Order Data from Latest ID
        $data = $data->orderBy('id', 'desc')

            // Pagination limited by 10
            ->paginate($req->limit ? $req->limit : 10,);

        // Success Response Back to Client
        return response()->json($data, Response::HTTP_OK);
    }

    public function view($id = 0)
    {

        // ===>> Get Data From Database
        $data = User::select('id', 'name', 'phone', 'email', 'avatar', 'type_id', 'avatar', 'created_at', 'is_active')
            ->with(['type'])->find($id);

        // Check if Data is valid.
        if ($data) { // Yes

            // ===> Success Response Back to Client
            return response()->json($data, Response::HTTP_OK);
        } else { // No

            // ===> Failed Response Back to Client
            return response()->json([
                'status'  => 'fail',
                'message' => 'រកទិន្នន័យមិនឃើញក្នុងប្រព័ន្ធ'
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function create(Request $req)
    {

        // === >> Check validation
        $this->validate(
            $req,
            [
                'type_id'       => 'required|min:1|max:20',
                'name'          => 'required|min:1|max:20',
                'phone'         => 'required|unique:user,phone',
                'password'      => 'required|min:6|max:20',
                'email'         => 'unique:user,email'
            ],
            [
                'name.required'     => 'សូមវាយបញ្ចូលឈ្មោះរបស់អ្នក',
                'phone.required'    => 'សូមវាយបញ្ចូលលេខទូរស័ព្ទរបស់អ្នក',
                'phone.unique'      => 'លេខទូរស័ព្ទនេះត្រូវបានប្រើប្រាស់រួចហើយនៅក្នុងប្រព័ន្ធ',
                'email.unique'      => 'អ៊ីមែលនេះមានក្នុងប្រព័ន្ធរួចហើយ',
                'password.required' => 'សូមវាយបញ្ចូលពាក្យសម្ងាត់របស់អ្នក',
                'password.min'      => 'សូមបញ្ចូលលេខសម្ងាត់ធំជាងឬស្មើ៦',
                'password.max'      => 'សូមបញ្ចូលលេខសម្ងាត់តូចឬស្មើ២០'
            ]
        );

        //==============================>> Start Adding data
        // Mapping between database table field and requested data from client
        $user            =   new User;
        $user->name      =   $req->name;
        $user->type_id   =   $req->type_id;
        $user->phone     =   $req->phone;
        $user->email     =   $req->email;
        $user->password  =   Hash::make($req->password); //Make sure no one can understand it even DB Admin.
        $user->is_active =   1;
        $user->avatar    =   'static/icon/user.png'; // Static Picture

        // ===>> Upload Avatar to File Service
        // Check if having request 'image' from client
        if ($req->image) { // Yes

            // Call to File Service
            $image     = FileUpload::uploadFile($req->image, 'users', $req->fileName);

            // Only valid url can be used.
            if ($image['url']) {
                $user->avatar = $image['url'];
            }
        }

        // ===>> Save to DB
        $user->save();

        // ===> Success Response Back to Client
        return response()->json([
            'user'  => User::select('id', 'name', 'phone', 'email', 'type_id', 'avatar', 'created_at', 'is_active')->with(['type'])->find($user->id),
            'message' => 'User: ' . $user->name . ' has been successfully created.'
        ], Response::HTTP_OK);
    }

    public function update(Request $req, $id = 0)
    {

        // ==>> Check validation
        $this->validate(
            $req,
            [
                'name'     => 'required',
                'phone'    => 'required',
            ],
            [
                'name.required'     => 'សូមវាយបញ្ចូលឈ្មោះរបស់អ្នក',
                'phone.required'    => 'សូមវាយបញ្ចូលលេខទូរស័ព្ទរបស់អ្នក',
            ]
        );

        // Unique Phone Number Validation
        $check  = User::where('id', '!=', $id)->where('phone', $req->phone)->first();
        if ($check) { // Yes

            // ===> Failed Response Back to Client
            return response()->json([
                'status'    => 'បរាជ័យ',
                'message'   => 'លេខទូរស័ព្ទនេះត្រូវបានប្រើប្រាស់រួចហើយនៅក្នុងប្រព័ន្ធ',
            ], Response::HTTP_BAD_REQUEST);
        }

        // Unique Email Validation
        $check  = User::where('id', '!=', $id)->where('email', $req->email)->first();
        if ($check) { // Yes

            // ===> Failed Response Back to Client
            return response()->json([
                'status'    => 'បរាជ័យ',
                'message'   => 'អ៊ីមែលនេះមានក្នុងប្រព័ន្ធរួចហើយ',
            ], Response::HTTP_BAD_REQUEST);
        }

        //==============================>> Start Updating data
        // Get Data from DB
        $user = User::select('id', 'name', 'phone', 'email', 'type_id', 'avatar', 'created_at', 'is_active')->with(['type'])->find($id);
        if ($user) { // Yes

            // Mapping between database table field and requested data from client
            $user->name      =   $req->name;
            $user->type_id   =   $req->type_id;
            $user->phone     =   $req->phone;
            $user->email     =   $req->email;
            $user->is_active =   $req->is_active;

            // Call to File Service
            if ($req->image) {

                // Call File Service
                $image     = FileUpload::uploadFile($req->image, 'users', $req->fileName);

                // Only valid url can be used.
                if ($image['url']) {

                    // Mapping between database table field and uri from File Service
                    $user->avatar = $image['url'];
                }
            }

            // ===>> Save to DB
            $user->save();

            // ===>> Success Response Back to Client
            return response()->json([
                'status'    => 'ជោគជ័យ',
                'message'   => 'ទិន្នន័យត្រូវបានកែប្រែ',
                'user'      => $user,
            ], Response::HTTP_OK);
        } else { // No

            // ===>> Failed Response Back to Client
            return response()->json([
                'status'    => 'បរាជ័យ',
                'message'   => 'ទិន្នន័យដែលផ្តល់ឲ្យមិនត្រូវទេ',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function delete($id = 0)
    {

        // ===>> Get Data from DB
        $data = User::find($id);

        //====>> Check if Data is Valid
        if ($data) { // Yes

            // Delete Data from DB
            $data->delete();

            // ===>> Success Response Back to Client
            return response()->json([
                'status'    => 'ជោគជ័យ',
                'message'   => 'ទិន្នន័យត្រូវបានលុយចេញពីប្រព័ន្ធ',
            ], Response::HTTP_OK);
        } else { // No

            // ===>> Failed Response Back to Client
            return response()->json([
                'status'    => 'បរាជ័យ',
                'message'   => 'ទិន្នន័យដែលផ្តល់ឲ្យមិនត្រូវ',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function changePassword(Request $req, $id = 0)
    {

        // ===>> Check validation
        $this->validate($req, [
            'password' => 'required|min:6|max:20',
            'confirm_password'  => 'required|same:password',
        ], [
            'password.required' => 'សូមបញ្ចូលលេខសម្ងាត់',
            'password.min'      => 'សូមបញ្ចូលលេខសម្ងាត់ធំជាងឬស្មើ៦',
            'password.max'      => 'សូមបញ្ចូលលេខសម្ងាត់តូចឬស្មើ២០',
            'confirm_password.required' => 'សូមបញ្ចូលបញ្ជាក់ពាក្យសម្ងាត់',
            'confirm_password.same'     => 'សូមបញ្ចូលបញ្ជាក់ពាក្យសម្ងាត់ឲ្យដូចលេខសម្ងាត់',

        ]);

        // ===>> Get User from DB
        $user = User::find($id);

        // ===>> Check if User is Valid
        if ($user) { // Yes

            // Mapping between database table field and requested data from client
            $user->password                 = Hash::make($req->password); //Make sure no one can understand it even DB Admin.
            $user->password_last_updated_at = Carbon::now()->format('Y-m-d H:i:s');

            // Save to DB
            $user->save();

            // ===>> Success Response Back to Client
            return response()->json(
                [
                    'message' => 'លេខសម្ងាត់របស់ត្រូវបានកែប្រែ',
                    'user' => $user
                ],
                Response::HTTP_OK
            );
        } else { // No

            // ===>> Failed Response Back to Client
            return response()->json([
                'status'    => 'បរាជ័យ',
                'message'   => 'មិនមានទិន្នន័យក្នុងប្រព័ន្ធ',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function block(Request $req, $id = 0)
    {

        // ===>> Get User from DB
        $user = User::find($id);

        // ===>> Check if User is Valid
        if ($user) { // Yes

            // Mapping between database table field and turn reverse status
            $user->is_active  =  !$user->is_active;

            // Save to DB
            $user->save();

            // ===>> Success Response Back to Client
            return response()->json([
                'status'    => 'Success',
                'message'   => 'User successfully modified',
                'user'      => $user,
            ], Response::HTTP_OK);
        } else { // Yes

            // ===>> Failed Response Back to Client
            return response()->json([
                'status'    => 'Fail',
                'message'   => 'Invalid data',
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}

/*
|--------------------------------------------------------------------------
| Develop by: Yim Klok
|--------------------------------------------------------------------------
|
| date: 23/02/2023.
| location: Manistry of Public Works and Transport - MPWT
| By: CamCyber Digital Tech Team
|
*/
