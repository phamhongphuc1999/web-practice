import { Spotlight } from 'src/components/aceternity/Spotlight';
import { cn } from 'src/lib/utils';

export default function SpotlightView() {
  return (
    <div className="relative flex aspect-square w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          'pointer-events-none absolute inset-0 [background-size:40px_40px] select-none',
          '[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]'
        )}
      />
      <Spotlight className="-top-20 left-0 md:-top-20 md:left-60" fill="white" />
    </div>
  );
}
