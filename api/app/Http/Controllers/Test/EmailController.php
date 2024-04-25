<?php

namespace App\Http\Controllers;

use App\Mail\ResetPassword;
use Illuminate\Http\Request;
use App\Mail\TestEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class EmailController extends Controller
{
    //Just test implementation for send the eamil
    public function sendEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'title' => 'required',
            'body' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $details = [
            'title' => $request->title,
            'body' => $request->body,
            'otp'   => 123456
        ];

        Mail::to($request->email)->send(new TestEmail($details));
        // Mail::to($request->email)->send(new ResetPassword($details));

        return response()->json(['message' => 'Email sent successfully'], 200);
    }

    public function sendEmailRaw(Request $request)
    {
        $recipient = $request->email;
        $otp = 123456;
        $text = "Dear User,\n\nWe received a request to reset your password for your account with POS CamCyber System. To verify your identity and reset your password, please use the following One-Time Password (OTP):\n\nOTP: $otp\n\nIf you didn't request a password reset, please disregard this email. Your account's security is important to us.\n\nThis OTP is valid for a limited time. Do not share this OTP with anyone for security reasons.\n\nThank you for using POS CamCyber System!\n\nBest regards, MPWT\nPOS CamCyber System";

        Mail::raw($text, function ($message) use ($recipient) {
            $message->to($recipient)->subject('Reset Password');
        });

        return response()->json(['message' => 'Email sent successfully'], 200);
    }
}
