<?php

namespace App\Http\Controllers;

use Hash;
use DB;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    private $status_code = 200;

    //--------- [User Registration] -----------
    function userSignUp(Request $request){
        $user = new User();
        if(!$request->msgTo){
            return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Fill the form correctly']);
        }
        
        if(!$request->login || !$request->password || !$request->email){
            return response()->json(['status' => 'failed', 'success' => false, 'message' => 'You have empty fields']);
        }

        $user->login = $request->login;
        $user->password = md5($request->password);
        $user->email = $request->email;
        
        $user_status_email = User::where('email', $request->email)->first();
        $user_status_login = User::where('login', $request->login)->first();

        if(!is_null($user_status_email)){
            return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Whoops! Email already registered']);
        }
        if(!is_null($user_status_login)){
            return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Whoops! Login already registered']);
        }

        $user->save();

        return response()->json(['status' => $this->status_code, 'success' => true, 'message' => 'You have registered!']);
    }

    //--------- [User login] -----------
    function userSignIn(Request $request){
        if(!$request->msgTo){
            return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Fill the form correctly']);
        }
        
        if(!$request->loginEmail || !$request->password){
            return response()->json(['status' => 'failed', 'success' => false, 'message' => 'You have empty fields']);
        }

        if(filter_var($request->loginEmail, FILTER_VALIDATE_EMAIL)){
            $email_status = User::where('email',$request->loginEmail)->first();
            if(!is_null($email_status)){
                $password_status = User::where('email',$request->loginEmail)->where('password',md5($request->password))->first();
                if(!is_null($password_status)){
                    $user = $this->userDetail($request->loginEmail);
                    return response()->json(['status'=> $this->status_code, 'success'=> true, 'message' => 'You have logged successfully', "data" => $user]);
                }
                else{
                    return response()->json(["status"=> "failed", 'success' => false, 'message'=> 'Unable to login. Incorrect password']);
                }
            }
            else{
                return response()->json(["status"=> "failed", 'success' => false, 'message'=> 'Unable to login. Incorrect email or login']);
            }
        }
        else{
            $login_status = User::where('login', $request->loginEmail)->first();
            if(!is_null($login_status)){
                $password_status = User::where('login',$request->loginEmail)->where('password',md5($request->password))->first();
                if(!is_null($password_status)){
                    $user = $this->userDetail(User::where('login', $request->loginEmail)->first()->email);
                    return response()->json(['status'=> $this->status_code, 'success'=> true, 'message' => 'You have logged successfully', "data" => $user]);
                }
                else{
                    return response()->json(["status"=> "failed", 'success' => false, 'message'=> 'Unable to login. Incorrect password']);
                }
            }
            else{
                return response()->json(["status"=> "failed", 'success' => false, 'message'=> 'Unable to login. Incorrect email or login']);
            }
        }
    }

    //--------- [User Detail] -----------
    function userDetail($email){
        $user = array();
        if($email != ""){
            $user = User::where("email",$email)->first();
            return $user;
        }
    }


    //--------- [Get logins] -----------
    function getLogins(Request $request){
        $logins = DB::table('users')->where('login','like','%'.$request->login.'%')->take(5)->get();

        if($logins)
            return response()->json(["status"=> $this->status_code, 'success' => true, 'message'=> 'Fine.', 'data' => $logins]);
        return response()->json(["status"=> "failed", 'success' => false, 'message'=> 'Something went wrong']);
    }
}
