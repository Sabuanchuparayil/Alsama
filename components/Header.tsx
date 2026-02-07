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
            <div className="relative group">
              <button className="text-white hover:text-luxury-red transition flex items-center">
                Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-luxury-dark rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-luxury-red">
                <Link href="/services/airport-transfers" className="block px-4 py-2 text-white hover:bg-luxury-red transition">
                  Airport Transfers
                </Link>
                <Link href="/services/city-tours" className="block px-4 py-2 text-white hover:bg-luxury-red transition">
                  City Tours
                </Link>
                <Link href="/services/corporate-hire" className="block px-4 py-2 text-white hover:bg-luxury-red transition">
                  Corporate Hire
                </Link>
                <Link href="/services/wedding-services" className="block px-4 py-2 text-white hover:bg-luxury-red transition">
                  Wedding Services
                </Link>
              </div>
            </div>
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
            <div className="py-2">
              <div className="text-white font-semibold mb-2">Services</div>
              <div className="pl-4 space-y-2">
                <Link href="/services/airport-transfers" className="block py-1 text-gray-300 hover:text-luxury-red transition">
                  Airport Transfers
                </Link>
                <Link href="/services/city-tours" className="block py-1 text-gray-300 hover:text-luxury-red transition">
                  City Tours
                </Link>
                <Link href="/services/corporate-hire" className="block py-1 text-gray-300 hover:text-luxury-red transition">
                  Corporate Hire
                </Link>
                <Link href="/services/wedding-services" className="block py-1 text-gray-300 hover:text-luxury-red transition">
                  Wedding Services
                </Link>
              </div>
            </div>
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
