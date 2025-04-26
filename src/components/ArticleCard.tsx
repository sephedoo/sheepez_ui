import Link from 'next/link';
import { Article } from '../types';
import React from 'react';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  if (!article) return null;
  
  const { documentId, title, description, publishedAt, cover } = article;
  
  // API URL for images
  const apiUrl = process.env.STRAPI_API_URL || '';
  
  return (
    <div className="border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Cover Image */}
      {cover && cover.formats && cover.formats.small && (
        <div className="mb-4 overflow-hidden rounded">
          <img
            src={`${apiUrl}${cover.formats.small.url}`}
            alt={cover.alternativeText || title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      
      {description && (
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{description}</p>
      )}
      
      {publishedAt && (
        <p className="text-sm text-gray-500 mb-4">
          {new Date(publishedAt).toLocaleDateString()}
        </p>
      )}
      
      <Link href={`/articles/${documentId}`} className="text-blue-600 hover:underline mt-auto">
        Read more
      </Link>
    </div>
  );
};

export default ArticleCard;