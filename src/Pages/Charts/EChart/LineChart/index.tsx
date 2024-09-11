import { DashboardKeys } from 'src/configs/echart-config';
import CoreChart from './CoreChart';
import useChartData from './use-chart-data';

export default function LineChart() {
  const { series, yAxises, legend, metadata, offset, fn } = useChartData(DashboardKeys, {
    stakers: 1,
  });
  const { show, showCounter } = metadata;
  const { setShow } = fn;

  return (
    <div>
      <div className="cursor-pointer py-[0.5rem] px-[1rem] rounded-[8px] border-[1px] border-blue-50 inline-block">
        <p>{`displayed item${showCounter > 1 ? 's' : ''}: ${showCounter}`}</p>
      </div>
      <button
        className="rounded-[8px] py-[0.5rem] px-[1rem] border-[1px] border-blue-50 ml-[8px]"
        onClick={() => setShow({ stakers: 1 })}
      >
        Unselect all
      </button>
      <CoreChart
        yAxises={yAxises}
        series={series}
        offset={offset}
        show={show}
        legend={legend}
        selectedSeries={DashboardKeys}
        setShow={setShow}
      />
    </div>
  );
}
