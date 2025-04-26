import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm py-4 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Strapi Blog
          </Link>
          <div>
            <Link href="/" className="text-gray-600 hover:text-gray-800 mr-4">
              Home
            </Link>
            <Link href="/articles" className="text-gray-600 hover:text-gray-800">
              Articles
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;