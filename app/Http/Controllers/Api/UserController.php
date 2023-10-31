<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Database\QueryException;

class UserController extends Controller
{

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {   
        try {
            $data = $request->validated();
            $user = User::find($id);
            $user->first_name = $data['firstName'];
            $user->last_name = $data['lastName'];
            $user->email = $data['email'];
            $user->save();
            return new UserResource($user);
        } catch (QueryException $e) {
            return response()->json([
                'message' => "Une erreur est survenue lors de la mise à jour de l'utilisateur"
            ], 500);
        }
    }
}
