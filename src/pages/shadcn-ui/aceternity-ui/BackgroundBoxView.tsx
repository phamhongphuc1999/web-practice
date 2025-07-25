import { Boxes } from 'src/components/aceternity/BackgroundBoxes';

export function BackgroundBoxesDemo() {
  return (
    <div className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-900">
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />
      <Boxes />
    </div>
  );
}
