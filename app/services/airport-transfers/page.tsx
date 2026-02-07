import { Metadata } from 'next';
import { services } from '@/lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Airport Transfers - AL SAMA',
  description: 'Seamless airport transfers with professional chauffeurs. Flight monitoring, meet & greet service, and 24/7 availability.',
};

export default function AirportTransfersPage() {
  const service = services.find(s => s.slug === 'airport-transfers');

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Airport Transfers
          </h1>

          <div className="bg-gray-200 h-64 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-gray-600 text-lg">Airport Transfer Image</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-6">
              {service?.description}
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Our Services Include:</h2>
            <ul className="space-y-3 mb-8">
              {service?.features.map((feature, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <svg className="w-6 h-6 text-luxury-gold mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Choose Our Airport Transfer Service?</h3>
              <p className="text-gray-700 mb-4">
                Start your journey in Dubai with comfort and style. Our professional chauffeurs monitor your flight status to ensure timely pickups, even if your flight is delayed. With our meet & greet service, you'll be welcomed at the airport and assisted with your luggage.
              </p>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/book"
                className="inline-block bg-luxury-gold text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-opacity-90 transition"
              >
                Book Airport Transfer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
