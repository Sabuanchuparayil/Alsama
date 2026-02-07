import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { contactInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact Us - AL SAMA',
  description: 'Get in touch with AL SAMA for luxury chauffeur services and vehicle rentals. Email: info@alsama.ae, Phone: +971 4 123 4567',
};

export default function ContactPage() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-8">
                We&apos;re here to help you plan your perfect journey. Reach out to us through any of the following channels.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Email</h3>
                    <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-luxury-gold transition">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Phone</h3>
                    <a href={`tel:${contactInfo.phone}`} className="text-gray-600 hover:text-luxury-gold transition">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Address</h3>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Hours</h3>
                <p className="text-gray-700 mb-1">Monday - Sunday: 24/7</p>
                <p className="text-gray-600 text-sm">We&apos;re available around the clock to serve you</p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* WhatsApp Contact */}
        <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91z" />
            </svg>
            <h3 className="text-xl font-semibold text-green-800">Chat with us on WhatsApp</h3>
          </div>
          <p className="text-green-700 mb-4">Get instant assistance and quick responses to your queries</p>
          <a
            href="https://wa.me/97141234567?text=Hello! I would like to inquire about your luxury chauffeur services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
