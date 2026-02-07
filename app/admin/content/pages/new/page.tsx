'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPagePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    metaTitle: '',
    metaDesc: '',
    isActive: true,
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: formData.slug || generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug || generateSlug(formData.title),
          content: formData.content,
          metaTitle: formData.metaTitle || null,
          metaDesc: formData.metaDesc || null,
          isActive: formData.isActive,
        }),
      });

      if (res.ok) {
        router.push('/admin/content/pages');
      } else {
        const error = await res.json();
        alert(`Error: ${JSON.stringify(error.error) || 'Failed to create page'}`);
      }
    } catch {
      alert('Failed to create page');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/content/pages" className="text-gray-600 hover:text-gray-800">← Back</Link>
        <h1 className="text-3xl font-bold text-gray-800">Create New Page</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6 max-w-3xl">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Page Title *</label>
          <input type="text" id="title" required value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="e.g. Terms & Conditions" />
        </div>

        <div>
          <label htmlFor="slug" className="block text-gray-700 font-semibold mb-2">
            URL Slug *
            <span className="text-sm font-normal text-gray-500 ml-2">(auto-generated)</span>
          </label>
          <input type="text" id="slug" required value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="terms-and-conditions" />
        </div>

        <div>
          <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content *</label>
          <textarea id="content" rows={12} required value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red font-mono text-sm"
            placeholder="Page content (supports HTML)" />
        </div>

        <details className="border border-gray-200 rounded-md p-4">
          <summary className="text-gray-700 font-semibold cursor-pointer">SEO Settings (Optional)</summary>
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="metaTitle" className="block text-gray-700 font-semibold mb-2">Meta Title</label>
              <input type="text" id="metaTitle" value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
                placeholder="SEO title (defaults to page title)" />
            </div>
            <div>
              <label htmlFor="metaDesc" className="block text-gray-700 font-semibold mb-2">Meta Description</label>
              <textarea id="metaDesc" rows={2} value={formData.metaDesc}
                onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
                placeholder="SEO description" />
            </div>
          </div>
        </details>

        <div className="flex items-center">
          <input type="checkbox" id="isActive" checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-4 h-4 text-luxury-red border-gray-300 rounded focus:ring-luxury-red" />
          <label htmlFor="isActive" className="ml-2 text-gray-700">Published (visible on website)</label>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={saving}
            className="flex-1 red-gradient text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all disabled:opacity-50">
            {saving ? 'Creating...' : 'Create Page'}
          </button>
          <Link href="/admin/content/pages"
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition text-center">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
