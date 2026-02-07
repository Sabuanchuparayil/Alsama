'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface HomepageSection {
  sectionKey: string;
  title: string | null;
  description: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  isActive: boolean;
  order: number;
}

export default function EditHomepageSectionPage() {
  const router = useRouter();
  const params = useParams();
  const sectionKey = params.key as string;

  const [section, setSection] = useState<HomepageSection>({
    sectionKey: sectionKey,
    title: null,
    description: null,
    buttonText: null,
    buttonLink: null,
    isActive: true,
    order: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (sectionKey) {
      fetchSection();
    }
  }, [sectionKey]);

  const fetchSection = async () => {
    try {
      const res = await fetch(`/api/cms/homepage-sections/${sectionKey}`);
      if (res.ok) {
        const data = await res.json();
        setSection(data);
      }
    } catch (error) {
      console.error('Failed to fetch section:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/cms/homepage-sections/${sectionKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(section),
      });

      if (res.ok) {
        alert('Section updated successfully!');
        router.push('/admin/content/homepage');
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || 'Failed to update'}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Homepage Section</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Section Key
          </label>
          <input
            type="text"
            value={section.sectionKey}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={section.title || ''}
            onChange={(e) => setSection({ ...section, title: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={section.description || ''}
            onChange={(e) => setSection({ ...section, description: e.target.value || null })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="buttonText" className="block text-gray-700 font-semibold mb-2">
              Button Text
            </label>
            <input
              type="text"
              id="buttonText"
              value={section.buttonText || ''}
              onChange={(e) => setSection({ ...section, buttonText: e.target.value || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            />
          </div>

          <div>
            <label htmlFor="buttonLink" className="block text-gray-700 font-semibold mb-2">
              Button Link
            </label>
            <input
              type="text"
              id="buttonLink"
              value={section.buttonLink || ''}
              onChange={(e) => setSection({ ...section, buttonLink: e.target.value || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="order" className="block text-gray-700 font-semibold mb-2">
              Display Order
            </label>
            <input
              type="number"
              id="order"
              value={section.order}
              onChange={(e) => setSection({ ...section, order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            />
          </div>

          <div className="flex items-center pt-8">
            <input
              type="checkbox"
              id="isActive"
              checked={section.isActive}
              onChange={(e) => setSection({ ...section, isActive: e.target.checked })}
              className="w-4 h-4 text-luxury-red border-gray-300 rounded focus:ring-luxury-red"
            />
            <label htmlFor="isActive" className="ml-2 text-gray-700">
              Active (show on homepage)
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 red-gradient text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Section'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
