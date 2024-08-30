<?php

use App\Http\Controllers\gameTypesController;
use App\Http\Controllers\RecordsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GameTypeController;
use App\Http\Controllers\RecordController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('user-signup', [UserController::class, 'userSignUp']);
Route::post('user-signin', [UserController::class,'userSignIn']);
Route::get('gettypes', [GameTypeController::class, 'getTypes']);
Route::post('saverecord', [RecordController::class,'saveRecord']);
Route::get('getgametypeid', [RecordController::class,'getTypeGame']);