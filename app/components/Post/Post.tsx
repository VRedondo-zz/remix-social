import type { PostProps } from "./Post.types";

const Post: PostProps = ({title, children}) => {
  return (
    <div className="flex flex-col p-6 max-w-md border rounded">
      {title && <h2 className="font-bold text-3xl text-grey-900">{title}</h2>}
      <div>{children}</div>
    </div>
  );
}

export default Post;