import { BackgroundBeamsDemo } from './background-beam-view';
import { BackgroundBoxesDemo } from './BackgroundBoxView';
import { ShootingStarsView } from './ShootingStarView';
import SparklesView from './SparklesView';
import SpotlightView from './SpotlightView';

export default function AceternityUI() {
  return (
    <div className="border-black-350 mt-3 border-t pt-2">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <SparklesView />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <SpotlightView />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <ShootingStarsView />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <BackgroundBoxesDemo />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <BackgroundBeamsDemo />
        </div>
      </div>
    </div>
  );
}
