'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'An error occurred');
      } else {
        setMessage(data.message);
        // In development, show the reset link
        if (data.resetUrl) {
          setMessage(`${data.message}\n\nReset Link: ${data.resetUrl}`);
        }
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AL SAMA</h1>
          <p className="text-gray-400 text-sm">Reset Your Password</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-luxury-dark rounded-lg shadow-2xl p-8 border border-gray-800"
        >
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-md mb-6 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-900/30 border border-green-800 text-green-300 px-4 py-3 rounded-md mb-6 text-sm whitespace-pre-line">
              {message}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-300 font-semibold mb-2 text-sm">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-luxury-red focus:border-transparent"
              placeholder="admin@alsama.ae"
            />
            <p className="text-gray-500 text-xs mt-2">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full red-gradient text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <Link href="/admin/login" className="text-gray-500 hover:text-gray-300 text-sm transition block">
            ← Back to Login
          </Link>
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition block">
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
