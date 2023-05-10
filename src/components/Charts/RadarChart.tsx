/* eslint-disable @typescript-eslint/no-explicit-any */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { useMemo } from 'react';

HighchartsMore(Highcharts);

interface Props {
  series: any;
  option?: any;
  categories: Array<string>;
}

export default function RadarChart({ series, option, categories }: Props) {
  const options = useMemo(() => {
    return Highcharts.merge(
      {
        chart: {
          polar: true,
          type: 'area',
        },
        title: {
          text: undefined,
        },
        pane: {
          startAngle: -22.5,
          endAngle: 337.5,
        },
        xAxis: {
          tickmarkPlacement: 'on',
          lineWidth: 0,
          categories: categories,
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0,
          max: 1000,
          tickInterval: 500,
        },
        legend: {
          layout: 'vertical',
        },
        series: series,
        tooltip: {
          enabled: true,
          shared: true,
        },
      },
      option
    );
  }, [series, option, categories]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
