import axios from 'axios';
import { StrapiResponse, StrapiSingleResponse, Article, Category } from '../types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://api.sheepenz.net/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface GetArticlesParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  category?: string;
}


export const getArticles = async (params: GetArticlesParams = {}): Promise<StrapiResponse<Article>> => {
  const { page = 1, pageSize = 9, sort = 'publishedAt:desc', category } = params;

  try {
    // If your API doesn't return slugs by default, you might need to add a populate parameter
    let url = `/api/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=cover&sort=${sort}`;
    
    // Add category filter if provided
    if (category) {
      url += `&filters[category][slug][$eq]=${category}`;
    }
    const response = await api.get(url);
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

export const getArticleBySlug = async (slug: string): Promise<StrapiSingleResponse<Article>> => {
  try {
    // Use a filter to get the article by slug
    const response = await api.get(`/api/articles?filters[slug][$eq]=${slug}&populate=*`);
    
    // The response will be a collection, but we only want the first item
    if (response.data.data && response.data.data.length > 0) {
      return {
        data: response.data.data[0],
        meta: response.data.meta
      };
    }
    
    throw new Error(`Article with slug ${slug} not found`);
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return { 
      data: {
        id: 0,
        documentId: '',
        title: '',
        slug: '',
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
        description: ''
      }, 
      meta: {} 
    };
  }
};

export const getCategories = async (): Promise<StrapiResponse<Category>> => {
  try {
    const response = await api.get('/api/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
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

export default api;