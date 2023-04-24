import { getFiles, getPostBySlug } from "@/lib/utils";
import { BlogPostProps } from "@/types";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const getStaticPaths = async () => {
  const posts = await getFiles("blog");
  const paths = posts.map((fileName: string) => ({
    params: {
      slug: fileName.replace(/\.md/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const { frontMatter, markdownBody } = await getPostBySlug(
    "blog",
    params.slug
  );

  return {
    props: {
      frontMatter,
      markdownBody,
    },
  };
};

type CodeBlockProps = {
  language: string;
  value: React.ReactNode;
};

const CodeBlock = ({ language, value }: CodeBlockProps) => {
  return (
    <div className="code-block">
      <SyntaxHighlighter language={language} style={vscDarkPlus}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};
const BlogPost = ({ frontMatter, markdownBody }: BlogPostProps) => {
  if (!frontMatter) return <></>;

  return (
    <BlogLayout frontMatter={frontMatter}>
      <ReactMarkdown
        allowDangerousHtml={false}
        source={markdownBody}
        renderers={{
          link: (props) => <Link {...props} />,
          code: CodeBlock,
        }}
      />
    </BlogLayout>
  );
};

export default BlogPost;