import SparklesView from './SparklesView';
import SpotlightView from './SpotlightView';

export default function AceternityUI() {
  return (
    <div className="border-black-350 mt-3 border-t pt-2">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-6">
          <SparklesView />
        </div>
        <div className="col-span-6">
          <SpotlightView />
        </div>
      </div>
    </div>
  );
}
