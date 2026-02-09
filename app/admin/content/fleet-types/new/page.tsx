'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewFleetTypePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    order: 0,
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/cms/fleet-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          icon: formData.icon.trim() || null,
          order: formData.order,
          isActive: formData.isActive,
        }),
      });

      if (res.ok) {
        router.push('/admin/content/fleet-types');
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || 'Failed to create fleet type'}`);
      }
    } catch (error) {
      console.error('Failed to create fleet type:', error);
      alert('Failed to create fleet type');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/content/fleet-types" className="text-gray-600 hover:text-gray-800">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Add New Fleet Type</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6 max-w-2xl">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="e.g. Luxury, Electric, Convertible"
          />
          <p className="text-sm text-gray-500 mt-1">This will be used as the category name for vehicles</p>
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="Brief description of this fleet type"
          />
        </div>

        <div>
          <label htmlFor="icon" className="block text-gray-700 font-semibold mb-2">
            Icon (Optional)
          </label>
          <input
            type="text"
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="Icon identifier (e.g. car, truck, motorcycle)"
          />
          <p className="text-sm text-gray-500 mt-1">Optional icon identifier for future use</p>
        </div>

        <div>
          <label htmlFor="order" className="block text-gray-700 font-semibold mb-2">
            Display Order
          </label>
          <input
            type="number"
            id="order"
            min="0"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
          />
          <p className="text-sm text-gray-500 mt-1">Lower numbers appear first (0, 1, 2, ...)</p>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-4 h-4 text-luxury-red border-gray-300 rounded focus:ring-luxury-red"
          />
          <label htmlFor="isActive" className="ml-2 text-gray-700">
            Active (visible in vehicle category dropdown)
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 red-gradient text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? 'Creating...' : 'Create Fleet Type'}
          </button>
          <Link
            href="/admin/content/fleet-types"
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
