// src/components/MobileNav.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import React from 'react';

interface MobileNavProps {
  categories: { name: string; slug: string }[];
}

export default function MobileNav({ categories }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2"
        aria-label="Toggle menu"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="h-6 w-6"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-10 py-2 px-4">
          <Link 
            href="/articles" 
            className="block py-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsOpen(false)}
          >
            All Articles
          </Link>
          
          {categories.map((category) => (
            <Link 
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="block py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}