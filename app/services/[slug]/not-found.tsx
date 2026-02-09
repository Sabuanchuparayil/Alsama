import Link from 'next/link';

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Not Found</h1>
        <p className="text-gray-600 mb-8">
          The service you're looking for doesn't exist or has been removed.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/services"
            className="block w-full red-gradient text-white py-3 px-6 rounded-md font-semibold hover:shadow-lg transition"
          >
            View All Services
          </Link>
          <Link
            href="/"
            className="block w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-md font-semibold hover:bg-gray-50 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
