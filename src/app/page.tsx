import Link from 'next/link';
import React from 'react';

export default function Home(): React.ReactNode {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Sheeoenz News</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your gateway to the latest news and Tech updates.
        </p>
        <Link
          href="/articles"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          View All Articles
        </Link>
      </div>
    </div>
  );
}