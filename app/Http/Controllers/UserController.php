<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
        public function index(){
        
    try {
        $user = User::all();
        return response()->json([
            $user
        ],200);
    } catch (\Throwable $th) {
       return response()->json([
        "message "=>$th->getMessage()
       ],500);
    }
    }
}
