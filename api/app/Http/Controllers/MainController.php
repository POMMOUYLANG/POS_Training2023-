<?php

namespace App\Http\Controllers;

// ============================================================================>> Core Library
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; // Performing Authorization Checks and Handling Unauthorized Access
use Illuminate\Foundation\Bus\DispatchesJobs; // Handling Queue Process
use Illuminate\Foundation\Validation\ValidatesRequests; // Input Validation
use Illuminate\Routing\Controller;

class MainController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}

