'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewVehiclePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sedan' as 'SUV' | 'Sedan' | 'Sports',
    description: '',
    imageUrl: '',
    price: '',
    features: [''],
    isActive: true,
  });

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
      const res = await fetch('/api/cms/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          description: formData.description || null,
          imageUrl: formData.imageUrl || null,
          price: formData.price ? parseFloat(formData.price) : null,
          features: formData.features.filter(f => f.trim()),
          isActive: formData.isActive,
        }),
      });

      if (res.ok) {
        router.push('/admin/content/vehicles');
      } else {
        const error = await res.json();
        alert(`Error: ${JSON.stringify(error.error) || 'Failed to create vehicle'}`);
      }
    } catch {
      alert('Failed to create vehicle');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/content/vehicles" className="text-gray-600 hover:text-gray-800">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Add New Vehicle</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6 max-w-2xl">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name *</label>
          <input type="text" id="name" required value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="e.g. Mercedes-Benz S-Class" />
        </div>

        <div>
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category *</label>
          <select id="category" value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as 'SUV' | 'Sedan' | 'Sports' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red">
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea id="description" rows={3} value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="Brief description of the vehicle" />
        </div>

        <div>
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price (AED/day)</label>
          <input type="number" id="price" value={formData.price} step="0.01" min="0"
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="e.g. 1500" />
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
            <img src={formData.imageUrl} alt="Preview" className="mt-2 h-32 object-cover rounded-md" />
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Features</label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input type="text" value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
                placeholder="e.g. Leather seats" />
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
            {saving ? 'Creating...' : 'Create Vehicle'}
          </button>
          <Link href="/admin/content/vehicles"
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition text-center">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
