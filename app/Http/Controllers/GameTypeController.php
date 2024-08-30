<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GameType;

class GameTypeController extends Controller
{
    function getTypes(){
        return response()->JSON(['data' => GameType::all()]);
    }
}
