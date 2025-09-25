/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import * as venn from 'venn.js';

export default function VennChart() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current!;
    container.innerHTML = '';

    const sets = [
      { sets: ['A'], size: 3000 },
      { sets: ['B'], size: 2500 },
      { sets: ['C'], size: 2000 },
      { sets: ['D'], size: 1800 },

      { sets: ['A', 'B'], size: 600 },
      { sets: ['A', 'C'], size: 1000 },
      { sets: ['B', 'C'], size: 400 },
      { sets: ['A', 'D'], size: 500 },
      { sets: ['B', 'D'], size: 300 },
      { sets: ['C', 'D'], size: 200 },

      { sets: ['A', 'B', 'C'], size: 150 },
      { sets: ['A', 'B', 'D'], size: 100 },
      { sets: ['B', 'C', 'D'], size: 80 },
      { sets: ['A', 'C', 'D'], size: 60 },
      { sets: ['A', 'B', 'C', 'D'], size: 30 },
    ];

    const chart = venn.VennDiagram().width(600).height(500);

    d3.select(container)
      .datum(sets)
      .call(chart as any);

    d3.select(container)
      .selectAll('text')
      .style('fill', '#fff')
      .style('font-weight', '600')
      .style('font-size', '14px');

    d3.select(container)
      .selectAll('path')
      .style('fill-opacity', 0.3)
      .style('stroke', '#fff')
      .style('stroke-width', 2);

    d3.select(container)
      .selectAll('g')
      .on('click', function (_, d: any) {
        alert(`Bạn vừa click: ${d.sets.join(' ∩ ')} (size = ${d.size})`);
      })
      .on('mouseover', function () {
        d3.select(this).select('path').style('stroke', 'yellow');
      })
      .on('mouseout', function () {
        d3.select(this).select('path').style('stroke', '#fff');
      });

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div style={{ padding: 20, background: '#0f0f12', minHeight: '100vh' }}>
      <div ref={ref}></div>
    </div>
  );
}
