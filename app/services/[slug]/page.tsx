import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  features: string[];
  isActive: boolean;
}

async function getService(slug: string): Promise<Service | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/cms/services`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    const services: Service[] = await res.json();
    const service = services.find(s => s.slug === slug && s.isActive);
    
    return service || null;
  } catch (error) {
    console.error('Failed to fetch service:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getService(params.slug);
  
  if (!service) {
    return {
      title: 'Service Not Found - AL SAMA',
      description: 'The requested service could not be found.',
    };
  }
  
  return {
    title: `${service.title} - AL SAMA`,
    description: service.description || `Learn more about our ${service.title} service.`,
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug);
  
  if (!service) {
    notFound();
  }
  
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-luxury-red">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-luxury-red">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{service.title}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {service.title}
          </h1>

          {/* Service Image */}
          {service.imageUrl ? (
            <div className="relative h-64 md:h-96 rounded-lg mb-8 overflow-hidden">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 h-64 rounded-lg mb-8 flex items-center justify-center">
              <span className="text-gray-600 text-lg font-medium">{service.title}</span>
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {service.description && (
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {service.description}
              </p>
            )}

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">What's Included:</h2>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <svg className="w-6 h-6 text-luxury-gold mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* CTA Section */}
            <div className="bg-gray-50 p-8 rounded-lg mb-8 mt-12 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Ready to Book?</h3>
              <p className="text-gray-700 mb-6">
                Experience luxury and comfort with our {service.title.toLowerCase()}. 
                Contact us today to make your reservation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book"
                  className="inline-block red-gradient text-white px-8 py-3 rounded-md text-lg font-semibold hover:shadow-lg transition"
                >
                  Book Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-white border-2 border-luxury-black text-luxury-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-50 transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Back to Services */}
            <div className="text-center mt-8">
              <Link
                href="/services"
                className="text-luxury-red hover:underline font-medium"
              >
                ← Back to All Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
