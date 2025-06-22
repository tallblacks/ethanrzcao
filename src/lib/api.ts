import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = /\.(md|pdf)$/.test(slug) ? slug.replace(/\.(md|pdf)$/, "") : slug;

  let fullPath = join(postsDirectory, `${realSlug}.md`);
  let fileType = 'md';

  if (!fs.existsSync(fullPath)) {
    fullPath = decodeURIComponent(join(postsDirectory, `${realSlug}.pdf`));
    fileType = 'pdf';

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post file not found for slug: ${realSlug}`);
    }
  }

  if (fileType === 'md') {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { ...data, slug: realSlug, content, fileType } as Post;
  } else {
    const yamlPath = join(postsDirectory, `${realSlug}.yaml`);
    let metadata = {};

    if (fs.existsSync(yamlPath)) {
      const yamlContent = fs.readFileSync(yamlPath, 'utf8');
      metadata = matter(yamlContent).data;
    }

    if (!metadata.ogImage || !metadata.ogImage.url) {
      console.warn(`⚠️ Missing ogImage in post: ${realSlug}`);
    }
    return {
      slug: realSlug,
      title: metadata.title,
      date: metadata.date,
      excerpt: metadata.excerpt,
      coverImage: metadata.coverImage,
      ogImage: {
        url: metadata.ogImage.url,
      },
      author: metadata.author,
      fileType: 'pdf',
    } as Post;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .filter(slug => /\.(md|pdf)$/.test(slug))
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
