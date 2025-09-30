/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

export type NodeDatum = { id: string; value: number };
export type LinkDatum = { source: string; target: string };

const _nodes = [
  { id: 'A', value: 40 },
  { id: 'B', value: 20 },
  { id: 'C', value: 25 },
  { id: 'D', value: 52 },
  { id: 'E', value: 60 },
  { id: 'F', value: 20 },
];

const _links = [
  { source: 'A', target: 'B', value: 1 },
  { source: 'A', target: 'C' },
  { source: 'B', target: 'D' },
  { source: 'C', target: 'D' },
  { source: 'A', target: 'E' },
  { source: 'E', target: 'F' },
];

type Props = {
  width?: number;
  height?: number;
  nodes?: NodeDatum[];
  links?: LinkDatum[];
  isPolygon?: boolean;
};

export default function D3BubbledChart({
  width = 800,
  height = 600,
  nodes = _nodes,
  links = _links,
  isPolygon = false,
}: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [node, setNode] = useState<NodeDatum | undefined>(undefined);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g');

    svg.on('click', () => {
      setNode(undefined);
    });

    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.2, 4])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        })
    );

    const rScale = d3
      .scaleSqrt()
      .domain(d3.extent(nodes, (d) => d.value) as [number, number])
      .range([15, 40]);

    const defs = svg.append('defs');

    defs
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 10)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#9ca3af');

    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('padding', '6px 10px')
      .style('background', 'rgba(0,0,0,0.8)')
      .style('color', '#fff')
      .style('border-radius', '6px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    const link = g
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5)
      .attr('stroke', '#9ca3af')
      .attr('marker-end', 'url(#arrowhead)');

    const node = g
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'grab');

    if (isPolygon) {
      node
        .append('polygon')
        .attr('points', (d) => {
          const r = rScale(d.value);
          return d3
            .range(6)
            .map((i) => {
              const angle = (Math.PI / 3) * i - Math.PI / 6; // flat-top hexagon
              const x = r * Math.cos(angle);
              const y = r * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(' ');
        })
        .attr('fill', '#2563eb')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5);
    } else {
      node
        .append('circle')
        .attr('r', (d) => rScale(d.value))
        .attr('fill', '#2563eb')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5);
    }

    node.append('title').text((d) => `${d.id} — value: ${d.value}`);

    node
      .append('text')
      .attr('dy', 4)
      .attr('fill', 'white')
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .text((d) => d.id);

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        'link',
        d3
          .forceLink(links as any)
          .id((d: any) => d.id)
          .distance(80)
          .strength(0.8)
      )
      .force('charge', d3.forceManyBody().strength(-250))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collision',
        d3.forceCollide().radius((d: any) => rScale(d.value) + 6)
      )
      .on('tick', ticked);

    function intersectPolygon(x1: number, y1: number, x2: number, y2: number, r: number) {
      const hex = d3.range(6).map((i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        return [r * Math.cos(angle) + x2, r * Math.sin(angle) + y2];
      });

      for (let i = 0; i < 6; i++) {
        const [xA, yA] = hex[i];
        const [xB, yB] = hex[(i + 1) % 6];
        const denom = (x1 - x2) * (yA - yB) - (y1 - y2) * (xA - xB);
        if (denom === 0) continue;

        const t = ((x1 - xA) * (yA - yB) - (y1 - yA) * (xA - xB)) / denom;
        const u = -((x1 - x2) * (y1 - yA) - (y1 - y2) * (x1 - xA)) / denom;

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
          return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
        }
      }
      return [x2, y2];
    }

    function ticked() {
      link
        .attr('x1', (d: any) => (d.source as any).x)
        .attr('y1', (d: any) => (d.source as any).y)
        .attr('x2', (d: any) => {
          const sx = (d.source as any).x;
          const sy = (d.source as any).y;
          const tx = (d.target as any).x;
          const ty = (d.target as any).y;
          const r = rScale((d.target as any).value);

          if (isPolygon) {
            return intersectPolygon(sx, sy, tx, ty, r)[0];
          } else {
            const dx = tx - sx;
            const dy = ty - sy;
            const len = Math.sqrt(dx * dx + dy * dy);
            return tx - (dx * r) / len;
          }
        })
        .attr('y2', (d: any) => {
          const sx = (d.source as any).x;
          const sy = (d.source as any).y;
          const tx = (d.target as any).x;
          const ty = (d.target as any).y;
          const r = rScale((d.target as any).value);

          if (isPolygon) {
            return intersectPolygon(sx, sy, tx, ty, r)[1];
          } else {
            const dx = tx - sx;
            const dy = ty - sy;
            const len = Math.sqrt(dx * dx + dy * dy);
            return ty - (dy * r) / len;
          }
        });

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    }

    const dragBehavior = d3
      .drag<SVGGElement, NodeDatum>()
      .on('start', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event: any, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(dragBehavior as any);

    node
      .on('mouseover', (_, d: any) => {
        tooltip
          .style('opacity', 1)
          .html(
            ` <div><strong>ID:</strong> ${d.id}</div> <div><strong>Value:</strong> ${d.value}</div> `
          );
      })
      .on('mousemove', (event) => {
        tooltip.style('left', event.pageX + 12 + 'px').style('top', event.pageY + 12 + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      })
      .on('click', (event, d) => {
        event.stopPropagation();
        console.error('ddd', d);
        setNode(d);
      });

    return () => {
      simulation.stop();
    };
  }, [svgRef, nodes, links, width, height, isPolygon]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: '100%', background: '#0f1724' }}
      />
      {node && (
        <div className="absolute top-2 right-2 bottom-2 w-1/4">
          <p>
            Click on {node?.id}: {node?.value}
          </p>
        </div>
      )}
    </div>
  );
}
