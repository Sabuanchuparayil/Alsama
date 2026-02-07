'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Vehicle {
  id: string;
  name: string;
  category: string;
  description: string | null;
  imageUrl: string | null;
  price: number | null;
  features: string[];
  isActive: boolean;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/cms/vehicles');
      const data = await res.json();
      if (Array.isArray(data)) {
        setVehicles(data);
      } else {
        console.error('Invalid vehicles data:', data);
        setVehicles([]);
      }
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      const res = await fetch(`/api/cms/vehicles/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchVehicles();
      } else {
        alert('Failed to delete vehicle');
      }
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
      alert('Failed to delete vehicle');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Vehicles</h1>
        <Link
          href="/admin/content/vehicles/new"
          className="red-gradient text-white px-6 py-2 rounded-md hover:shadow-md transition-all"
        >
          Add New Vehicle
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No vehicles yet</h3>
          <p className="text-gray-500 mb-4">Add your first vehicle to get started.</p>
          <Link href="/admin/content/vehicles/new" className="text-luxury-red hover:underline font-medium">
            Add Vehicle →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-luxury-black text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{vehicle.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {vehicle.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">{vehicle.price ? `AED ${vehicle.price}` : 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${vehicle.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {vehicle.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/content/vehicles/${vehicle.id}`}
                      className="text-luxury-red hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
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
