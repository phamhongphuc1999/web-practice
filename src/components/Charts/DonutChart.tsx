/* eslint-disable @typescript-eslint/no-explicit-any */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';

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
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
            innerSize: '90%',
          },
        },
        series: series,
      },
      option
    );
  }, [option, series]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
