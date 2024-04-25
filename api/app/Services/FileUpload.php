<?php

namespace App\Services;

class FileUpload
{

    public static function uploadFile($file, $folder, $fileName)
    {

        $data = [
            'project'   => 'minimart',
            'file'      => $file,
            'folder'    => $folder,
            'fileName'  => $fileName
        ];

        $curl = curl_init();

        curl_setopt_array($curl, array(

            CURLOPT_URL => env('FILE_BASE_URL') . "/api/set-file",
            // CURLOPT_URL => "http://file:8000/api/set-file",

            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_FAILONERROR => true,
            CURLOPT_HTTPHEADER => array(
                "Accept: application/json",
            ),
        ));

        $response = curl_exec($curl);
        if (curl_errno($curl)) {
            return   ['url' => ""];
            //$error_msg = curl_error($curl);
        }
        curl_close($curl);

        return   json_decode($response, true);
    }
}
