export interface Vehicle {
  id: string;
  name: string;
  category: 'SUV' | 'Sedan' | 'Sports';
  image: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  image: string;
}

export const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Mercedes-Benz S-Class',
    category: 'Sedan',
    image: '', // Image will be managed via CMS
    description: 'Ultimate luxury sedan with premium comfort and advanced technology.',
  },
  {
    id: '2',
    name: 'BMW 7 Series',
    category: 'Sedan',
    image: '', // Image will be managed via CMS
    description: 'Sophisticated elegance meets cutting-edge innovation.',
  },
  {
    id: '3',
    name: 'Rolls-Royce Phantom',
    category: 'Sedan',
    image: '', // Image will be managed via CMS
    description: 'The pinnacle of luxury motoring.',
  },
  {
    id: '4',
    name: 'Range Rover',
    category: 'SUV',
    image: '', // Image will be managed via CMS
    description: 'Luxury SUV with exceptional comfort and capability.',
  },
  {
    id: '5',
    name: 'Mercedes-Benz G-Class',
    category: 'SUV',
    image: '', // Image will be managed via CMS
    description: 'Iconic luxury SUV with legendary off-road capability.',
  },
  {
    id: '6',
    name: 'Bentley Bentayga',
    category: 'SUV',
    image: '', // Image will be managed via CMS
    description: 'Ultra-luxury SUV combining performance and refinement.',
  },
  {
    id: '7',
    name: 'Ferrari F8 Tributo',
    category: 'Sports',
    image: '', // Image will be managed via CMS
    description: 'Exhilarating performance meets Italian craftsmanship.',
  },
  {
    id: '8',
    name: 'Lamborghini Huracán',
    category: 'Sports',
    image: '', // Image will be managed via CMS
    description: 'Pure Italian supercar excellence.',
  },
  {
    id: '9',
    name: 'Porsche 911',
    category: 'Sports',
    image: '', // Image will be managed via CMS
    description: 'Timeless sports car with legendary performance.',
  },
];

// Services are now managed entirely through the CMS
// No hardcoded services - all data comes from the database

export const contactInfo = {
  email: 'info@alsama.ae',
  phone: '+971 4 123 4567',
  whatsapp: '+971 50 123 4567',
  address: 'Dubai, United Arab Emirates',
};
