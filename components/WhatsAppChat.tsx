'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useContactInfo } from '@/lib/contact-info';

interface WhatsAppChatProps {
  phoneNumber?: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left';
  showOnMobile?: boolean;
}

export default function WhatsAppChat({ 
  phoneNumber, 
  message,
  position = 'bottom-right',
  showOnMobile = true 
}: WhatsAppChatProps) {
  const contactInfo = useContactInfo();
  const whatsappNumber = phoneNumber || contactInfo.whatsapp;
  const chatMessage = message || contactInfo.whatsappMessage || 'Hello! I would like to inquire about your luxury chauffeur services.';
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleWhatsAppClick = () => {
    if (!whatsappNumber) {
      console.warn('WhatsApp number not configured. Please update in admin settings.');
      return;
    }
    const encodedMessage = encodeURIComponent(chatMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible || !whatsappNumber) return null;

  // Position: bottom-right with proper z-index to avoid menu overlap
  // Header is z-50, so chat should be z-40
  const positionClasses = position === 'bottom-right' 
    ? 'bottom-6 right-6' 
    : 'bottom-6 left-6';

  return (
    <div className={`fixed ${positionClasses} z-40 transition-all duration-300 ${isScrolled ? 'scale-110' : 'scale-100'}`}>
      {/* Chat Bubble */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-3 max-w-xs border border-gray-200 relative animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close chat"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-800 mb-2">
              <strong>AL SAMA</strong>
            </p>
            <p className="text-sm text-gray-600">
              Need help? Chat with us on WhatsApp for instant assistance!
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91z" />
        </svg>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-0 group-hover:opacity-75 transition-opacity"></div>
      </button>

      {/* Notification dot */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
    </div>
  );
}