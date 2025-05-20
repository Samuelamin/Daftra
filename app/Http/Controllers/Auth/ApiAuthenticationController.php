<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ApiAuthenticationController extends Controller
{
    function get_user(Request $request)
    {
        return response()->json(['status' => 200, 'user' => $request->user()]);
    }

    function signIn(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();
        if (Hash::check($request->password, $user->password)) {
            $token = $user->createToken($request->email)->plainTextToken;
            return ['status' => 200, 'token' => $token];
        } else
        {
            return response()->json(['status' => false, 'messages' => ['password' => 'incorrect password']]);
        }

        return response()->noContent();
    }

    function signUp(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $token = $user->createToken($request->email)->plainTextToken;
        return ['status' => 200, 'token' => $token];
    }


    function signOut(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    }
}
