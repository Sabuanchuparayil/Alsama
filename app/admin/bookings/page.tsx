'use client';

import { useState, useEffect } from 'react';

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: string;
  date: string;
  time: string;
  pickupLocation: string;
  destination: string | null;
  status: string;
  createdAt: string;
  vehicle: {
    name: string;
  } | null;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const fetchBookings = async () => {
    try {
      const url = statusFilter
        ? `/api/booking/list?status=${statusFilter}`
        : '/api/booking/list';
      const res = await fetch(url);
      const data = await res.json();
      
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        console.error('Invalid bookings data:', data);
        setBookings([]);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/booking/${id}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Bookings</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-luxury-black text-white">
            <tr>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Service</th>
              <th className="px-6 py-3 text-left">Date/Time</th>
              <th className="px-6 py-3 text-left">Pickup</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b">
                <td className="px-6 py-4">
                  <div>{booking.customerName}</div>
                  <div className="text-sm text-gray-600">{booking.customerEmail}</div>
                </td>
                <td className="px-6 py-4">{booking.serviceType}</td>
                <td className="px-6 py-4">
                  <div>{new Date(booking.date).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-600">{booking.time}</div>
                </td>
                <td className="px-6 py-4">{booking.pickupLocation}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
