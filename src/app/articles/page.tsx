import { getArticles } from '../../services/api';
import ArticlesPageClient from './ArticlesPageClient';
import React from 'react';

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function ArticlesPage(): Promise<React.ReactNode> {
  // Fetch the initial articles
  const initialArticles = await getArticles({ page: 1, pageSize: 9 });
  
  // Pass the initial articles to the client component
  return <ArticlesPageClient initialArticles={initialArticles} />;
}