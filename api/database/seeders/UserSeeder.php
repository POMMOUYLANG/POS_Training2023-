<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
        |--------------------------------------------------------------------------
        | Create User Type: Admin & Staff
        |--------------------------------------------------------------------------
        */
        DB::table('users_type')->insert(
            [
                ['name' => 'Admin'],
                ['name' => 'Staff'],
            ]
        );
        /*
        |--------------------------------------------------------------------------
        | Create User
        |--------------------------------------------------------------------------
        */
        $users =  [
            [
                'type_id'       => 1,
                'email'         => 'yimklok.kh@gmail.com',
                'phone'         => '0977779688',
                'password'      => bcrypt('123456'),
                'is_active'     => 1,
                'name'          => 'Yim Klok',
                'avatar'        => 'static/icon/user.png',
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'    =>  Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'type_id'       => 1,
                'email'         => 'mouylangpom@gmail.com',
                'phone'         => '069310609',
                'password'      => bcrypt('123456'),
                'is_active'     => 1,
                'name'          => 'POM MOUYLANG',
                'avatar'        => 'static/icon/user.png',
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'    =>  Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'type_id'       => 2,
                'email'         => 'kimlay@gmail.com',
                'phone'         => '098787839',
                'password'      => bcrypt('123456'),
                'is_active'     => 1,
                'name'          => 'CHOENG KIMLAY',
                'avatar'        => 'static/icon/user.png',
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'    =>  Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'type_id'       => 2,
                'email'         => 'tey@gmail.com',
                'phone'         => '087609971',
                'password'      => bcrypt('123456'),
                'is_active'     => 1,
                'name'          => 'TEY',
                'avatar'        => 'static/icon/user.png',
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'    =>  Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'type_id'       => 2,
                'email'         => 'sreylen@gmail.com',
                'phone'         => '0967810046',
                'password'      => bcrypt('123456'),
                'is_active'     => 1,
                'name'          => 'LEN',
                'avatar'        => 'static/icon/user.png',
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'    =>  Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'type_id'       => 2,
                'email'         => 'sreyroth@gmail.com',
                'phone'         => '012662033',
                'password'      => bcrypt('123456'),
                'is_active'     => 1,
                'name'          => 'ROTH',
                'avatar'        => 'static/icon/user.png',
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'    =>  Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'type_id'       => 2,
                'email'         => 'dara@gmail.com',
                'phone'         => '0963180249',
                'password'      => bcrypt('123456'),
                'is_active'     => 1,
                'name'          => 'DARA',
                'avatar'        => 'static/icon/user.png',
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'    =>  Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'type_id'       => 2,
                'email'         => 'tongmeng@gmail.com',
                'phone'         => '087544835',
                'password'      => bcrypt('123456'),
                'is_active'     => 1,
                'name'          => 'TONGMENG',
                'avatar'        => 'static/icon/user.png',
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'    =>  Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'type_id'       => 2,
                'email'         => 'phearith@gmail.com',
                'phone'         => '069265958',
                'password'      => bcrypt('123456'),
                'is_active'     => 1,
                'name'          => 'PHEARITH',
                'avatar'        => 'static/icon/user.png',
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'    =>  Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'type_id'       => 2,
                'email'         => 'rongrath@gmail.com',
                'phone'         => '0967677517',
                'password'      => bcrypt('123456'),
                'is_active'     => 1,
                'name'          => 'RONGRATH',
                'avatar'        => 'static/icon/user.png',
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'    =>  Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'type_id'       => 2,
                'email'         => 'chin@gmail.com',
                'phone'         => '0975063390',
                'password'      => bcrypt('123456'),
                'is_active'     => 1,
                'name'          => 'CHIN',
                'avatar'        => 'static/icon/user.png',
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'    =>  Carbon::now()->format('Y-m-d H:i:s')
            ],
            
        ];

        /*
        |--------------------------------------------------------------------------
        | Write To Database
        |--------------------------------------------------------------------------
        |
        | It will insert to table users of database minimart.
        |
        */
        DB::table('user')->insert($users);
    }
}
