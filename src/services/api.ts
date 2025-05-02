import axios from 'axios';
import { StrapiResponse, StrapiSingleResponse, Article } from '../types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://api.sheepenz.net/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getArticles = async (): Promise<StrapiResponse<Article>> => {
  try {
    const response = await api.get('/api/articles?populate=cover');
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { 
      data: [], 
      meta: { 
        pagination: { 
          page: 0, 
          pageSize: 0, 
          pageCount: 0, 
          total: 0 
        } 
      } 
    };
  }
};

export const getArticleByDocumentId = async (documentId: string): Promise<StrapiSingleResponse<Article>> => {
  try {
    // Use a filter to get the article by documentId
    const response = await api.get(`/api/articles?filters[documentId][$eq]=${documentId}&populate=*`);
    
    // The response will be a collection, but we only want the first item
    if (response.data.data && response.data.data.length > 0) {
      return {
        data: response.data.data[0],
        meta: response.data.meta
      };
    }
    
    throw new Error(`Article with documentId ${documentId} not found`);
  } catch (error) {
    console.error(`Error fetching article with documentId ${documentId}:`, error);
    return { 
      data: {
        id: 0,
        documentId: '',
        title: '',
        slug: '',
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
        description: '',
        cover: undefined,
        author: undefined,
        category: undefined,
        blocks: []
      }, 
      meta: {} 
    };
  }
};

export default api;