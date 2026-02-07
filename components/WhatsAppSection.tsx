'use client';

import { useContactInfo } from '@/lib/contact-info';

export default function WhatsAppSection() {
  const contactInfo = useContactInfo();

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91z" />
        </svg>
        <h3 className="text-xl font-semibold text-green-800">Chat with us on WhatsApp</h3>
      </div>
      <p className="text-green-700 mb-4">Get instant assistance and quick responses to your queries</p>
      <a
        href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello! I would like to inquire about your luxury chauffeur services.')}`}
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
  );
}
