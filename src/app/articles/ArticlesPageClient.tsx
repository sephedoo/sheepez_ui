'use client';

import { useState, useEffect, useRef } from 'react';
import { Article, StrapiResponse } from '../../types';
import ArticleCard from '../../components/ArticleCard';
import { getArticles } from '../../services/api';

export default function ArticlesPageClient({ initialArticles }: { initialArticles: StrapiResponse<Article> }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles.data || []);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(
    initialArticles.meta.pagination.page < initialArticles.meta.pagination.pageCount
  );
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMoreArticles = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await getArticles({ page: nextPage, pageSize: 9 });
      
      if (response.data && response.data.length > 0) {
        setArticles(prevArticles => [...prevArticles, ...response.data]);
        setPage(nextPage);
        
        // Check if we have more articles to load
        setHasMore(
          response.meta.pagination.page < response.meta.pagination.pageCount
        );
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreArticles();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading]);

  return (
    <div className="container mx-auto px-4 pb-12">
      <h1 className="text-3xl font-bold pb-12">Articles</h1>
      
      {articles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ArticleCard key={`${article.slug}-${index}`} article={article} />
            ))}
          </div>
          
          <div ref={loaderRef} className="flex justify-center mt-8 py-4">
            {loading && (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-t-2 border-b-2 border-red-600 rounded-full animate-spin"></div>
                <span className="ml-2">Loading more articles...</span>
              </div>
            )}
            
            {!hasMore && articles.length > 0 && (
              <p className="text-gray-600">You&apos;ve reached the end</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center py-12">No articles found.</p>
      )}
    </div>
  );
}