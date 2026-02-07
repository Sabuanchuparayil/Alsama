import { Metadata } from 'next';
import FleetGridClient from '@/components/FleetGridClient';
import FleetStats from '@/components/FleetStats';

export const metadata: Metadata = {
  title: 'Our Fleet - AL SAMA',
  description: 'Explore our premium collection of luxury vehicles including SUVs, Sedans, and Sports cars.',
};

export default function FleetPage() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Fleet
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our wide range of luxury vehicles for your next trip. Premium quality and unmatched comfort.
          </p>
        </div>

        <FleetGridClient />

        {/* Categories Section */}
        <FleetStats />
      </div>
    </div>
  );
}
