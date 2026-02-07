import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import ContactInfoClient from '@/components/ContactInfoClient';
import WhatsAppSection from '@/components/WhatsAppSection';

export const metadata: Metadata = {
  title: 'Contact Us - AL SAMA',
  description: 'Get in touch with AL SAMA for luxury chauffeur services and vehicle rentals.',
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

              <ContactInfoClient />

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

          {/* WhatsApp Contact */}
          <div className="mt-12">
            <WhatsAppSection />
          </div>
        </div>
      </div>
    </div>
  );
}
