'use client';

import { useState } from 'react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    pickup: '',
    destination: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          serviceType: formData.service,
          date: formData.date,
          time: formData.time,
          pickupLocation: formData.pickup,
          destination: formData.destination || null,
          message: formData.message || null,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          pickup: '',
          destination: '',
          message: '',
        });
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to submit booking. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Submitted!</h2>
        <p className="text-gray-600 mb-6">Thank you for your booking request. We will contact you shortly to confirm.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="red-gradient text-white px-6 py-2 rounded-md hover:shadow-md transition"
        >
          Make Another Booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Ride</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-6 text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-gray-700 font-semibold mb-2">
            Service Type *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
          >
            <option value="">Select a service</option>
            <option value="airport-transfer">Airport Transfer</option>
            <option value="city-tour">City Tour</option>
            <option value="corporate-hire">Corporate Hire</option>
            <option value="wedding-service">Wedding Service</option>
            <option value="hourly-chauffeur">Hourly Chauffeur</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-gray-700 font-semibold mb-2">
            Time *
          </label>
          <input
            type="time"
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
          />
        </div>

        <div>
          <label htmlFor="pickup" className="block text-gray-700 font-semibold mb-2">
            Pickup Location *
          </label>
          <input
            type="text"
            id="pickup"
            name="pickup"
            required
            value={formData.pickup}
            onChange={handleChange}
            placeholder="Enter pickup address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
          />
        </div>

        <div>
          <label htmlFor="destination" className="block text-gray-700 font-semibold mb-2">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter destination address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-red"
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
          Additional Notes
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Any special requirements or notes..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 w-full red-gradient text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all text-lg disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Booking Request'}
      </button>
    </form>
  );
}
