'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/lib/data';

interface FleetType {
  id: string;
  name: string;
  isActive: boolean;
  order: number;
}

interface FleetGridProps {
  vehicles: Vehicle[];
}

export default function FleetGrid({ vehicles }: FleetGridProps) {
  const [fleetTypes, setFleetTypes] = useState<FleetType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetch('/api/cms/fleet-types')
      .then((res) => res.json())
      .then((data: FleetType[]) => {
        if (Array.isArray(data)) {
          const activeTypes = data.filter(ft => ft.isActive).sort((a, b) => a.order - b.order);
          setFleetTypes(activeTypes);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch fleet types:', error);
      });
  }, []);

  const categories = ['All', ...fleetTypes.map(ft => ft.name)];
  
  const filteredVehicles = selectedCategory === 'All' 
    ? vehicles 
    : vehicles.filter(v => v.category === selectedCategory);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-md transition ${
              selectedCategory === category
                ? 'red-gradient text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-luxury-red hover:text-white'
            }`}
          >
            {category === 'All' ? 'All Vehicles' : category}
          </button>
        ))}
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative h-64 bg-gray-200 overflow-hidden">
              {vehicle.image && vehicle.image.trim() !== '' && vehicle.image !== '/images/placeholder.jpg' ? (
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.querySelector('.placeholder')?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`placeholder absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 ${vehicle.image && vehicle.image.trim() !== '' && vehicle.image !== '/images/placeholder.jpg' ? 'hidden' : ''}`}>
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span className="text-gray-600 text-sm font-medium">{vehicle.name}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-luxury-red text-white text-xs rounded-full font-semibold shadow-md">
                  {vehicle.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{vehicle.name}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{vehicle.description}</p>
              <Link
                href={`/fleet/${vehicle.id}`}
                className="block w-full bg-luxury-black text-white py-2 rounded-md hover:bg-luxury-red transition font-medium text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No vehicles found in this category.</p>
        </div>
      )}
    </div>
  );
}
