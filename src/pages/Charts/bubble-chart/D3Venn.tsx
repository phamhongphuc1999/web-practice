/* eslint-disable @typescript-eslint/no-explicit-any */

import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import * as venn from 'venn.js';

const sets = [
  {
    sets: ['34245'],
    size: 13,
  },
  {
    sets: ['44694'],
    size: 6,
  },
  {
    sets: ['45702'],
    size: 7,
  },
  {
    sets: ['55438'],
    size: 7,
  },
  {
    sets: ['62333'],
    size: 7,
  },
  {
    sets: ['62788'],
    size: 6,
  },
  {
    sets: ['62857'],
    size: 7,
  },
  {
    sets: ['68514'],
    size: 7,
  },
  {
    sets: ['72989'],
    size: 6,
  },
  {
    sets: ['79793'],
    size: 7,
  },
  {
    sets: ['34245', '44694'],
    size: 6,
  },
  {
    sets: ['34245', '45702'],
    size: 7,
  },
  {
    sets: ['34245', '55438'],
    size: 7,
  },
  {
    sets: ['34245', '62333'],
    size: 7,
  },
  {
    sets: ['34245', '62788'],
    size: 6,
  },
  {
    sets: ['34245', '62857'],
    size: 7,
  },
  {
    sets: ['34245', '68514'],
    size: 7,
  },
  {
    sets: ['34245', '72989'],
    size: 6,
  },
  {
    sets: ['34245', '79793'],
    size: 7,
  },
  {
    sets: ['44694', '45702'],
    size: 5,
  },
  {
    sets: ['44694', '55438'],
    size: 6,
  },
  {
    sets: ['44694', '62333'],
    size: 5,
  },
  {
    sets: ['44694', '62788'],
    size: 4,
  },
  {
    sets: ['44694', '62857'],
    size: 5,
  },
  {
    sets: ['44694', '68514'],
    size: 5,
  },
  {
    sets: ['44694', '72989'],
    size: 5,
  },
  {
    sets: ['44694', '79793'],
    size: 5,
  },
  {
    sets: ['45702', '55438'],
    size: 6,
  },
  {
    sets: ['45702', '62333'],
    size: 6,
  },
  {
    sets: ['45702', '62788'],
    size: 6,
  },
  {
    sets: ['45702', '62857'],
    size: 7,
  },
  {
    sets: ['45702', '68514'],
    size: 7,
  },
  {
    sets: ['45702', '72989'],
    size: 6,
  },
  {
    sets: ['45702', '79793'],
    size: 7,
  },
  {
    sets: ['55438', '62333'],
    size: 5,
  },
  {
    sets: ['55438', '62788'],
    size: 5,
  },
  {
    sets: ['55438', '62857'],
    size: 6,
  },
  {
    sets: ['55438', '68514'],
    size: 6,
  },
  {
    sets: ['55438', '72989'],
    size: 5,
  },
  {
    sets: ['55438', '79793'],
    size: 6,
  },
  {
    sets: ['62333', '62788'],
    size: 5,
  },
  {
    sets: ['62333', '62857'],
    size: 6,
  },
  {
    sets: ['62333', '68514'],
    size: 6,
  },
  {
    sets: ['62333', '72989'],
    size: 6,
  },
  {
    sets: ['62333', '79793'],
    size: 6,
  },
  {
    sets: ['62788', '62857'],
    size: 6,
  },
  {
    sets: ['62788', '68514'],
    size: 6,
  },
  {
    sets: ['62788', '72989'],
    size: 5,
  },
  {
    sets: ['62788', '79793'],
    size: 6,
  },
  {
    sets: ['62857', '68514'],
    size: 7,
  },
  {
    sets: ['62857', '72989'],
    size: 6,
  },
  {
    sets: ['62857', '79793'],
    size: 7,
  },
  {
    sets: ['68514', '72989'],
    size: 6,
  },
  {
    sets: ['68514', '79793'],
    size: 7,
  },
  {
    sets: ['72989', '79793'],
    size: 6,
  },
  {
    sets: ['34245', '44694', '45702'],
    size: 5,
  },
  {
    sets: ['34245', '44694', '55438'],
    size: 6,
  },
  {
    sets: ['34245', '44694', '62333'],
    size: 5,
  },
  {
    sets: ['34245', '44694', '62788'],
    size: 4,
  },
  {
    sets: ['34245', '44694', '62857'],
    size: 5,
  },
  {
    sets: ['34245', '44694', '68514'],
    size: 5,
  },
  {
    sets: ['34245', '44694', '72989'],
    size: 5,
  },
  {
    sets: ['34245', '44694', '79793'],
    size: 5,
  },
  {
    sets: ['34245', '45702', '55438'],
    size: 6,
  },
];

export default function D3Venn() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current!;
    container.innerHTML = '';

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
      .style('stroke-width', 0.5);

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
