'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    imageUrl: '',
    features: [''],
    isActive: true,
  });

  useEffect(() => {
    fetchService();
  }, [serviceId]);

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/cms/services/${serviceId}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          description: data.description || '',
          imageUrl: data.imageUrl || '',
          features: data.features?.length ? data.features : [''],
          isActive: data.isActive ?? true,
        });
      } else {
        alert('Service not found');
        router.push('/admin/content/services');
      }
    } catch {
      alert('Failed to load service');
      router.push('/admin/content/services');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload/image', { method: 'POST', body: fd });
      if (res.ok) {
        const data = await res.json();
        setFormData({ ...formData, imageUrl: data.url });
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to upload image');
      }
    } catch {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const addFeature = () => setFormData({ ...formData, features: [...formData.features, ''] });
  const removeFeature = (index: number) => {
    const features = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: features.length ? features : [''] });
  };
  const updateFeature = (index: number, value: string) => {
    const features = [...formData.features];
    features[index] = value;
    setFormData({ ...formData, features });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/cms/services/${serviceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          description: formData.description || null,
          imageUrl: formData.imageUrl || null,
          features: formData.features.filter(f => f.trim()),
          isActive: formData.isActive,
        }),
      });

      if (res.ok) {
        router.push('/admin/content/services');
      } else {
        const error = await res.json();
        alert(`Error: ${JSON.stringify(error.error) || 'Failed to update service'}`);
      }
    } catch {
      alert('Failed to update service');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/content/services" className="text-gray-600 hover:text-gray-800">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Edit Service</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6 max-w-2xl">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title *</label>
          <input type="text" id="title" required value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red" />
        </div>

        <div>
          <label htmlFor="slug" className="block text-gray-700 font-semibold mb-2">URL Slug *</label>
          <input type="text" id="slug" required value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red" />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea id="description" rows={4} value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red" />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Image</label>
          <input type="text" value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red mb-2"
            placeholder="Image URL (or upload below)" />
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-luxury-red file:text-white" />
          {uploading && <p className="text-sm text-gray-500 animate-pulse mt-1">Uploading...</p>}
          {formData.imageUrl && (
            <div className="mt-2">
              <img src={formData.imageUrl} alt="Preview" className="h-32 object-cover rounded-md" />
              <button type="button" onClick={() => setFormData({ ...formData, imageUrl: '' })}
                className="mt-1 text-sm text-red-600 hover:underline">Remove</button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Features</label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input type="text" value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
                placeholder="e.g. Flight monitoring" />
              <button type="button" onClick={() => removeFeature(index)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md">✕</button>
            </div>
          ))}
          <button type="button" onClick={addFeature}
            className="text-sm text-luxury-red hover:underline">+ Add Feature</button>
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="isActive" checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-4 h-4 text-luxury-red border-gray-300 rounded focus:ring-luxury-red" />
          <label htmlFor="isActive" className="ml-2 text-gray-700">Active (visible on website)</label>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={saving}
            className="flex-1 red-gradient text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all disabled:opacity-50">
            {saving ? 'Saving...' : 'Update Service'}
          </button>
          <Link href="/admin/content/services"
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition text-center">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
