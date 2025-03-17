// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Banner */}


      {/* Featured Article */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image 
              src="/john-wick-placeholder.jpg" 
              alt="John Wick: Chapter 4"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white mr-2">N</div>
              <span className="text-gray-700">Entertainment</span>
              <span className="mx-2">•</span>
              <span className="text-gray-500">12 minutes ago</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Where To Watch &apos;John Wick: Chapter 4&apos;</h1>
            
            <p className="text-gray-700 mb-4">
              There&apos;s been no official announcement regarding John Wick: Chapter 4&apos;s streaming release. 
              However, given it&apos;s a Lionsgate film, John Wick: Chapter 4 will eventually be released on Starz, 
              where it will stream exclusively for a period of time.
            </p>
            
            <div className="flex items-center text-sm">
              <Link href="/category/movies" className="text-red-600 mr-2">Movies</Link>
              <span>•</span>
              <span className="ml-2 text-gray-500">4 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}

    </div>
  );
}