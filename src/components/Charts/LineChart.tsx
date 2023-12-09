/* eslint-disable @typescript-eslint/no-explicit-any */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import { LineSeriesType } from 'src/global';

interface Props {
  series: Array<LineSeriesType>;
  option?: any;
}

export default function LineChart({ series, option }: Props) {
  const options = useMemo(() => {
    return Highcharts.merge(
      {
        chart: {
          type: 'line',
        },
        title: {
          text: undefined,
        },
        yAxis: {
          labels: {
            enabled: false,
          },
          title: {
            text: undefined,
          },
          gridLineWidth: 0,
        },
        xAxis: {
          crosshair: {
            color: '#7E94BD',
            width: 1,
          },
        },
        plotOptions: {
          line: {
            marker: {
              enabled: false,
              symbol: 'circle',
            },
            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 2,
              },
            },
            threshold: null,
          },
        },
        series: series,
        tooltip: {
          enabled: true,
          shared: true,
          style: {
            display: 'none',
          },
        },
        legend: {
          enabled: false,
        },
      },
      option
    );
  }, [series, option]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
