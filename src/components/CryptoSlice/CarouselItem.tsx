import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CARD_GAP, CARD_WIDTH, MOCK_DATA, SCROLL_SPEED } from 'src/configs/constance';
import Card from './Card';

const CarouselItem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const requestRef = useRef<number>(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Triple the data to create infinite illusion
  const displayData = [...MOCK_DATA, ...MOCK_DATA, ...MOCK_DATA];
  const singleSetWidth = MOCK_DATA.length * (CARD_WIDTH + CARD_GAP);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const animate = useCallback(() => {
    setOffset((prev) => {
      const next = prev + SCROLL_SPEED;
      if (next >= singleSetWidth) {
        return next - singleSetWidth;
      }
      return next;
    });
    requestRef.current = requestAnimationFrame(animate);
  }, [singleSetWidth]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  const gateX = containerWidth / 2;

  return (
    <div className="relative flex h-[600px] w-full flex-col justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      {/* Central Gate Laser Scanner */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center justify-center">
        {/* The Core Laser Line */}
        <div className="relative h-full w-0.5 overflow-visible bg-green-500 shadow-[0_0_30px_4px_rgba(34,197,94,0.8)]">
          {/* Side flares */}
          <div className="absolute top-1/2 left-0 h-[400px] w-4 -translate-x-0.5 -translate-y-1/2 bg-green-500/10 blur-sm"></div>
          <div className="absolute top-1/2 right-0 h-[400px] w-4 translate-x-0.5 -translate-y-1/2 bg-green-500/10 blur-sm"></div>
        </div>

        {/* Scanner UI Elements */}
        <div className="absolute top-[10%] h-px w-[400px] bg-linear-to-r from-transparent via-green-500/50 to-transparent"></div>
        <div className="absolute bottom-[10%] h-px w-[400px] bg-linear-to-r from-transparent via-green-500/50 to-transparent"></div>

        {/* Animated Scan Box */}
        <div className="absolute h-[400px] w-[300px] rounded-lg border-x border-green-500/10"></div>
      </div>

      {/* Gate Label */}
      <div className="absolute top-20 left-1/2 z-40 -translate-x-1/2 rounded-full border border-green-500/30 bg-black/80 px-3 py-1 shadow-[0_0_15px_rgba(34,197,94,0.3)] backdrop-blur">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-green-400">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          ENCRYPTION GATE
        </div>
      </div>

      {/* Carousel Track */}
      <div
        ref={containerRef}
        className="relative flex w-full items-center"
        style={{ height: CARD_WIDTH * 1.5 }}
      >
        <div
          className="absolute left-0 flex gap-8 will-change-transform"
          style={{
            transform: `translateX(calc(-${offset}px))`,
          }}
        >
          {displayData.map((item, index) => {
            // Calculate visual positions
            const cardVisualLeft = index * (CARD_WIDTH + CARD_GAP) - offset;
            const cardCenter = cardVisualLeft + CARD_WIDTH / 2;

            // Distance from gate (center of screen)
            // Positive = To the Right (Not yet passed)
            // Negative = To the Left (Passed)
            const distanceFromGate = cardCenter - gateX;

            return (
              <div key={`${item.id}-${index}`} style={{ width: CARD_WIDTH }} className="shrink-0">
                <Card data={item} distanceFromGate={distanceFromGate} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Vignette Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-48 bg-linear-to-r from-[#050505] to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-48 bg-linear-to-l from-[#050505] to-transparent"></div>
    </div>
  );
};

export default CarouselItem;
