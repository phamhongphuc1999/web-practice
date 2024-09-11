/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactECharts from 'echarts-for-react';
import { Dispatch, SetStateAction } from 'react';
import { DashboardCoreDataType, DashboardLegendType, KeyEChartType } from 'src/global';
import { DashboardLineConfig } from './line-chart-config';
import {
  DashboardKeys,
  DataZoomConfig,
  TooltipConfig,
  XAxisConfig,
} from 'src/configs/echart-config';

interface Props {
  series: any[];
  yAxises: any[];
  offset: { left: number; right: number };
  show: Partial<DashboardCoreDataType>;
  legend: Partial<DashboardLegendType>;
  selectedSeries: Array<KeyEChartType>;
  setShow: Dispatch<SetStateAction<Partial<DashboardCoreDataType>>>;
}

export default function CoreChart(params: Props) {
  const { series, yAxises, offset, show, legend, selectedSeries, setShow } = params;
  const { left, right } = offset;

  function onShowClick(item: KeyEChartType) {
    setShow((preValue) => {
      const newValue = { ...preValue };
      const _value = newValue[item];
      if (_value) newValue[item] = 1 - _value;
      else newValue[item] = 1;
      return newValue;
    });
  }

  return (
    <div className="w-full mt-[1rem]">
      <div className="flex flex-wrap items-center gap-2">
        {selectedSeries.map((item) => {
          const config = DashboardLineConfig[item];

          return (
            <div
              key={item}
              className={`rounded-[8px] inline-block py-[0.5rem] px-[0.5rem] border-[1px] cursor-pointer ${
                show[item] ? 'bg-[#0066FF] border-[transparent] text-white' : 'border-[#0066FF]'
              }`}
              onClick={() => onShowClick(item)}
            >
              {config.title}
            </div>
          );
        })}
      </div>
      <ReactECharts
        option={{
          useUTC: true,
          grid: { left, right },
          tooltip: { ...TooltipConfig },
          legend: { selected: legend, data: DashboardKeys, show: false },
          xAxis: XAxisConfig,
          yAxis: yAxises,
          series,
          dataZoom: DataZoomConfig,
        }}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
}
