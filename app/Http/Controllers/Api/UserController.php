<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {   
        
        $data = $request->validated();
        $user = User::find($id);
        $user->first_name = $data['firstName'];
        $user->last_name = $data['lastName'];
        $user->email = $data['email'];
        $user->save();
        return new UserResource($user);
    }
}
