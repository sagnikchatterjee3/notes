import { BlogPostsProps } from "@/types";
import Link from "next/link";

const BlogPosts = ({ posts }: BlogPostsProps) => {
  return (
    <div className="posts">
      {!posts && <div>No Posts !</div>}
      <ul>
        {posts &&
          posts.sort(
            (a, b) =>
              new Date(b.frontMatter.publishedDate).getTime() -
              new Date(a.frontMatter.publishedDate).getDate(),
          ).map((post) => {
            return (
                <article key={post.slug} className="post-title">
                    <Link href={{pathname: `/blog/${post.slug}`}}>
                        <a>{post.frontMatter.title}</a>
                    </Link>{' '}
                    - {post.frontMatter.description}
                    <p>[{post.frontMatter.tags.join(', ')} ]</p>
                </article>
            )
          })
          
          }
      </ul>
    </div>
  );
};

export default BlogPosts;

