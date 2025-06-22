import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

export default async function Post({ params }: Params) {
  const decodedSlug = decodeURIComponent(params.slug);
  const post = getPostBySlug(decodedSlug);

  if (!post) {
    return notFound();
  }

  if (post.fileType === "md") {
    const content = await markdownToHtml(post.content || "");

    return (
      <main>
        { /* <Alert preview={post.preview} /> */ }
        <Container>
          <Header />
          <article className="mb-32">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            />
            <PostBody content={content} />
          </article>
        </Container>
      </main>
    );
  } else {
    return (
      <div className="fixed inset-0 bg-white z-50">
        <object
          data={`/pdfs/${post.slug}.pdf`}
          type="application/pdf"
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full"
        >
          <p>
            Your browser does not support embedded PDFs. Please{" "}
            <a href={`/pdfs/${post.slug}.pdf`} target="_blank" rel="noopener noreferrer">
              download the PDF
            </a>.
          </p>
        </object>
      </div>
    );
  }
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata{
  const decodedSlug = decodeURIComponent(params.slug);
  const post = getPostBySlug(decodedSlug);

  if (!post) {
    return notFound();
  }

  // const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;
  const title = `${post.title} | Discover Ethan`

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
