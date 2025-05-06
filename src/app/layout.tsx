// src/app/layout.tsx (modified version)
import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/Navbar"; // Using the @ alias from tsconfig
import "./globals.css";

export const metadata: Metadata = {
  title: "SheepENZ",
  description: "NEWS & TECH",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pb-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

async function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-red-600">
            SheepENZ
          </Link>
          

          <NavBar />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  // Footer implementation remains the same
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">SheepENZ</h3>
            <p className="text-gray-600">Craft narratives that ignite inspiration, knowledge, and entertainment.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; 2025 SheepENZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}