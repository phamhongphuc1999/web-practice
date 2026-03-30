import React, { useEffect, useState } from 'react';
import { Car } from 'src/global';
import AnalyticsDashboard from './AnalyticsDashboard';
import CarList from './CarList';
import FilterComponent from './FilterComponent';

export default function ReactCore() {
  const [cars, _] = useState<Car[]>(generateCars(100));
  const [filter, setFilter] = useState<string>('');
  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  useEffect(() => {
    React.startTransition(() => {
      setTimeout(() => setShowDashboard(true), 1000);
    });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Car Rental Dashboard</h1>
      <FilterComponent onFilterChange={setFilter} />
      <CarList cars={cars} filter={filter} />
      {showDashboard && <AnalyticsDashboard />}
    </div>
  );
}

function generateCars(count: number): Car[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    make: `Brand ${i % 10}`,
    model: `Model ${i}`,
    price: Math.floor(Math.random() * 50000) + 20000,
  }));
}
