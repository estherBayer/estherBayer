import Link from "next/link";
import { draftMode } from "next/headers";

import MoreStories from "../../more-stories";
import Avatar from "../../avatar";
import Date from "../../date";
import CoverImage from "../../cover-image";
import { Markdown } from "@/lib/markdown";
import { getAllPosts, getPostAndMorePosts } from "@/lib/api";

// Ensure getAllPosts is defined properly in the api.ts file
export async function generateStaticParams() {
  try {
    const allPosts = await getAllPosts(false);

    if (!allPosts || allPosts.length === 0) {
      return [];
    }

    return allPosts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return []; // Return empty array if an error occurs
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();

  try {
    const { post, morePosts } = await getPostAndMorePosts(params.slug, isEnabled);

    // Handle case if post is not found
    if (!post) {
      return <p className="text-center py-10">Post not found</p>;
    }

    return (
      <div className="container mx-auto px-5">
        <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
          <Link href="/" className="hover:underline">
            Blog
          </Link>
          .
        </h2>
        <article>
          <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
            {post.title}
          </h1>
          <div className="hidden md:mb-12 md:block">
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </div>
          <div className="mb-8 sm:mx-0 md:mb-16">
            <CoverImage title={post.title} url={post.coverImage?.url || ''} />
          </div>
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 block md:hidden">
              {post.author && (
                <Avatar name={post.author.name} picture={post.author.picture} />
              )}
            </div>
            <div className="mb-6 text-lg">
              <Date dateString={post.date} />
            </div>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="prose">
              <Markdown content={post.content || ''} />
            </div>
          </div>
        </article>
        <hr className="border-accent-2 mt-28 mb-24" />
        <MoreStories morePosts={morePosts} />
      </div>
    );
  } catch (error) {
    console.error("Error loading post data: ", error);
    return <p className="text-center py-10">Error loading post</p>;
  }
}

