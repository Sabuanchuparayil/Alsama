import { Metadata } from 'next';
import BookingForm from '@/components/BookingForm';

export const metadata: Metadata = {
  title: 'Book Now - AL SAMA',
  description: 'Book your luxury chauffeur service or vehicle rental with AL SAMA. Easy online booking for airport transfers, city tours, and more.',
};

export default function BookPage() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Book Your Ride
            </h1>
            <p className="text-gray-600 text-lg">
              Fill out the form below and we'll get back to you shortly to confirm your booking.
            </p>
          </div>

          <BookingForm />

          <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Information</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Confirmation Process</h3>
                <p>After submitting your booking request, our team will contact you within 24 hours to confirm availability and finalize details.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Payment</h3>
                <p>Payment can be made via credit card, bank transfer, or cash upon service completion.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cancellation Policy</h3>
                <p>Free cancellation up to 24 hours before your scheduled service. Cancellations within 24 hours may be subject to a fee.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
