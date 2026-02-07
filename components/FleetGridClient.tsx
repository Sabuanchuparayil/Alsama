'use client';

import { useEffect, useState } from 'react';
import FleetGrid from './FleetGrid';
import { Vehicle, vehicles as defaultVehicles } from '@/lib/data';

interface DatabaseVehicle {
  id: string;
  name: string;
  category: 'SUV' | 'Sedan' | 'Sports';
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
}

interface FleetGridClientProps {
  limit?: number;
}

export default function FleetGridClient({ limit }: FleetGridClientProps) {
  const fallback = limit ? defaultVehicles.slice(0, limit) : defaultVehicles;
  const [vehicles, setVehicles] = useState<Vehicle[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms/vehicles')
      .then((res) => res.json())
      .then((data: DatabaseVehicle[]) => {
        if (!Array.isArray(data)) {
          setVehicles(fallback);
          setLoading(false);
          return;
        }
        // Convert database vehicles to component Vehicle format
        const convertedVehicles: Vehicle[] = data
          .filter((v) => v.isActive)
          .map((v) => ({
            id: v.id,
            name: v.name,
            category: v.category,
            description: v.description || '',
            image: v.imageUrl || '/images/placeholder.jpg',
          }));
        
        // Use API data if available, otherwise use defaults
        const result = convertedVehicles.length > 0 ? convertedVehicles : defaultVehicles;
        setVehicles(limit ? result.slice(0, limit) : result);
        setLoading(false);
      })
      .catch(() => {
        setVehicles(fallback);
        setLoading(false);
      });
  }, [limit]);

  if (loading) {
    return <div className="text-center py-12">Loading vehicles...</div>;
  }

  return <FleetGrid vehicles={vehicles} />;
}
