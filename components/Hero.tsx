import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative red-black-gradient text-white py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10 animate-fade-in">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Experience Dubai in Unmatched Luxury
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            Your journey to elegance begins here. Premium chauffeur services and exclusive vehicle rentals tailored for you.
          </p>
          <Link
            href="/fleet"
            className="inline-block red-gradient text-white px-8 py-4 rounded-md text-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 shadow-md"
          >
            EXPLORE OUR FLEET
          </Link>
        </div>
      </div>
    </section>
  );
}
