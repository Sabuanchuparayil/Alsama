import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If not authenticated, render children without admin chrome
  // (middleware handles redirecting non-login admin pages)
  // This allows /admin/login to render without a redirect loop
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
}
