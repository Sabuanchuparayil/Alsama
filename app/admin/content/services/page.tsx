'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  features: string[];
  isActive: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/cms/services');
      const data = await res.json();
      if (Array.isArray(data)) {
        setServices(data);
      } else {
        console.error('Invalid services data:', data);
        setServices([]);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const res = await fetch(`/api/cms/services/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Dispatch event to notify frontend components to refresh
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('servicesUpdated'));
        }
        fetchServices();
      } else {
        alert('Failed to delete service');
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
      alert('Failed to delete service');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Services</h1>
        <Link
          href="/admin/content/services/new"
          className="red-gradient text-white px-6 py-2 rounded-md hover:shadow-md transition-all"
        >
          Add New Service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No services yet</h3>
          <p className="text-gray-500 mb-4">Add your first service to get started.</p>
          <Link href="/admin/content/services/new" className="text-luxury-red hover:underline font-medium">
            Add Service →
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
              {services.map((service) => (
                <tr key={service.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{service.title}</td>
                  <td className="px-6 py-4 text-gray-600">{service.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/content/services/${service.id}`}
                      className="text-luxury-red hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(service.id)}
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
