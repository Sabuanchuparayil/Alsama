import { Metadata } from 'next';
import ServicesClient from '@/components/ServicesClient';

export const metadata: Metadata = {
  title: 'Services - AL SAMA',
  description: 'Premium transportation services including airport transfers, city tours, corporate hire, and wedding services.',
};

export default function ServicesPage() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Services
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Premium transportation solutions tailored to your needs. Experience luxury and comfort with every journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServicesClient />
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Why Choose Our Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-800">Professional Chauffeurs</h3>
                <p className="text-gray-600">Experienced and courteous drivers</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-800">24/7 Availability</h3>
                <p className="text-gray-600">Round-the-clock service</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-800">Premium Vehicles</h3>
                <p className="text-gray-600">Luxury fleet maintained to highest standards</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-800">Competitive Pricing</h3>
                <p className="text-gray-600">Transparent and fair rates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
