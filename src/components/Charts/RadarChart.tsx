/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoxProps } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import cloneDeep from 'lodash.clonedeep';
import { useMemo } from 'react';
import BaseChart from './base-chart';

HighchartsMore(Highcharts);

interface Props extends BoxProps {
  series: any;
  option?: any;
  categories: Array<string>;
}

export default function RadarChart({ series, option, categories, ...props }: Props) {
  const realSeries = cloneDeep(series);

  const options = useMemo(() => {
    return Highcharts.merge(
      {
        chart: { polar: true, type: 'area' },
        title: { text: undefined },
        pane: { startAngle: -22.5, endAngle: 337.5 },
        xAxis: { tickmarkPlacement: 'on', lineWidth: 0, categories: categories },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0,
          max: 1000,
          tickInterval: 500,
        },
        legend: { layout: 'vertical' },
        series: realSeries,
        tooltip: { enabled: true, shared: true },
      },
      option
    );
  }, [realSeries, option, categories]);

  return (
    <BaseChart {...props}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </BaseChart>
  );
}
