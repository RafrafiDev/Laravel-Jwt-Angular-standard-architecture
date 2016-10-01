<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    protected $table = 'posts';

    protected $fillable = ['title', 'slug', 'text'];

    protected $with = ['user', 'comments', 'tags'];

    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function getCreatedAtAttribute($value)
    {
        $created = new Carbon($value);
        $now = Carbon::now();
        $difference = $created->diffForHumans($now);
        return $difference;
    }

    public function tags()
    {
        return $this->belongsToMany('App\Models\Tag');
    }
}
