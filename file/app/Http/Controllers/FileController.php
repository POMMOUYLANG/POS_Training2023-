<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function index(Request $request)
    {
        //validation
        $this->validate(
            $request,
            [
                'project'           => 'required',
                'file'              => 'required',
                'folder'            => 'required',
            ],
            [
                'project.required'          => 'Please input project',
                'file.required'             => 'Please input base64 file',
                'folder.required'           => 'Please input folder',
            ]
        );

        $project   = strtolower($request->project);
        $folder    = strtolower($request->folder);
        $fileName  = $request->fileName;
        $file      = $request->file;
        $extension = '';

        $info       = substr($file, 5, strpos($file, ';') - 5);
        $extension = explode("/", $info);

        if (isset($extension[1])) {
            
            $ext = strtolower($extension[1]);
            if (strpos($ext, '+') !== false) {

                $result     =  explode("+", $ext);
                $extension  = $result[0];

            } else {

                $extension = $ext;

            }

        }

        //get file
        $image_parts = explode(";base64,", $file);
        $image_base64 = base64_decode($image_parts[1]);
        
        if (!$fileName) {
            $fileName = uniqid();
        }

        //Find folder exists or not
        $mkdir_folder = 'uploads/' . $project . '/' . $folder;
        if (!file_exists($mkdir_folder)) {
            mkdir($mkdir_folder, 0777, true);
        }
        //Find full url
        $uri = 'uploads/' . $project . '/' . $folder . '/' . $fileName . '.' . $extension;
        file_put_contents($uri, $image_base64);

        return response()->json([
            'status_code' => 200,
            'url' => 'uploads/' . $project . '/' . $folder . '/' . $fileName . '.' . $extension
        ], 200);

    }
}
