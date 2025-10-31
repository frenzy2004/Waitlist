'use client';

import { useState, useEffect } from 'react';

interface WaitlistEntry {
  id: number;
  email: string;
  name: string | null;
  created_at: string;
}

export default function AdminSignups() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSignups();
  }, []);

  const fetchSignups = async () => {
    try {
      const response = await fetch('/api/admin/signups');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setEntries(data.entries);
    } catch (err) {
      setError('Failed to load signups');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Waitlist Signups</h1>
          <p className="text-gray-400">Total: {entries.length} signups</p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Signup Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-400">{entry.id}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">{entry.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {entry.name || <span className="text-gray-500 italic">N/A</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(entry.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {entries.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No signups yet
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
