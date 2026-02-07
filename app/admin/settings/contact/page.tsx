'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
}

export default function ContactSettingsPage() {
  const router = useRouter();
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const res = await fetch('/api/cms/site-settings');
      const data = await res.json();
      setContactInfo(data);
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
      setError('Failed to load contact information');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSaving(true);

    try {
      const res = await fetch('/api/cms/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactInfo),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        router.refresh();
        
        // Force refresh of contact info on frontend
        // Dispatch a custom event to notify all components
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('contactInfoUpdated'));
        }
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to save contact information');
      }
    } catch (error) {
      console.error('Save error:', error);
      setError('Failed to save contact information');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact Information Settings</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">Contact information saved successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="info@alsama.ae"
          />
          <p className="text-sm text-gray-600 mt-1">This email will be displayed on the contact page and footer</p>
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="+971 4 123 4567"
          />
          <p className="text-sm text-gray-600 mt-1">Main contact phone number</p>
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-gray-700 font-semibold mb-2">
            WhatsApp Number *
          </label>
          <input
            type="tel"
            id="whatsapp"
            value={contactInfo.whatsapp}
            onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="+971 50 123 4567"
          />
          <p className="text-sm text-gray-600 mt-1">
            WhatsApp number for the floating chat button. Include country code (e.g., +971)
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Format: +[country code][number] (e.g., +971501234567)
          </p>
        </div>

        <div>
          <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
            Address *
          </label>
          <textarea
            id="address"
            value={contactInfo.address}
            onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
            placeholder="Dubai, United Arab Emirates"
          />
          <p className="text-sm text-gray-600 mt-1">Business address displayed on contact page</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Preview</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Email:</strong> {contactInfo.email}</p>
            <p><strong>Phone:</strong> {contactInfo.phone}</p>
            <p><strong>WhatsApp:</strong> {contactInfo.whatsapp}</p>
            <p><strong>Address:</strong> {contactInfo.address}</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full red-gradient text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Contact Information'}
        </button>
      </form>
    </div>
  );
}
