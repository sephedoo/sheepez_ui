// src/app/about/page.tsx
import React from 'react';

export const metadata = {
  title: 'About Sheepenz',
  description: 'Learn about our mission to decode the ever-evolving world of technology',
};

export default function AboutPage(): React.ReactNode {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">About Sheepenz</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl mb-6">
          At <strong>Sheepenz</strong>, we decode the ever-evolving world of technology—making it insightful, accessible, and unmissable. From breakthrough AI developments to the latest startup shakeups, we deliver sharp, trustworthy reporting and analysis that cuts through the noise.
        </p>
        
        <p className="text-xl mb-6">
          Founded on the belief that tech news should be both credible and captivating, Sheepenz combines journalistic rigor with a curious, forward-thinking lens. Our team of editors, analysts, and creators works around the clock to track trends, highlight innovation, and spotlight the people shaping the digital future.
        </p>
        
        <p className="text-xl mb-6">
          Whether you&apos;re a developer, founder, investor, or just tech-curious, Sheepenz keeps you informed, ahead, and in the loop—without the hype.
        </p>
      </div>
      
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          To provide accurate, insightful, and accessible technology news and analysis for everyone interested in the digital world.
        </p>
      </div>
      
      <div className="mt-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg mb-4">
          Have questions or feedback? We&apos;d love to hear from you.
        </p>
        <a 
          href="mailto:contact@sheepenz.net" 
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}