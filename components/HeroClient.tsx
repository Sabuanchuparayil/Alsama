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
  enableCarousel?: boolean;
  carouselInterval?: number;
  carouselImages?: string[];
}

export default function HeroClient() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
          enableCarousel: false,
          carouselInterval: 5000,
          carouselImages: [],
        });
        setLoading(false);
      });
  }, []);

  // Carousel effect
  useEffect(() => {
    if (!hero?.enableCarousel || !hero.carouselImages || hero.carouselImages.length <= 1) {
      return;
    }

    const interval = hero.carouselInterval || 5000;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % hero.carouselImages!.length);
    }, interval);

    return () => clearInterval(timer);
  }, [hero?.enableCarousel, hero?.carouselImages, hero?.carouselInterval]);

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

  // Determine background image
  const getBackgroundImage = () => {
    if (hero.enableCarousel && hero.carouselImages && hero.carouselImages.length > 0) {
      return hero.carouselImages[currentImageIndex];
    }
    return hero.backgroundImageUrl;
  };

  const backgroundImage = getBackgroundImage();
  const hasImages = hero.enableCarousel && hero.carouselImages && hero.carouselImages.length > 0;

  return (
    <section 
      className="relative text-white py-20 md:py-32 overflow-hidden"
      style={{
        backgroundImage: backgroundImage 
          ? `url(${backgroundImage})` 
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: hero.enableCarousel ? 'background-image 1s ease-in-out' : undefined,
      }}
    >
      {!backgroundImage && (
        <div className="absolute inset-0 red-black-gradient"></div>
      )}
      {backgroundImage ? (
        <>
          {/* Carousel images overlay */}
          {hero.enableCarousel && hero.carouselImages && hero.carouselImages.length > 1 && (
            <div className="absolute inset-0">
              {hero.carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              ))}
            </div>
          )}
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
      
      {/* Carousel indicators */}
      {hero.enableCarousel && hero.carouselImages && hero.carouselImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {hero.carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 w-2 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10 animate-fade-in">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-md text-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 shadow-md text-center animate-pulse hover:animate-none"
            >
              📅 Book Now
            </Link>
            {hero.buttonLink && (
              <Link
                href={hero.buttonLink || '/fleet'}
                className="inline-block red-gradient text-white px-8 py-4 rounded-md text-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 shadow-md text-center"
              >
                {hero.buttonText || 'EXPLORE OUR FLEET'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
