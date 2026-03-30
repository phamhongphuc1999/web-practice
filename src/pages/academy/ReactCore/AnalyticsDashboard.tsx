import { useEffect, useState } from 'react';

function AnalyticsDashboard() {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const start = performance.now();

    const result: number[] = [];
    for (let i = 0; i < 50000; i++) {
      result.push(Math.random());
    }

    const end = performance.now();
    console.warn('Analytics calculated in', end - start, 'ms');

    setData(result);
  }, []);

  return (
    <div style={{ marginTop: '20px', border: '1px solid red', padding: '10px' }}>
      <h2>Analytics Dashboard (Heavy Component)</h2>
      <p>Data points: {data.length}</p>
    </div>
  );
}

export default AnalyticsDashboard;
