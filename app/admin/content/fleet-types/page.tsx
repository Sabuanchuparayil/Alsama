'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FleetType {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  order: number;
  isActive: boolean;
}

export default function FleetTypesPage() {
  const [fleetTypes, setFleetTypes] = useState<FleetType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFleetTypes();
  }, []);

  const fetchFleetTypes = async () => {
    try {
      const res = await fetch('/api/cms/fleet-types');
      const data = await res.json();
      if (Array.isArray(data)) {
        setFleetTypes(data);
      } else {
        console.error('Invalid fleet types data:', data);
        setFleetTypes([]);
      }
    } catch (error) {
      console.error('Failed to fetch fleet types:', error);
      setFleetTypes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this fleet type? Vehicles using this type will need to be updated first.')) return;

    try {
      const res = await fetch(`/api/cms/fleet-types/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchFleetTypes();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete fleet type');
      }
    } catch (error) {
      console.error('Failed to delete fleet type:', error);
      alert('Failed to delete fleet type');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Fleet Types</h1>
        <Link
          href="/admin/content/fleet-types/new"
          className="red-gradient text-white px-6 py-2 rounded-md hover:shadow-md transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Fleet Type
        </Link>
      </div>

      {fleetTypes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No fleet types yet</h3>
          <p className="text-gray-500 mb-4">Add your first fleet type to get started.</p>
          <Link href="/admin/content/fleet-types/new" className="text-luxury-red hover:underline font-medium">
            Add Fleet Type →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-luxury-black text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Order</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fleetTypes.map((fleetType) => (
                <tr key={fleetType.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{fleetType.name}</td>
                  <td className="px-6 py-4 text-gray-600">{fleetType.description || '-'}</td>
                  <td className="px-6 py-4 text-gray-600">{fleetType.order}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${fleetType.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {fleetType.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/content/fleet-types/${fleetType.id}`}
                      className="text-luxury-red hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(fleetType.id)}
                      className="text-red-600 hover:underline"
                    >
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
