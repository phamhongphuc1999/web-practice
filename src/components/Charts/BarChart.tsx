/* eslint-disable @typescript-eslint/no-explicit-any */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import BaseChart from './base-chart';

export type BAR_DIRECTION = 'horizontal' | 'vertical';

interface Props {
  series: any;
  option?: any;
  categories: Array<string>;
  type?: BAR_DIRECTION;
}

export default function BarChart({ series, option, categories, type = 'vertical' }: Props) {
  const _plotOption = {
    borderWidth: 0,
    borderRadius: 2,
    pointWidth: 8,
  };

  const options = useMemo(() => {
    let _type = 'column';
    let _plotOptions: { column: any } | { bar: any } = { column: _plotOption };
    if (type === 'horizontal') {
      _type = 'bar';
      _plotOptions = { bar: _plotOption };
    }
    return Highcharts.merge(
      {
        chart: {
          type: _type,
        },
        title: {
          text: undefined,
        },
        xAxis: {
          categories: categories,
        },
        yAxis: {
          title: {
            text: undefined,
          },
          gridLineWidth: 0,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          ..._plotOptions,
          ...{
            series: {
              pointWidth: 20,
            },
          },
        },
        series: series,
      },
      option
    );
  }, [categories, series, option, type]);

  return (
    <BaseChart>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </BaseChart>
  );
}
