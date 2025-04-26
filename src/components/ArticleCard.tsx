import Link from 'next/link';
import { Article } from '../types';
import React from 'react';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  if (!article) return null;
  
  const { documentId, title, description, publishedAt } = article;
  
  return (
    <div className="border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      {description && (
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
      )}
      {publishedAt && (
        <p className="text-sm text-gray-500 mb-4">
          {new Date(publishedAt).toLocaleDateString()}
        </p>
      )}
      <Link href={`/articles/${documentId}`} className="text-blue-600 hover:underline">
        Read more
      </Link>
    </div>
  );
};

export default ArticleCard;