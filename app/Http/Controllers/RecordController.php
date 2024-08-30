<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;
use App\Models\GameType;

class RecordController extends Controller
{
    private $status_code = 200;
    function saveRecord(Request $request){
        $record = new Record();
        
        $record->userid = $request->userid;
        $record->typegameid = $request->typegameid;
        $record->minutes = $request->minutes;
        $record->seconds = $request->seconds;
        $record->scores = $request->scores;

        $res = $record->save();

        if($res)
            return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Your record was saved!']);
        return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Something went wrong :(']);
    }

    function getTypeGame(Request $request){
        $type = GameType::where('type', $request->type)->first();
        if($type != null)
            return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Got', 'data' => $type->id]);
        else
            return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Wrong type']);
    }
}
