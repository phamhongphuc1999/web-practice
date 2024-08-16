/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoxProps } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import cloneDeep from 'lodash.clonedeep';
import { useMemo } from 'react';
import BaseChart from './base-chart';

export type BarDirection = 'horizontal' | 'vertical';

interface Props extends BoxProps {
  series: any;
  option?: any;
  categories: Array<string>;
  type?: BarDirection;
}

const _plotOption = {
  borderWidth: 0,
  borderRadius: 2,
  pointWidth: 8,
};

export default function BarChart(params: Props) {
  const { series, option, categories, type = 'vertical', ...props } = params;
  const realSeries = cloneDeep(series);

  const options = useMemo(() => {
    let _type = 'column';
    let _plotOptions: { column: any } | { bar: any } = { column: _plotOption };
    if (type === 'horizontal') {
      _type = 'bar';
      _plotOptions = { bar: _plotOption };
    }
    return Highcharts.merge(
      {
        chart: { type: _type },
        title: { text: undefined },
        xAxis: { categories: categories },
        yAxis: { title: { text: undefined }, gridLineWidth: 0 },
        legend: { enabled: false },
        plotOptions: { ..._plotOptions, ...{ series: { pointWidth: 20 } } },
        series: realSeries,
      },
      option
    );
  }, [categories, realSeries, option, type]);

  return (
    <BaseChart {...props}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </BaseChart>
  );
}
