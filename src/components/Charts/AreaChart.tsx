/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoxProps } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import cloneDeep from 'lodash.clonedeep';
import { useMemo } from 'react';
import { COLOR_ARRAY } from 'src/configs/constance';
import { ThemeMode } from 'src/global';
import { useAppSelector } from 'src/redux/hook';
import { hexToRgb } from 'src/services';
import BaseChart from './base-chart';

interface Props {
  series: any;
  option?: any;
  metadata?: {
    makeSeries?: boolean;
  };
  props?: BoxProps;
}

function makeSeries(themeMode: ThemeMode, series: any) {
  const finalSeries = [];
  let index = 0;
  for (const item of series) {
    const _color = COLOR_ARRAY[index];
    const rgb = hexToRgb(_color);
    const beginOpacity = themeMode === 'dark' ? 1 : 0.7;
    let shadowColor = _color;
    let beginColor = _color;
    if (rgb) {
      shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
      beginColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${beginOpacity})`;
    }
    finalSeries.push({
      ...item,
      ...{
        lineColor: beginColor,
        marker: { lineWidth: 1, lineColor: beginColor, fillColor: beginColor },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, shadowColor],
            [1, shadowColor],
          ],
        },
      },
    });
    index++;
  }
  return finalSeries;
}

export default function AreaChart({ series, option, metadata, props }: Props) {
  const realSeries = cloneDeep(series);
  const isMakeSeries = metadata?.makeSeries == undefined ? true : metadata.makeSeries;
  const themeMode = useAppSelector((state) => state.userConfig.theme.mode);

  const options = useMemo(() => {
    return Highcharts.merge(
      {
        chart: { type: 'area' },
        title: { text: undefined },
        yAxis: { labels: { enabled: false }, title: { text: undefined }, gridLineWidth: 0 },
        xAxis: { crosshair: { color: '#7E94BD', width: 1 } },
        plotOptions: {
          area: {
            marker: { enabled: false },
            lineWidth: 2,
            states: { hover: { lineWidth: 2 } },
            threshold: null,
          },
        },
        series: isMakeSeries ? makeSeries(themeMode, realSeries) : realSeries,
        tooltip: { enabled: true, shared: true, style: { display: 'none' } },
        legend: { enabled: false },
      },
      option
    );
  }, [realSeries, option]);

  return (
    <BaseChart props={props}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </BaseChart>
  );
}
