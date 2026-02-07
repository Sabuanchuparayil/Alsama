'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isActiveGroup = (path: string) => pathname?.startsWith(path);

  const navItemClass = (path: string) =>
    `block px-4 py-2 rounded-md transition text-sm ${
      isActive(path)
        ? 'bg-luxury-red text-white'
        : 'text-gray-300 hover:bg-luxury-dark hover:text-white'
    }`;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-luxury-black text-white shadow-lg z-50 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <Link href="/admin" className="block">
          <h2 className="text-xl font-bold text-luxury-red">AL SAMA</h2>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link href="/admin" className={navItemClass('/admin')}>
          📊 Dashboard
        </Link>

        <div className="pt-4">
          <p className="px-4 text-xs text-gray-500 uppercase tracking-wider mb-2">Content</p>
          <Link href="/admin/content/vehicles" className={navItemClass('/admin/content/vehicles')}>
            🚗 Vehicles
          </Link>
          <Link href="/admin/content/services" className={navItemClass('/admin/content/services')}>
            🛎️ Services
          </Link>
          <Link href="/admin/content/pages" className={navItemClass('/admin/content/pages')}>
            📄 Pages
          </Link>
        </div>

        <div className="pt-4">
          <p className="px-4 text-xs text-gray-500 uppercase tracking-wider mb-2">Homepage</p>
          <Link href="/admin/content/hero" className={navItemClass('/admin/content/hero')}>
            🖼️ Hero Section
          </Link>
          <Link href="/admin/content/homepage" className={navItemClass('/admin/content/homepage')}>
            📑 Section Settings
          </Link>
        </div>

        <div className="pt-4">
          <p className="px-4 text-xs text-gray-500 uppercase tracking-wider mb-2">Business</p>
          <Link
            href="/admin/bookings"
            className={`block px-4 py-2 rounded-md transition text-sm ${
              isActiveGroup('/admin/bookings')
                ? 'bg-luxury-red text-white'
                : 'text-gray-300 hover:bg-luxury-dark hover:text-white'
            }`}
          >
            📋 Bookings
          </Link>
        </div>

        <div className="pt-4">
          <p className="px-4 text-xs text-gray-500 uppercase tracking-wider mb-2">Settings</p>
          <Link
            href="/admin/settings/contact"
            className={`block px-4 py-2 rounded-md transition text-sm ${
              isActiveGroup('/admin/settings')
                ? 'bg-luxury-red text-white'
                : 'text-gray-300 hover:bg-luxury-dark hover:text-white'
            }`}
          >
            📞 Contact Info
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="block w-full px-4 py-2 text-center text-sm text-gray-300 border border-gray-600 rounded-md hover:bg-luxury-dark hover:text-white transition"
        >
          🌐 View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full px-4 py-2 text-sm bg-luxury-dark text-white rounded-md hover:bg-luxury-red transition"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
