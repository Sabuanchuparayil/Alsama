'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaTitle: string | null;
  metaDesc: string | null;
  isActive: boolean;
}

export default function PagesListPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/cms/pages');
      const data = await res.json();
      if (Array.isArray(data)) {
        setPages(data);
      } else {
        setPages([]);
      }
    } catch (error) {
      console.error('Failed to fetch pages:', error);
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const res = await fetch(`/api/cms/pages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPages();
      } else {
        alert('Failed to delete page');
      }
    } catch {
      alert('Failed to delete page');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Pages</h1>
        <Link href="/admin/content/pages/new"
          className="red-gradient text-white px-6 py-2 rounded-md hover:shadow-md transition-all">
          Add New Page
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No pages yet</h3>
          <p className="text-gray-500 mb-4">Create custom content pages for your website.</p>
          <Link href="/admin/content/pages/new" className="text-luxury-red hover:underline font-medium">
            Create Page →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-luxury-black text-white">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Slug</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{page.title}</td>
                  <td className="px-6 py-4 text-gray-600">/{page.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${page.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {page.isActive ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/content/pages/${page.id}`} className="text-luxury-red hover:underline mr-4">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(page.id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
