<?php
	
$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

	$api->post('auth/login', 'App\Api\V1\Controllers\AuthController@login');
	$api->post('auth/signup', 'App\Api\V1\Controllers\AuthController@signup');
	$api->post('auth/recovery', 'App\Api\V1\Controllers\AuthController@recovery');
	$api->post('auth/reset', 'App\Api\V1\Controllers\AuthController@reset');

	$api->group(['middleware' => 'api.auth'], function ($api) {
        $api->get('allPosts', 'App\Api\V1\Controllers\PostController@all');
        $api->post('comment', 'App\Api\V1\Controllers\PostController@comment');
        $api->put('comment/{id}', 'App\Api\V1\Controllers\PostController@updateComment');
        $api->resource('posts', 'App\Api\V1\Controllers\PostController');
    });

});