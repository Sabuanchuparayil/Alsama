'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface HeroContent {
  id?: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImageUrl: string | null;
  overlayOpacity: number;
  isActive: boolean;
}

export default function HeroManagementPage() {
  const router = useRouter();
  const [hero, setHero] = useState<HeroContent>({
    title: '',
    subtitle: '',
    buttonText: 'EXPLORE OUR FLEET',
    buttonLink: '/fleet',
    backgroundImageUrl: null,
    overlayOpacity: 0.4,
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [hasExisting, setHasExisting] = useState(false);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch('/api/cms/hero');
      const data = await res.json();
      setHero(data);
      // If the response has an 'id' field, there's an existing record
      setHasExisting(!!data.id);
    } catch (error) {
      console.error('Failed to fetch hero:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setHero({ ...hero, backgroundImageUrl: data.url });
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Use POST for new hero content, PUT for updating existing
      const method = hasExisting ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/hero', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
      });

      if (res.ok) {
        const data = await res.json();
        setHero(data);
        setHasExisting(true);
        alert('Hero content saved successfully!');
        router.refresh();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || 'Failed to save'}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save hero content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Hero Section Management</h1>

      {!hasExisting && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> No hero content exists in the database yet. Fill in the form below and save to create it.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
            Hero Title *
          </label>
          <input
            type="text"
            id="title"
            value={hero.title}
            onChange={(e) => setHero({ ...hero, title: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="Experience Dubai in Unmatched Luxury"
          />
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-gray-700 font-semibold mb-2">
            Hero Subtitle *
          </label>
          <textarea
            id="subtitle"
            value={hero.subtitle}
            onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="Your journey to elegance begins here..."
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
              value={hero.buttonText}
              onChange={(e) => setHero({ ...hero, buttonText: e.target.value })}
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
              value={hero.buttonLink}
              onChange={(e) => setHero({ ...hero, buttonLink: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            />
          </div>
        </div>

        <div>
          <label htmlFor="backgroundImage" className="block text-gray-700 font-semibold mb-2">
            Background Image
          </label>
          <div className="space-y-4">
            <input
              type="text"
              id="backgroundImage"
              value={hero.backgroundImageUrl || ''}
              onChange={(e) => setHero({ ...hero, backgroundImageUrl: e.target.value || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
              placeholder="https://example.com/image.jpg (or upload below)"
            />
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">OR upload:</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                disabled={uploading}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-luxury-red file:text-white hover:file:bg-luxury-red-dark"
              />
              {uploading && <span className="text-sm text-gray-600 animate-pulse">Uploading...</span>}
            </div>
          </div>
          {hero.backgroundImageUrl && (
            <div className="mt-4">
              <img
                src={hero.backgroundImageUrl}
                alt="Hero background preview"
                className="max-w-md h-48 object-cover rounded-md border border-gray-300"
              />
              <button
                type="button"
                onClick={() => setHero({ ...hero, backgroundImageUrl: null })}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Remove image
              </button>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="overlayOpacity" className="block text-gray-700 font-semibold mb-2">
            Overlay Opacity: {hero.overlayOpacity}
          </label>
          <input
            type="range"
            id="overlayOpacity"
            min="0"
            max="1"
            step="0.1"
            value={hero.overlayOpacity}
            onChange={(e) => setHero({ ...hero, overlayOpacity: parseFloat(e.target.value) })}
            className="w-full"
          />
          <p className="text-sm text-gray-600 mt-1">Adjust the darkness of the overlay on the background image</p>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={hero.isActive}
            onChange={(e) => setHero({ ...hero, isActive: e.target.checked })}
            className="w-4 h-4 text-luxury-red border-gray-300 rounded focus:ring-luxury-red"
          />
          <label htmlFor="isActive" className="ml-2 text-gray-700">
            Active (show on homepage)
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full red-gradient text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : hasExisting ? 'Update Hero Content' : 'Create Hero Content'}
        </button>
      </form>
    </div>
  );
}
