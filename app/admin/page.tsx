import { prisma } from '@/lib/db/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  let vehiclesCount = 0;
  let servicesCount = 0;
  let bookingsCount = 0;
  let pendingBookings = 0;
  let dbConnected = true;

  try {
    [vehiclesCount, servicesCount, bookingsCount, pendingBookings] = await Promise.all([
      prisma.vehicle.count(),
      prisma.service.count(),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'pending' } }),
    ]);
  } catch (error) {
    console.error('Dashboard: Failed to fetch counts:', error);
    dbConnected = false;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {!dbConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            <strong>⚠️ Database not connected.</strong> Please configure your <code>DATABASE_URL</code> environment variable and run migrations.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Link href="/admin/content/vehicles" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-luxury-red hover:shadow-lg transition">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Vehicles</h3>
          <p className="text-3xl font-bold text-gray-800">{vehiclesCount}</p>
        </Link>
        <Link href="/admin/content/services" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-luxury-red hover:shadow-lg transition">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Services</h3>
          <p className="text-3xl font-bold text-gray-800">{servicesCount}</p>
        </Link>
        <Link href="/admin/bookings" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-luxury-red hover:shadow-lg transition">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-gray-800">{bookingsCount}</p>
        </Link>
        <Link href="/admin/bookings?status=pending" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-luxury-red hover:shadow-lg transition">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Pending Bookings</h3>
          <p className="text-3xl font-bold text-luxury-red">{pendingBookings}</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/content/vehicles/new" className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition text-gray-700">
              ➕ Add New Vehicle
            </Link>
            <Link href="/admin/content/services/new" className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition text-gray-700">
              ➕ Add New Service
            </Link>
            <Link href="/admin/content/hero" className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition text-gray-700">
              🖼️ Edit Hero Section
            </Link>
            <Link href="/admin/content/homepage" className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition text-gray-700">
              📄 Manage Homepage Sections
            </Link>
            <Link href="/admin/bookings" className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition text-gray-700">
              📋 View All Bookings
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-700">Database</span>
              <span className={`px-2 py-1 rounded text-xs ${dbConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {dbConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-700">Authentication</span>
              <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Active</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-700">Image Storage</span>
              <span className={`px-2 py-1 rounded text-xs ${
                process.env.CLOUDINARY_CLOUD_NAME && 
                process.env.CLOUDINARY_API_KEY && 
                process.env.CLOUDINARY_API_SECRET
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {process.env.CLOUDINARY_CLOUD_NAME && 
                 process.env.CLOUDINARY_API_KEY && 
                 process.env.CLOUDINARY_API_SECRET
                  ? 'Configured (Cloudinary)' 
                  : 'Not Configured'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
