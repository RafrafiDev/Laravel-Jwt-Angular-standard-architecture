<?php
/**
 * Created by PhpStorm.
 * User: benext-tpl
 * Date: 29.09.16
 * Time: 16:04
 */

namespace App\Helpers;
use JWTAuth;

class AuthHelper
{
    public static function currentUser()
    {
        return JWTAuth::parseToken()->authenticate();
    }
}