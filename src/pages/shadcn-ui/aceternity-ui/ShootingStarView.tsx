import { ShootingStars } from 'src/components/aceternity/ShootingStar';
import { StarsBackground } from 'src/components/aceternity/ShootingStar/StarBackground';

export function ShootingStarsView() {
  return (
    <div className="relative flex aspect-square w-full flex-col items-center justify-center rounded-md bg-neutral-900">
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
