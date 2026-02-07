// Client-side hook for fetching contact info
'use client';

import { useState, useEffect } from 'react';

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
}

const defaultContactInfo: ContactInfo = {
  email: 'info@alsama.ae',
  phone: '+971 4 123 4567',
  whatsapp: '+971 50 123 4567',
  address: 'Dubai, United Arab Emirates',
};

export function useContactInfo(): ContactInfo {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);

  useEffect(() => {
    fetch('/api/cms/site-settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.email) {
          setContactInfo(data);
        }
      })
      .catch(() => {
        // Use default on error
      });
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
