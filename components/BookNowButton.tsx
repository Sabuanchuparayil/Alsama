'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BookNowButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <Link
      href="/book"
      className="fixed bottom-32 md:bottom-28 right-6 z-40 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-3 md:px-6 md:py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-red-500/50 flex items-center space-x-2 md:space-x-3 group animate-pulse hover:animate-none"
      style={{
        boxShadow: '0 10px 40px rgba(220, 38, 38, 0.4)',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }}
    >
      <svg 
        className="w-6 h-6 group-hover:rotate-12 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span className="font-bold text-base md:text-lg whitespace-nowrap">
        Book Now
      </span>
      <svg 
        className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M13 7l5 5m0 0l-5 5m5-5H6" 
        />
      </svg>
    </Link>
  );
}
