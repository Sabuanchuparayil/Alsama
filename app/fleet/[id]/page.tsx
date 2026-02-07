'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useContactInfo } from '@/lib/contact-info';

interface Vehicle {
  id: string;
  name: string;
  category: 'SUV' | 'Sedan' | 'Sports';
  description: string | null;
  imageUrl: string | null;
  price: number | null;
  features: string[];
  isActive: boolean;
}

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = params.id as string;
  const contactInfo = useContactInfo();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (vehicleId) {
      fetchVehicle();
    }
  }, [vehicleId]);

  const fetchVehicle = async () => {
    try {
      const res = await fetch(`/api/cms/vehicles/${vehicleId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.isActive) {
          setVehicle(data);
        } else {
          setError('Vehicle not available');
        }
      } else {
        setError('Vehicle not found');
      }
    } catch (err) {
      setError('Failed to load vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello! I'm interested in booking the ${vehicle?.name || 'vehicle'}. Please provide more information.`
    );
    const whatsappNumber = contactInfo.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-red mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Vehicle Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The vehicle you are looking for does not exist or is no longer available.'}</p>
          <Link
            href="/fleet"
            className="inline-block bg-luxury-black text-white px-6 py-3 rounded-md hover:bg-luxury-red transition"
          >
            Back to Fleet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-luxury-red">Home</Link>
            <span>/</span>
            <Link href="/fleet" className="hover:text-luxury-red">Fleet</Link>
            <span>/</span>
            <span className="text-gray-800">{vehicle.name}</span>
          </nav>
        </div>
      </div>

      {/* Vehicle Detail */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              {vehicle.imageUrl && vehicle.imageUrl !== '/images/placeholder.jpg' ? (
                <Image
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span className="text-gray-600 font-medium">{vehicle.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-luxury-red text-white text-sm rounded-full font-semibold mb-4">
                {vehicle.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{vehicle.name}</h1>
              {vehicle.price && (
                <p className="text-3xl font-semibold text-luxury-red mb-6">
                  AED {vehicle.price.toLocaleString()} <span className="text-lg text-gray-600 font-normal">/ day</span>
                </p>
              )}
            </div>

            {vehicle.description && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
              </div>
            )}

            {vehicle.features && vehicle.features.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Features</h2>
                <ul className="space-y-2">
                  {vehicle.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-luxury-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-6 space-y-4">
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-semibold transition flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91z" />
                </svg>
                <span>Book via WhatsApp</span>
              </button>
              <Link
                href="/contact"
                className="block w-full bg-luxury-black hover:bg-luxury-red text-white text-center py-3 rounded-md font-semibold transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
