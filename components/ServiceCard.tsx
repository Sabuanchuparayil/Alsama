import Link from 'next/link';
import Image from 'next/image';
import { Service } from '@/lib/data';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      {/* Service Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 overflow-hidden">
        {service.image && service.image.trim() !== '' ? (
          <>
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.parentElement?.querySelector('.placeholder');
                if (placeholder) {
                  placeholder.classList.remove('hidden');
                }
              }}
            />
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity"></div>
          </>
        ) : null}
        {/* Placeholder shown when no image or image fails to load */}
        <div className={`placeholder absolute inset-0 flex items-center justify-center ${service.image && service.image.trim() !== '' ? 'hidden' : ''}`}>
          <div className="text-center">
            <svg className="w-12 h-12 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700 font-semibold text-lg">{service.title}</span>
          </div>
        </div>
      </div>
      
      {/* Service Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">{service.description}</p>
        <ul className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600 text-sm">
              <svg className="w-4 h-4 mr-2 text-luxury-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        {service.slug && (
          <Link
            href={`/services/${service.slug}`}
            className="block w-full red-gradient text-white text-center py-2 rounded-md hover:shadow-md transition-all font-medium"
          >
            Learn More
          </Link>
        )}
      </div>
    </div>
  );
}
