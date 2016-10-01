<?php

namespace App\Api\V1\Controllers;

use App\Helpers\AuthHelper;
use App\Models\Comment;
use App\Models\Post;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PostController extends Controller
{
    use Helpers;

    public function all()
    {
        return
            Post::orderBy('created_at', 'DESC')
                ->get()
                ->toArray();
    }

    public function index()
    {
        return AuthHelper::currentUser()
            ->posts()
            ->orderBy('created_at', 'DESC')
            ->get()
            ->toArray();
    }

    public function show($id)
    {
        $post = Post::find($id)->toArray();

        if (!$post)
            throw new NotFoundHttpException;

        return $post;
    }

    public function store(Request $request)
    {
        $post = new Post;

        $post->title = $request->get('title');
        $post->slug = $request->get('slug');
        $post->text = $request->get('text');
        $post->user_id = AuthHelper::currentUser()->id;

        if (AuthHelper::currentUser()->posts()->save($post))
            return $this->response->created();
        else
            return $this->response->error('could_not_create_post', 500);
    }


    public function comment(Request $request)
    {
        $postId = $request->get('postId');

        $comment = new Comment;
        $comment->text = $request->get('text');
        $comment->post_id = $postId;
        $comment->created_by = AuthHelper::currentUser()->id;

        $post = Post::find($postId);

        if ($post && $post->comments()->save($comment)){
            $comment->user = $comment->getAttribute('user');
            return response()->json(compact('comment'));
        }
         else
             return $this->response->error('could_not_create_comment', 500);
    }


    public function updateComment(Request $request, $id)
    {
        $comment = Comment::find($id);
        $comment->text = $request->get('text');

        if (!$comment)
            throw new NotFoundHttpException;

        if ($comment->save())
            return response()->json(compact('comment'));
        else
            return $this->response->error('could_not_update_comment', 500);
    }

    public function update(Request $request, $id)
    {
        $post = AuthHelper::currentUser()->posts()->find($id);
        if (!$post)
            throw new NotFoundHttpException;

        $post->fill($request->all());

        if ($post->save())
            return $this->response->noContent();
        else
            return $this->response->error('could_not_update_post', 500);
    }

    public function destroy($id)
    {
        $post = AuthHelper::currentUser()->posts()->find($id);

        if (!$post)
            throw new NotFoundHttpException;

        if ($post->delete())
            return $this->response->noContent();
        else
            return $this->response->error('could_not_delete_post', 500);
    }

}
