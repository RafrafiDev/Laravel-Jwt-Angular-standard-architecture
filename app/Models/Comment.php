<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';

    protected $fillable = ['text'];
    protected $with = ['user'];

    public function user()
    {
        return $this->belongsTo('App\Models\User','created_by');
    }


    public function getCreatedAtAttribute($value)
    {
        $created = new Carbon($value);
        $now = Carbon::now();
        $difference = $created->diffForHumans($now);
        return $difference;
    }

}
