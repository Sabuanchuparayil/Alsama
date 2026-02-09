'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-luxury-black shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-luxury-red">
            AL SAMA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-luxury-red transition">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-luxury-red transition">
              About Us
            </Link>
            <Link href="/fleet" className="text-white hover:text-luxury-red transition">
              Our Fleet
            </Link>
            <Link href="/services" className="text-white hover:text-luxury-red transition">
              Services
            </Link>
            <Link href="/contact" className="text-white hover:text-luxury-red transition">
              Contact
            </Link>
            <Link
              href="/book"
              className="red-gradient text-white px-6 py-2 rounded-md hover:shadow-md transition-all font-semibold"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 bg-luxury-dark p-4 rounded-lg border border-luxury-red">
            <Link href="/" className="block py-2 text-white hover:text-luxury-red transition">
              Home
            </Link>
            <Link href="/about" className="block py-2 text-white hover:text-luxury-red transition">
              About Us
            </Link>
            <Link href="/fleet" className="block py-2 text-white hover:text-luxury-red transition">
              Our Fleet
            </Link>
            <Link href="/services" className="block py-2 text-white hover:text-luxury-red transition">
              Services
            </Link>
            <Link href="/contact" className="block py-2 text-white hover:text-luxury-red transition">
              Contact
            </Link>
            <Link
              href="/book"
              className="block red-gradient text-white px-6 py-2 rounded-md text-center hover:shadow-md transition-all"
            >
              Book Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
