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

export default function DonutChart({ series, option, ...props }: Props) {
  const realSeries = cloneDeep(series);

  const options = useMemo(() => {
    return Highcharts.merge(
      {
        chart: { type: 'pie' },
        title: { text: undefined },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderRadius: 0,
            borderWidth: 0,
            dataLabels: { enabled: false },
            showInLegend: true,
            innerSize: '85%',
          },
        },
        series: realSeries,
        legend: { enabled: false },
      },
      option
    );
  }, [option, realSeries]);

  return (
    <BaseChart {...props}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </BaseChart>
  );
}
