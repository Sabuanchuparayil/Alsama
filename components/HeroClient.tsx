'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeroContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImageUrl: string | null;
  overlayOpacity: number;
}

export default function HeroClient() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms/hero')
      .then((res) => res.json())
      .then((data) => {
        setHero(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to default
        setHero({
          title: 'Experience Dubai in Unmatched Luxury',
          subtitle: 'Your journey to elegance begins here. Premium chauffeur services and exclusive vehicle rentals tailored for you.',
          buttonText: 'EXPLORE OUR FLEET',
          buttonLink: '/fleet',
          backgroundImageUrl: null,
          overlayOpacity: 0.4,
        });
        setLoading(false);
      });
  }, []);

  if (loading || !hero) {
    return (
      <section className="relative red-black-gradient text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10 animate-fade-in">
          <div className="max-w-3xl">
            <div className="h-16 bg-gray-700 rounded mb-6 animate-pulse"></div>
            <div className="h-8 bg-gray-700 rounded mb-8 animate-pulse"></div>
            <div className="h-12 bg-gray-700 rounded w-48 animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative text-white py-20 md:py-32 overflow-hidden"
      style={{
        backgroundImage: hero.backgroundImageUrl 
          ? `url(${hero.backgroundImageUrl})` 
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!hero.backgroundImageUrl && (
        <div className="absolute inset-0 red-black-gradient"></div>
      )}
      {hero.backgroundImageUrl ? (
        <>
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: hero.overlayOpacity }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-30"></div>
        </>
      ) : (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: hero.overlayOpacity }}
        ></div>
      )}
      <div className="container mx-auto px-4 relative z-10 animate-fade-in">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            {hero.subtitle}
          </p>
          {hero.buttonLink && (
            <Link
              href={hero.buttonLink || '/fleet'}
              className="inline-block red-gradient text-white px-8 py-4 rounded-md text-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 shadow-md"
            >
              {hero.buttonText || 'EXPLORE OUR FLEET'}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
