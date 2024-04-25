<?php

namespace App\Exceptions;

use BadMethodCallException;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\RelationNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        /*
        |--------------------------------------------------------------------------
        | NotFoundHttpException
        |--------------------------------------------------------------------------
        |
        | handle message for user request page, but not found in this api
        |
        */
        $this->renderable(function (NotFoundHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message'   => 'Page not found.',
                    'error'     => $e->getMessage()
                ], 404);
            }
        });

        /*
        |--------------------------------------------------------------------------
        | BadMethodCallException
        |--------------------------------------------------------------------------
        |
        | handle message for user request route, but do not have in controller
        |
        */
        $this->renderable(function (BadMethodCallException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message'   => 'Controller does not exist.',
                    'error'     => $e->getMessage()
                ], 400);
            }
        });

        /*
        |--------------------------------------------------------------------------
        | QueryException
        |--------------------------------------------------------------------------
        |
        | handle message for user request route, but do not have in model or database
        |
        */
        $this->renderable(function (QueryException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'http_status'   => 500,
                    'message'       => 'Column not found or base table doesn\'t exist.',
                    'error'         => $e->getMessage()
                ], 500);
            }
        });
        /*
        |--------------------------------------------------------------------------
        | RelationNotFoundException
        |--------------------------------------------------------------------------
        |
        | handle message for user request route, but do not have relationship
        |
        */
        $this->renderable(function (RelationNotFoundException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'http_status'   => 500,
                    'message'       => 'Call to undefined relationship.',
                    'error'         => $e->getMessage()
                ], 500);
            }
        });
        /*
        |--------------------------------------------------------------------------
        | MethodNotAllowedHttpException
        |--------------------------------------------------------------------------
        |
        | handle message for user request route, but do not support method
        |
        */
        $this->renderable(function (MethodNotAllowedHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'http_status'   => 405,
                    'message'       => 'This method is not supported for this route',
                    'error'         => $e->getMessage()
                ], 405);
            }
        });
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        /*
        |--------------------------------------------------------------------------
        | Auth
        |--------------------------------------------------------------------------
        |
        | handle message for authenticated user request route.
        |
        */
        if ($request->expectsJson()) {
            try {
                JWTAuth::parseToken()->authenticate();
            } catch (Exception $e) {
                if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                    return response()->json(['message' => 'Token is Invalid'], 401);
                } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                    return response()->json(['message' => 'Token is Expired'], 401);
                } else {
                    return response()->json(['message' => 'Authorization Token not found'], 401);
                }
            }
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }
    }

    /**
     * Convert a validation exception into a JSON response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Validation\ValidationException  $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function invalidJson($request, ValidationException $exception)
    {
        return response()->json([
            'http_status'   => $exception->status,
            'message'       => 'ទិន្នន័យដែលបានផ្តល់ឱ្យមិនត្រឹមត្រូវទេ។', //$exception->getMessage()
            'errors'        => $this->transformErrors($exception),

        ], $exception->status);
    }

    // transform the error messages,
    private function transformErrors(ValidationException $exception)
    {
        $errors = [];

        foreach ($exception->errors() as $field => $message) {
            $errors[] = [
                'field' => $field,
                'message' => $message[0],
            ];
        }

        return $errors;
    }
}
/*
|--------------------------------------------------------------------------
| Handler by: Yim Klok
|--------------------------------------------------------------------------
|
| date: 22/02/2023. location: Manistry of public works and transport - MPWT
|
*/