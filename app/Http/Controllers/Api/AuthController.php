<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{
    public function login(LoginRequest $request) 
    {
        $credentials = $request->validated();
        if (!Auth::atempt($credentials)) {
            return response([
                'message' => 'Email ou mot de passe invalide'
            ]);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function signup(SignupRequest $request)
    {   
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::create([
            'first_name' => $data['firstName'],
            'last_name' => $data['lastName'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']) 
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request) 
    {         
        $request->user()->currentAccessToken()->delete();
        return response('', 204);
    }
}
