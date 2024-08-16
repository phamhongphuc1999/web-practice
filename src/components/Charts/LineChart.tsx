/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoxProps } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import cloneDeep from 'lodash.clonedeep';
import { useMemo } from 'react';
import BaseChart from './base-chart';

interface Props extends BoxProps {
  series: any;
  option?: any;
}

export default function LineChart({ series, option, ...props }: Props) {
  const realSeries = cloneDeep(series);

  const options = useMemo(() => {
    return Highcharts.merge(
      {
        chart: { type: 'line' },
        title: { text: undefined },
        yAxis: { labels: { enabled: false }, title: { text: undefined }, gridLineWidth: 0 },
        xAxis: { crosshair: { color: '#7E94BD', width: 1 } },
        plotOptions: {
          line: {
            marker: { enabled: false, symbol: 'circle' },
            lineWidth: 2,
            states: { hover: { lineWidth: 2 } },
            threshold: null,
          },
        },
        series: realSeries,
        tooltip: { enabled: true, shared: true, style: { display: 'none' } },
        legend: { enabled: false },
      },
      option
    );
  }, [realSeries, option]);

  return (
    <BaseChart {...props}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </BaseChart>
  );
}
