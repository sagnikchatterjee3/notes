import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


const root = process.cwd();


export const getFiles = async (dataType: string) => {
    return fs.readdirSync(path.join(root, 'data', dataType), 'utf-8');
}

export const getPostBySlug = async (dataType: string, slug: string) => {
    const source = fs.readFileSync(path.join(root, 'data', dataType, `${slug}.md`), 'utf-8');

    const { data, content } = matter(source);

    return {
        frontMatter: data,
        markdownBody: content,
    }
}

export const getAllPostsWithFrontMatter = async (dataType: string) => {
    const files = fs.readdirSync(path.join(root, 'data', dataType));

    //@ts-ignore
    return files.reduce((allPosts, postSlug) => {
        const source = fs.readFileSync(path.join(root, 'data', dataType, postSlug), 'utf-8');
        const { data } = matter(source);

        return [
            {
                frontMatter: data,
                slug: postSlug.replace(".md", ""),
            },
            ...allPosts,
        ]
    }, []);
}