'use client';

import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { Service, services as defaultServices } from '@/lib/data';

interface DatabaseService {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  features: string[];
  isActive: boolean;
}

interface ServicesClientProps {
  limit?: number;
}

export default function ServicesClient({ limit }: ServicesClientProps) {
  const fallback = limit ? defaultServices.slice(0, limit) : defaultServices;
  const [services, setServices] = useState<Service[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms/services')
      .then((res) => res.json())
      .then((data: DatabaseService[]) => {
        if (!Array.isArray(data)) {
          setServices(fallback);
          setLoading(false);
          return;
        }
        // Convert database services to component Service format
        const convertedServices: Service[] = data
          .filter((s) => s.isActive && s.slug)
          .map((s) => ({
            id: s.id,
            title: s.title,
            slug: s.slug || s.id,
            description: s.description || '',
            features: s.features || [],
            image: s.imageUrl || '/images/placeholder.jpg',
          }));
        
        // Use API data if available, otherwise use defaults
        const result = convertedServices.length > 0 ? convertedServices : defaultServices;
        setServices(limit ? result.slice(0, limit) : result);
        setLoading(false);
      })
      .catch(() => {
        setServices(fallback);
        setLoading(false);
      });
  }, [limit]);

  if (loading) {
    return <div className="text-center py-12">Loading services...</div>;
  }

  return (
    <>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </>
  );
}
