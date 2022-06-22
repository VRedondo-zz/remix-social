import { useLoaderData } from "@remix-run/react";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";

import { getPosts, createPost } from "~/services/posts.server";
import { PostComp } from '~/components/Post'
import { PostForm } from "~/components/PostForm";

import type { Post } from '~/services/posts.server'

type  LoaderProps = { 
  posts: Array<Post>
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const title = form.get('title') as string;
  const body = form.get('body') as string;

  await createPost({ title, body })

  return redirect('/')
}

export const loader: LoaderFunction = async () => {
  const posts = {posts: await getPosts()}
  return posts
}

export default function Index() {
  const { posts } = useLoaderData<LoaderProps>()
  return (
    <div className="flex flex-col items-center">
      <PostForm action="/?index"/>
      <ul>
        {posts.map(post => {
          return (<li key={post.title}>
            <PostComp title={post.title}>
              <p>{post.body}</p>
            </PostComp>
        </li>)
        })}
      </ul>
    </div>
  );
}
