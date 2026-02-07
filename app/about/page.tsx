import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - AL SAMA',
  description: 'Learn about AL SAMA, a leading car rental service provider offering luxury vehicles and premium chauffeur services.',
};

export default function AboutPage() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
            About Us
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-6">
              We are a leading car rental service provider offering a wide range of vehicles to suit every need and budget. Whether you need a car for a business trip, a family vacation, or just to get around town, we have the perfect vehicle for you.
            </p>
            
            <p className="text-gray-700 text-lg mb-6">
              Our fleet allows you to choose from a variety of makes and models, ensuring you find the car that best fits your style and requirements. We pride ourselves on our excellent customer service and competitive pricing.
            </p>

            <div className="bg-gray-50 p-8 rounded-lg my-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Fleet</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-luxury-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Luxury Sedans
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-luxury-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  SUVs
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-luxury-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Luxury Vans
                </li>
              </ul>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🚗</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Fleet</h3>
                  <p className="text-gray-600">Wide selection of luxury vehicles</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Service</h3>
                  <p className="text-gray-600">Professional chauffeurs and support</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">💎</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Luxury Experience</h3>
                  <p className="text-gray-600">Unmatched comfort and elegance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
