<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use App\Models\Record;
use App\Models\GameType;
use App\Models\User;
use App\Http\Controllers\GameTypeController;

class RecordController extends Controller
{
    private $status_code = 200;
    private $paginateCount = 10;

    // -------- [save record] ---------
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

    // -------- [Records] ---------
    function getRecords(Request $request){
        $records = DB::table('records')
                ->join('users','users.id','=','records.userid')
                ->where('users.login','like', '%'.$request->userLogin.'%')
                ->join('game_types','game_types.id','=','records.typegameid')
                ->where('game_types.type','like','%'.$request->gameType.'%')
                ->select('records.id','users.login','game_types.type','records.scores','records.minutes','records.seconds')
                ->orderBy('scores', 'DESC')
                ->paginate($this->paginateCount);
        if($records)
            return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Fine.','data' => $records]);
        return response()->json(['status' => 'failure', 'success' => false, 'message' => 'There are not any records']);
    }


    // -------- [Get the highest record] ---------
    function getHighScore(Request $request){
        $highScore = DB::table('records')
            ->join('game_types','game_types.id','=','records.typegameid')
            ->where('records.userid','=', $request->userid)
            ->where('game_types.type','=',$request->typeGame)
            ->select('records.scores')
            ->orderBy('scores','DESC')
            ->first();
        if($highScore)
            return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'Fine.','data' => $highScore->scores]);
        return response()->json(['status' => 'failure', 'success' => false, 'message' => 'There are not any records']);
    }
}
