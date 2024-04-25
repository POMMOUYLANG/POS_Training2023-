<?php

namespace App\Http\Controllers\Testing;

// ===================================================>> Core Library
use Illuminate\Http\Request;
use Illuminate\Http\Response;

// ===================================================>> Custom Library
use App\Http\Controllers\MainController;

class TestingController extends Controller
{
    public function looping(Request $req){

        $a = $req->a;
        $b = $req->b;

        return $this->sum($a, $b);

    }

    private function sum($x = 0, $y = 0){

        return $x+$y;

    }

    public function sendTelegramBot(Request $req){

        // return $req;

        $token      = "bot6876532308:AAHA9qPRUYtZiZoFaKGvPQXL9radOFT67wI"; // Yor token
        $tgApiHost  = "https://api.telegram.org/".$token;
        $chatId     = "-1002001247521";  //Receiver Chat Id

        $payload = [
            'chat_id'   =>      $chatId,
            //'text'      =>      $req->message,
            'latitude'      =>      $req->latitude,
            'longitude'      =>      $req->longitude,
        ];

        $ch = curl_init($tgApiHost . '/sendLocation');

        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, ($payload));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result = curl_exec($ch);
        curl_close($ch);

        return $result;


    }


}


