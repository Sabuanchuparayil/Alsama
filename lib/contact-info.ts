// Client-side hook for fetching contact info
'use client';

import { useState, useEffect } from 'react';

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  whatsappMessage?: string;
  address: string;
}

const defaultContactInfo: ContactInfo = {
  email: 'info@alsama.ae',
  phone: '+971 4 123 4567',
  whatsapp: '+971 50 123 4567',
  whatsappMessage: 'Hello! I would like to inquire about your luxury chauffeur services.',
  address: 'Dubai, United Arab Emirates',
};

export function useContactInfo(): ContactInfo {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);

  useEffect(() => {
    // Fetch with cache-busting to ensure fresh data
    const fetchContactInfo = async () => {
      try {
        // Add timestamp to bust cache
        const timestamp = Date.now();
        const res = await fetch(`/api/cms/site-settings?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data = await res.json();
        if (data && data.email) {
          setContactInfo(data);
        }
      } catch (error) {
        console.error('Failed to fetch contact info:', error);
        // Use default on error
      }
    };

    fetchContactInfo();
    
    // Listen for updates from admin panel
    const handleUpdate = () => {
      fetchContactInfo();
    };
    
    window.addEventListener('contactInfoUpdated', handleUpdate);
    
    // Refresh every 30 seconds to catch updates
    const interval = setInterval(fetchContactInfo, 30000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('contactInfoUpdated', handleUpdate);
    };
  }, []);

  return contactInfo;
}

// Server-side function for fetching contact info
export async function getContactInfo(): Promise<ContactInfo> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/cms/site-settings`, {
      cache: 'no-store',
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data && data.email) {
        return data;
      }
    }
  } catch (error) {
    console.error('Failed to fetch contact info:', error);
  }
  
  return defaultContactInfo;
}
