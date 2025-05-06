// src/app/categories/page.tsx
import Link from 'next/link';
import { getCategories } from '../../services/api';
import React from 'react';

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function CategoriesPage(): Promise<React.ReactNode> {
  const response = await getCategories();
  
  return (
    <div className="container mx-auto px-4 py-8 mb-12">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      
      {response.data && response.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {response.data.map((category) => (
            <Link 
              key={category.slug} 
              href={`/categories/${category.slug}`}
              className="block border border-gray-200 p-6 rounded-md shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              {category.description && (
                <p className="text-gray-600">{category.description}</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-12">No categories found.</p>
      )}
    </div>
  );
}