import { Article, ContentBlock } from "../../../types";
import { getArticleByDocumentId, getArticles } from "../../../services/api";
import Link from "next/link";
import React from "react";

export const revalidate = 60; // Revalidate this page every 60 seconds

// Component to render different types of content blocks
const ContentBlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.__component) {
    case "shared.rich-text":
      return (
        <div className="my-6 prose prose-lg">
          <div dangerouslySetInnerHTML={{ __html: block.body }} />
        </div>
      );

    case "shared.quote":
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 my-8 italic">
          <p className="text-xl mb-2">{block.body}</p>
          {block.title && (
            <footer className="text-right font-semibold">
              — {block.title}
            </footer>
          )}
        </blockquote>
      );

    case "shared.media":
      // For media blocks, we'd typically include an image or other media
      return null;

    case "shared.slider":
      return null;

    default:
      return null;
  }
};

export async function generateStaticParams() {
  const response = await getArticles();

  return (response.data || []).map((article) => ({
    id: article.documentId,
  }));
}

// In Next.js App Router, page components accept { params, searchParams } directly
export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const documentId = params.id;
  const article = await getArticleByDocumentId(documentId);

  if (!article.data) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <Link href="/articles" className="text-blue-600 hover:underline">
          Back to Articles
        </Link>
      </div>
    );
  }

  const { title, description, publishedAt, cover, author, category, blocks } =
    article.data as Article;

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <Link
        href="/articles"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Back to Articles
      </Link>

      <article className="mx-auto max-w-2xl">
        {/* Article Header */}
        <header>
          <h1 className="mb-0">
            {title}{" "}
            {category && (
              <span className="font-normal text-xl">in {category.name}</span>
            )}
          </h1>

          {/* Publication Info */}
          <div className="flex items-center justify-between text-gray-500 mt-2 mb-8">
            <div>{author && <span>By {author.name}</span>}</div>
            {publishedAt && (
              <time dateTime={publishedAt}>
                {new Date(publishedAt).toLocaleDateString()}
              </time>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {cover && (
          <div className="my-6">
            <div className="w-full rounded-lg overflow-hidden">
              <img
                src={`${process.env.STRAPI_API_URL || ""}${cover.url}`}
                alt={cover.alternativeText || title}
                className="w-full h-auto"
              />
            </div>
            {cover.caption && (
              <p className="text-center text-sm text-gray-500 mt-1">
                {cover.caption}
              </p>
            )}
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="bg-gray-50 p-5 rounded-md my-8 w-full">
            <p className="italic m-0">{description}</p>
          </div>
        )}

        {/* Content Blocks */}
        {blocks && blocks.length > 0 && (
          <div className="mt-8">
            {blocks.map((block, index) => (
              <ContentBlockRenderer
                key={`${block.__component}-${index}`}
                block={block}
              />
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
