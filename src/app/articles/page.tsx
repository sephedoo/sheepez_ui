import { getArticles } from '../../services/api';
import ArticleCard from '../../components/ArticleCard';
import React from 'react';

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function ArticlesPage(): Promise<React.ReactNode> {
  const response = await getArticles();
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">All Articles</h1>
      
      {response.data && response.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {response.data.map((article) => (
            <ArticleCard key={article.documentId} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-12">No articles found.</p>
      )}
    </div>
  );
}