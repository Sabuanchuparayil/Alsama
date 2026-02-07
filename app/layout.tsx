import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import WhatsAppChat from '@/components/WhatsAppChat';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AL SAMA - Luxury Chauffeur & Tourism',
  description: 'Experience Dubai in unmatched luxury. Premium chauffeur services and exclusive vehicle rentals tailored for you.',
  keywords: 'luxury chauffeur, Dubai tourism, car rental, premium vehicles, airport transfers',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'AL SAMA - Luxury Chauffeur & Tourism',
    description: 'Experience Dubai in unmatched luxury. Premium chauffeur services and exclusive vehicle rentals tailored for you.',
    url: 'https://alsama.ae',
    siteName: 'AL SAMA',
    images: [
      {
        url: 'https://alsama.ae/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AL SAMA Luxury Chauffeur & Tourism',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AL SAMA - Luxury Chauffeur & Tourism',
    description: 'Experience Dubai in unmatched luxury. Premium chauffeur services and exclusive vehicle rentals tailored for you.',
    creator: '@alsama_dubai',
    images: ['https://alsama.ae/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <WhatsAppChat 
          message="Hello! I would like to inquire about your luxury chauffeur services."
          position="bottom-right"
          showOnMobile={true}
        />
      </body>
    </html>
  );
}
