import BackgroundBoxes from 'src/components/aceternity/BackgroundBoxes';

export default function BackgroundBoxesView() {
  return (
    <div className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-900">
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />
      <BackgroundBoxes />
    </div>
  );
}
