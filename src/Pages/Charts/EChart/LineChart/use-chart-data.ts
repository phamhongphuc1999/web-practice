/* eslint-disable @typescript-eslint/no-explicit-any */
import * as echarts from 'echarts/core';
import { useMemo, useState } from 'react';
import { COLOR_ARRAY } from 'src/configs/constance';
import { SeriesConfig, YAxisConfig } from 'src/configs/echart-config';
import { DashboardCoreDataType, KeyEChartType } from 'src/global';
import { DashboardLineConfig } from './line-chart-config';
import useOverviewData from './use-overview-data';
import useGridPosition from './useGridPosition';

export const getAreaColor = (color: string) => ({
  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color },
    { offset: 1, color: 'rgba(0, 0, 0, 0.2)' },
  ]),
});

export default function useChartData(
  selectedSeries: Array<KeyEChartType>,
  defaultShow: Partial<DashboardCoreDataType> = {}
) {
  const globalData = useOverviewData(1000);
  const [show, setShow] = useState<Partial<DashboardCoreDataType>>(defaultShow);
  const { left, right, offsets } = useGridPosition(show);

  const { showCounter } = useMemo(() => {
    return { showCounter: Object.values(show).filter((item) => item).length };
  }, [show]);

  const { yAxises, legend } = useMemo(() => {
    const yAxises: Array<any> = [];
    const legend: Partial<{ [key: string]: boolean }> = {};
    for (const key of selectedSeries) {
      const config = DashboardLineConfig[key];
      const isShow = show[key] == 1 ? true : false;
      const offset = offsets[key] ?? 0;

      yAxises.push({
        ...YAxisConfig,
        position: config.position,
        offset,
        axisLine: { lineStyle: { color: COLOR_ARRAY[config.colorIndex] } },
        show: isShow,
      });
      legend[config.title] = isShow;
    }
    return { yAxises, legend };
  }, [show, offsets, selectedSeries]);

  const series = useMemo(() => {
    let counter = 0;
    const series: Array<any> = [];
    for (const key of selectedSeries) {
      const config = DashboardLineConfig[key];
      const _color = COLOR_ARRAY[config.colorIndex];

      series.push({
        ...SeriesConfig,
        type: config.type,
        name: DashboardLineConfig[key].title,
        data: globalData[key],
        yAxisIndex: counter,
        areaStyle: getAreaColor(_color),
        lineStyle: { color: _color, width: 1 },
        itemStyle: { color: _color },
      });
      counter++;
    }
    return series;
  }, [globalData, selectedSeries]);

  return {
    series,
    yAxises,
    legend,
    metadata: { show, showCounter },
    offset: { left, right },
    fn: { setShow },
  };
}
