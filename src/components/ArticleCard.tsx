// src/components/ArticleCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '../types';
import React from 'react';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  if (!article) return null;
  
  const { slug, title, description, publishedAt, cover } = article;
  
  // Check if cover exists and has the expected properties
  const hasCover = cover && cover.url;
  
  // Get the API URL from env or use default
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://api.sheepenz.net';
  
  return (
    <div className="border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white">
      {/* Image section - only show if we have a cover */}
      {hasCover && (
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={`${apiUrl}${cover.url}`}
            alt={cover.alternativeText || title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 blur-[1px]"
          />
        </div>
      )}
      
      {/* Content section */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
        
        {description && (
          <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        )}
        
        <div className="flex items-center justify-between">
          {publishedAt && (
            <p className="text-sm text-gray-500">
              {new Date(publishedAt).toLocaleDateString()}
            </p>
          )}
          
          <Link 
            href={`/articles/${slug}`} 
            className="text-blue-600 hover:underline"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;