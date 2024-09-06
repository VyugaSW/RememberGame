<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GameType;

class GameTypeController extends Controller
{
    private $status_code = 200;
    
    // -------- [Get all gameTypes] ---------
    function getTypes(){
        return response()->JSON(['data' => GameType::all()]);
    }

    // -------- [Get the typegameid] ---------
    function getTypeGameId(Request $request){
        $type = GameType::where('type', $request->type)->first();
        if($type)
            return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Got', 'data' => $type->id]);
        else
            return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Wrong type']);
    }
}
