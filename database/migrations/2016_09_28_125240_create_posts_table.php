<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');

            // adding specific fields here...
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->string('text')->nullable();

            $table->integer('user_id')->index();

            $table->timestamps();
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->increments('id');

            // adding specific fields here...
            $table->string('text')->nullable();

            $table->integer('post_id')->nullable()->index();

            $table->integer('created_by')->nullable()->index();

            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('posts');
        Schema::drop('comments');
    }
}
