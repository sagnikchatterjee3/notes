import { getAllPostsWithFrontMatter } from "@/lib/utils";
import { BlogProps } from "@/types";

const Blog = ({ posts, title, description }: BlogProps) => {
  return (
    <div>
      <section className="blog-posts">
        <p>
          I&apos;m trying to solidify my learnings and help others at the same
          time by writing these short blog posts. I generally write about
          problems I come across and how I solved them. I'll occassionally also
          write about my personal experiences of navigating my career as a
          software engineer.
        </p>
        <h3>Blog Posts on my experince as a software engineer</h3>
        <BlogPosts posts={posts} />
      </section>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllPostsWithFrontMatter("blog");
  return {
    props: {
      posts,
      title: "Blog",
      description: "Posts on Web Dev, Typescript and the React Ecosystem",
    },
  };
};

export default Blog;
