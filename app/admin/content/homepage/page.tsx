'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HomepageSection {
  id: string;
  sectionKey: string;
  title: string | null;
  description: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  isActive: boolean;
  order: number;
}

export default function HomepageSectionsPage() {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await fetch('/api/cms/homepage-sections?all=true');
      const data = await res.json();
      if (Array.isArray(data)) {
        setSections(data);
      } else {
        console.error('Invalid sections data:', data);
        setSections([]);
      }
    } catch (error) {
      console.error('Failed to fetch sections:', error);
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (key: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/cms/homepage-sections/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (res.ok) {
        fetchSections();
      }
    } catch (error) {
      console.error('Failed to update section:', error);
    }
  };

  const handleSeedSections = async () => {
    setSeeding(true);
    try {
      const defaultSections = [
        {
          sectionKey: 'luxury-choice',
          title: 'Your Luxury Choice',
          description: 'Choose from our wide range of luxury vehicles for your next trip.',
          buttonText: 'Book Now',
          buttonLink: '/book',
          order: 0,
        },
        {
          sectionKey: 'fleet-preview',
          title: 'Our Fleet',
          description: 'Explore our premium collection of luxury vehicles',
          buttonText: 'View All Vehicles',
          buttonLink: '/fleet',
          order: 1,
        },
        {
          sectionKey: 'services-preview',
          title: 'Our Services',
          description: 'Premium transportation solutions for every occasion',
          buttonText: 'View All Services',
          buttonLink: '/services',
          order: 2,
        },
      ];

      for (const section of defaultSections) {
        await fetch(`/api/cms/homepage-sections/${section.sectionKey}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(section),
        });
      }

      fetchSections();
    } catch (error) {
      console.error('Failed to seed sections:', error);
      alert('Failed to initialize sections');
    } finally {
      setSeeding(false);
    }
  };

  const sectionMap: Record<string, string> = {
    'luxury-choice': 'Luxury Choice Section',
    'fleet-preview': 'Fleet Preview Section',
    'services-preview': 'Services Preview Section',
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Homepage Sections</h1>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800 text-sm">
          These sections control the content displayed on the homepage. Edit each section to customize titles, descriptions, and visibility.
        </p>
      </div>

      {sections.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No sections configured</h3>
          <p className="text-gray-500 mb-4">Initialize the default homepage sections to get started.</p>
          <button
            onClick={handleSeedSections}
            disabled={seeding}
            className="red-gradient text-white px-6 py-2 rounded-md hover:shadow-md transition-all disabled:opacity-50"
          >
            {seeding ? 'Initializing...' : 'Initialize Default Sections'}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-luxury-black text-white">
              <tr>
                <th className="px-6 py-3 text-left">Section</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Order</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <tr key={section.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">
                    {sectionMap[section.sectionKey] || section.sectionKey}
                  </td>
                  <td className="px-6 py-4">{section.title || 'No title'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${section.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {section.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{section.order}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/content/homepage/${section.sectionKey}`}
                      className="text-luxury-red hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleToggleActive(section.sectionKey, section.isActive)}
                      className="text-blue-600 hover:underline"
                    >
                      {section.isActive ? 'Deactivate' : 'Activate'}
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
