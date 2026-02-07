'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import FleetGridClient from './FleetGridClient';
import ServicesClient from './ServicesClient';

interface HomepageSection {
  sectionKey: string;
  title: string | null;
  description: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  isActive: boolean;
  order: number;
}

export default function HomepageSectionsClient() {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const defaultSections: HomepageSection[] = [
      {
        sectionKey: 'luxury-choice',
        title: 'Luxury Choice',
        description: 'Choose from our wide range of luxury vehicles for your next trip.',
        buttonText: 'Book Now',
        buttonLink: '/book',
        isActive: true,
        order: 0,
      },
      {
        sectionKey: 'fleet-preview',
        title: 'Our Fleet',
        description: 'Explore our premium collection of luxury vehicles',
        buttonText: 'View All Vehicles',
        buttonLink: '/fleet',
        isActive: true,
        order: 1,
      },
      {
        sectionKey: 'services-preview',
        title: 'Our Services',
        description: 'Premium transportation solutions for every occasion',
        buttonText: 'View All Services',
        buttonLink: '/services',
        isActive: true,
        order: 2,
      },
    ];

    fetch('/api/cms/homepage-sections')
      .then((res) => res.json())
      .then((data: HomepageSection[] | { error?: string }) => {
        // Check if response is an array and has content, otherwise use defaults
        if (Array.isArray(data) && data.length > 0) {
          // Merge defaults with API data, ensuring all required sections exist
          const mergedSections = defaultSections.map((defaultSection) => {
            const apiSection = data.find((s) => s.sectionKey === defaultSection.sectionKey);
            return apiSection && apiSection.isActive ? apiSection : defaultSection;
          });
          setSections(mergedSections);
        } else {
          // API returned empty array or error object, use defaults
          setSections(defaultSections);
        }
        setLoading(false);
      })
      .catch(() => {
        // Use default sections if API fails
        setSections(defaultSections);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-16 text-center">Loading...</div>;
  }

  // Ensure sections is always an array
  const sectionsArray = Array.isArray(sections) ? sections : [];
  
  const luxuryChoice = sectionsArray.find(s => s.sectionKey === 'luxury-choice');
  const fleetPreview = sectionsArray.find(s => s.sectionKey === 'fleet-preview');
  const servicesPreview = sectionsArray.find(s => s.sectionKey === 'services-preview');

  return (
    <>
      {/* Luxury Choice Section */}
      {luxuryChoice?.isActive && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              {luxuryChoice.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {luxuryChoice.title}
                </h2>
              )}
              {luxuryChoice.description && (
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  {luxuryChoice.description}
                </p>
              )}
            </div>
            {luxuryChoice.buttonText && luxuryChoice.buttonLink && (
              <div className="text-center">
                <Link
                  href={luxuryChoice.buttonLink || '/book'}
                  className="inline-block red-gradient text-white px-8 py-3 rounded-md text-lg font-semibold hover:shadow-md transition"
                >
                  {luxuryChoice.buttonText}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Fleet Preview */}
      {fleetPreview?.isActive && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              {fleetPreview.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {fleetPreview.title}
                </h2>
              )}
              {fleetPreview.description && (
                <p className="text-gray-600 text-lg">
                  {fleetPreview.description}
                </p>
              )}
            </div>
            <FleetGridClient limit={6} />
            {fleetPreview.buttonText && fleetPreview.buttonLink && (
              <div className="text-center mt-12">
                <Link
                  href={fleetPreview.buttonLink || '/fleet'}
                  className="inline-block bg-luxury-black text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-luxury-red transition"
                >
                  {fleetPreview.buttonText}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Services Preview */}
      {servicesPreview?.isActive && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              {servicesPreview.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {servicesPreview.title}
                </h2>
              )}
              {servicesPreview.description && (
                <p className="text-gray-600 text-lg">
                  {servicesPreview.description}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServicesClient limit={3} />
            </div>
            {servicesPreview.buttonText && servicesPreview.buttonLink && (
              <div className="text-center mt-12">
                <Link
                  href={servicesPreview.buttonLink || '/services'}
                  className="inline-block bg-luxury-black text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-luxury-red transition"
                >
                  {servicesPreview.buttonText}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
