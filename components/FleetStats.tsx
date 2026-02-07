'use client';

import { useEffect, useState } from 'react';

interface FleetStats {
  total: number;
  suv: number;
  sedan: number;
  sports: number;
}

export default function FleetStats() {
  const [stats, setStats] = useState<FleetStats>({ total: 0, suv: 0, sedan: 0, sports: 0 });

  useEffect(() => {
    fetch('/api/cms/vehicles')
      .then((res) => res.json())
      .then((data: Array<{ category: string; isActive?: boolean }>) => {
        if (!Array.isArray(data)) return;
        const active = data.filter((v) => v.isActive !== false);
        setStats({
          total: active.length,
          suv: active.filter((v) => v.category === 'SUV').length,
          sedan: active.filter((v) => v.category === 'Sedan').length,
          sports: active.filter((v) => v.category === 'Sports').length,
        });
      })
      .catch(() => {
        // Use defaults on error
        setStats({ total: 9, suv: 3, sedan: 3, sports: 3 });
      });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-3xl font-bold text-luxury-red">{stats.total}</p>
        <p className="text-gray-600 text-sm mt-1">Total Vehicles</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-3xl font-bold text-luxury-red">{stats.suv}</p>
        <p className="text-gray-600 text-sm mt-1">SUVs</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-3xl font-bold text-luxury-red">{stats.sedan}</p>
        <p className="text-gray-600 text-sm mt-1">Sedans</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-3xl font-bold text-luxury-red">{stats.sports}</p>
        <p className="text-gray-600 text-sm mt-1">Sports</p>
      </div>
    </div>
  );
}
