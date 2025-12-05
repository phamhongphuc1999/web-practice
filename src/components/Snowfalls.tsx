import { useEffect, useRef } from 'react';

interface Props {
  wind: number;
  flakeCount: number;
}

class Snowflake {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  speed: number = 0;
  vx: number = 0;

  constructor(width: number, height: number) {
    this.reset(width, height);
  }

  reset(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 3 + 1;
    this.speed = Math.random() * 1 + 0.5;
    this.vx = Math.random() * 0.5 - 0.25; // slight random horizontal sway
  }

  update(width: number, height: number, wind: number) {
    this.x += this.vx + wind * 0.5;
    this.y += this.speed;

    // Reset if it goes off the bottom
    if (this.y > height) {
      this.y = -5;
      this.x = Math.random() * width;
    }

    // Wrap around horizontally
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.8})`; // Slight transparency for softer look
    ctx.fill();
  }
}

export default function Snowfalls({ wind, flakeCount }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const flakesRef = useRef<Snowflake[]>([]);

  const windRef = useRef(wind);
  const countRef = useRef(flakeCount);

  useEffect(() => {
    windRef.current = wind;
  }, [wind]);

  useEffect(() => {
    countRef.current = flakeCount;
  }, [flakeCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (flakesRef.current.length === 0) initFlakes();
    };

    const initFlakes = () => {
      const flakes: Snowflake[] = [];
      for (let i = 0; i < countRef.current; i++) {
        flakes.push(new Snowflake(canvas.width, canvas.height));
      }
      flakesRef.current = flakes;
    };

    handleResize();
    initFlakes();

    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (flakesRef.current.length !== countRef.current) {
        if (flakesRef.current.length < countRef.current) {
          const diff = countRef.current - flakesRef.current.length;
          for (let i = 0; i < diff; i++) {
            flakesRef.current.push(new Snowflake(canvas.width, canvas.height));
          }
        } else flakesRef.current = flakesRef.current.slice(0, countRef.current);
      }

      flakesRef.current.forEach((flake) => {
        flake.update(canvas.width, canvas.height, windRef.current);
        flake.draw(ctx);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed top-0 left-0 h-full w-full" />
  );
}
