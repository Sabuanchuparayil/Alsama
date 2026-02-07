'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'An error occurred');
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/login');
        }, 2000);
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-luxury-dark rounded-lg shadow-2xl p-8 border border-gray-800 text-center">
            <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-md mb-6">
              Invalid reset link. Please request a new password reset.
            </div>
            <Link href="/admin/forgot-password" className="text-luxury-red hover:underline">
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-luxury-dark rounded-lg shadow-2xl p-8 border border-gray-800 text-center">
            <div className="bg-green-900/30 border border-green-800 text-green-300 px-4 py-3 rounded-md mb-6">
              Password reset successfully! Redirecting to login...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AL SAMA</h1>
          <p className="text-gray-400 text-sm">Set New Password</p>
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

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 font-semibold mb-2 text-sm">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-luxury-red focus:border-transparent"
              placeholder="••••••••"
            />
            <p className="text-gray-500 text-xs mt-2">Must be at least 8 characters</p>
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-300 font-semibold mb-2 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-luxury-red focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full red-gradient text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/admin/login" className="text-gray-500 hover:text-gray-300 text-sm transition">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
