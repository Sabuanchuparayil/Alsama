'use client';

import Link from 'next/link';
import { useContactInfo } from '@/lib/contact-info';

export default function FooterClient() {
  const contactInfo = useContactInfo();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-dark text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">AL SAMA</h3>
            <p className="text-gray-400 mb-4">
              Luxury Tourism & Chauffeur
            </p>
            <p className="text-gray-400 text-sm">
              Experience Dubai in unmatched luxury with our premium chauffeur services.
            </p>
          </div>

          {/* Our Fleet */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Fleet</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/fleet?category=Sedan" className="hover:text-luxury-red transition">
                  Luxury Sedans
                </Link>
              </li>
              <li>
                <Link href="/fleet?category=SUV" className="hover:text-luxury-red transition">
                  SUVs
                </Link>
              </li>
              <li>
                <Link href="/fleet?category=Sports" className="hover:text-luxury-red transition">
                  Sports Cars
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Pages</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-luxury-red transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-luxury-red transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-luxury-red transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-luxury-red transition text-sm">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/services" className="hover:text-luxury-red transition">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-luxury-red transition">
                  Booking Wizard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">
                <strong>Email:</strong> <a href={`mailto:${contactInfo.email}`} className="hover:text-luxury-red">{contactInfo.email}</a>
              </p>
              <p className="text-gray-400">
                <strong>Phone:</strong> <a href={`tel:${contactInfo.phone}`} className="hover:text-luxury-red">{contactInfo.phone}</a>
              </p>
            </div>
            <div className="text-gray-400 text-sm">
              © {currentYear} AL SAMA. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
