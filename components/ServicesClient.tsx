'use client';

import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  image: string;
}

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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      // Add timestamp to bust cache
      const timestamp = Date.now();
      const res = await fetch(`/api/cms/services?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data: DatabaseService[] = await res.json();
      
      if (!Array.isArray(data)) {
        console.error('Invalid services data received:', data);
        setServices([]);
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
          image: s.imageUrl || '',
        }));
      
      // Only show services from database - no hardcoded fallback
      setServices(limit ? convertedServices.slice(0, limit) : convertedServices);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      // Show empty array on error - no hardcoded fallback
      setServices([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    
    // Listen for updates from admin panel
    const handleUpdate = () => {
      fetchServices();
    };
    
    window.addEventListener('servicesUpdated', handleUpdate);
    
    // Refresh every 30 seconds to catch updates
    const interval = setInterval(fetchServices, 30000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('servicesUpdated', handleUpdate);
    };
  }, [limit]);

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading services...</div>;
  }

  if (services.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <div className="text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-lg font-medium">No services available at the moment</p>
          <p className="text-sm mt-2">Please check back later or contact us for more information</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </>
  );
}
