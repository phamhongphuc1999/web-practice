/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

interface NodeType extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  value: number;
}

interface LinkType extends d3.SimulationLinkDatum<NodeType> {
  source: string | NodeType;
  target: string | NodeType;
  value: number;
}

interface Props {
  width?: number;
  height?: number;
}

const data: { nodes: NodeType[]; links: LinkType[] } = {
  nodes: [
    { id: 'Alice', group: 1, value: 11 },
    { id: 'Bob', group: 1, value: 21 },
    { id: 'Charlie', group: 2, value: 1 },
    { id: 'Diana', group: 2, value: 1 },
    { id: 'Eve', group: 3, value: 10 },
    { id: 'Frank', group: 3, value: 5 },
  ],
  links: [
    { source: 'Alice', target: 'Bob', value: 2 },
    { source: 'Alice', target: 'Charlie', value: 1 },
    { source: 'Bob', target: 'Diana', value: 3 },
    { source: 'Charlie', target: 'Diana', value: 2 },
    { source: 'Diana', target: 'Eve', value: 1 },
    { source: 'Eve', target: 'Frank', value: 2 },
    { source: 'Charlie', target: 'Frank', value: 1 },
  ],
};

export default function D3BubbleChart({ width = 928, height = 600 }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const nodes: NodeType[] = data.nodes.map((d) => ({ ...d }));
    const links: LinkType[] = data.links.map((d) => ({ ...d }));

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Arrow marker
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 30) // depends on node radius
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#999');

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value))
      .attr('marker-end', 'url(#arrowhead)');

    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', 'white') // white background
      .style('color', 'black') // black text
      .style('padding', '6px 12px')
      .style('border', '1px solid #ccc')
      .style('border-radius', '8px')
      .style('pointer-events', 'none')
      .style('font-size', '14px')
      .style('box-shadow', '0px 2px 6px rgba(0,0,0,0.2)')
      .style('opacity', 0);

    const popup = d3
      .select('body')
      .append('div')
      .attr('id', 'node-popup')
      .style('position', 'fixed')
      .style('top', '20%')
      .style('left', '50%')
      .style('transform', 'translateX(-50%)')
      .style('background', 'white')
      .style('color', 'black')
      .style('padding', '16px 20px')
      .style('border', '1px solid #ccc')
      .style('border-radius', '10px')
      .style('box-shadow', '0px 4px 12px rgba(0,0,0,0.3)')
      .style('opacity', 0)
      .style('pointer-events', 'auto');

    // Add a close button
    popup
      .append('button')
      .text('x')
      .style('position', 'absolute')
      .style('top', '8px')
      .style('right', '12px')
      .style('border', 'none')
      .style('background', 'transparent')
      .style('font-size', '18px')
      .style('cursor', 'pointer')
      .on('click', () => popup.style('opacity', 0));

    const sizeScale = d3
      .scaleLinear()
      .domain([0, d3.max(nodes, (d) => d.value) as number])
      .range([4, 20]);

    // create nodes
    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', (d) => color(d.group.toString()) as string)
      .attr('r', (d) => sizeScale(d.value))
      .call(
        d3
          .drag<SVGCircleElement, NodeType>()
          .on('start', dragstarted as any)
          .on('drag', dragged as any)
          .on('end', dragended as any) as any
      )
      .on('mouseover', (_, d) => {
        tooltip.style('opacity', 1).html(`
          <p style={color:black;}>
            <b>${d.id}</b><br/>Value: ${d.value}
          </p>`);
      })
      .on('mousemove', (event) => {
        tooltip.style('left', event.pageX + 15 + 'px').style('top', event.pageY + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      })
      .on('click', (_, d) => {
        alert(`You clicked ${d.id}`);
      })
      .on('click', (event, d) => {
        popup
          .style('opacity', 1)
          .style('left', `${event.pageX + 10}px`) // place near mouse click
          .style('top', `${event.pageY - 20}px`) // offset a little above
          .html(`
      <button style="position:absolute;top:6px;right:10px;border:none;background:transparent;font-size:16px;cursor:pointer" id="close-popup">x</button>
      <h3 style="margin:0">${d.id}</h3>
      <p style="margin:4px 0">Value: ${d.value || 'N/A'}</p>
    `);

        // re-bind close button
        d3.select('#close-popup').on('click', () => popup.style('opacity', 0));
      });

    node.append('title').text((d) => d.id);

    const simulation = d3
      .forceSimulation<NodeType>(nodes)
      .force(
        'link',
        d3
          .forceLink<NodeType, LinkType>(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', ticked);

    function ticked() {
      link
        .attr('x1', (d) => (d.source as NodeType).x!)
        .attr('y1', (d) => (d.source as NodeType).y!)
        .attr('x2', (d) => (d.target as NodeType).x!)
        .attr('y2', (d) => (d.target as NodeType).y!);

      node.attr('cx', (d) => d.x!).attr('cy', (d) => d.y!);
    }

    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, NodeType, NodeType>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, NodeType, NodeType>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, NodeType, NodeType>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [width, height]);

  return (
    <svg ref={svgRef} width={width} height={height} style={{ maxWidth: '100%', height: 'auto' }} />
  );
}
