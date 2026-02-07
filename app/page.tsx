import dynamic from 'next/dynamic';
import HeroClient from '@/components/HeroClient';

// Lazy load heavy components
const HomepageSectionsClient = dynamic(
  () => import('@/components/HomepageSectionsClient'),
  {
    loading: () => <div className="py-16 text-center">Loading...</div>,
    ssr: true,
  }
);

export default function Home() {
  return (
    <div>
      <HeroClient />
      <HomepageSectionsClient />
    </div>
  );
}
