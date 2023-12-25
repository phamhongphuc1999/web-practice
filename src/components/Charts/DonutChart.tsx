/* eslint-disable @typescript-eslint/no-explicit-any */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import BaseChart from './base-chart';

interface Props {
  series: any;
  option?: any;
}

export default function DonutChart({ series, option }: Props) {
  const options = useMemo(() => {
    return Highcharts.merge(
      {
        chart: {
          type: 'pie',
        },
        title: {
          text: undefined,
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderRadius: 0,
            borderWidth: 0,
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
            innerSize: '85%',
          },
        },
        series: series,
        legend: {
          enabled: false,
        },
      },
      option
    );
  }, [option, series]);

  return (
    <BaseChart>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </BaseChart>
  );
}
