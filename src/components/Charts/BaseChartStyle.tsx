import { alpha, Theme, useTheme } from '@mui/material';
import Highcharts from 'highcharts';
import { COLOR_ARRAY } from 'src/configs/constance';

const defaultOption = (theme: Theme) => ({
  credits: {
    enabled: false,
  },
  chart: {
    backgroundColor: 'transparent',
    style: {
      fontFamily: '"Fira Sans", sans-serif',
      fontSize: '12px',
    },
  },
  title: {
    style: {
      color: theme.palette.primary.main,
      fontSize: '16px',
    },
  },
  yAxis: {
    gridLineColor: theme.palette.mode === 'dark' ? '#263343' : '#D7DFEC',
    lineColor: alpha(theme.palette.primary.main, 0.1),
    tickColor: alpha(theme.palette.primary.main, 0.1),
    title: {
      style: {
        color: theme.palette.text.primary,
      },
    },
    labels: {
      style: {
        color: theme.palette.text.primary,
      },
    },
  },
  xAxis: {
    gridLineColor: theme.palette.mode === 'dark' ? '#263343' : '#D7DFEC',
    tickColor: alpha(theme.palette.primary.main, 0.1),
    lineColor: alpha(theme.palette.primary.main, 0.1),
    title: {
      style: {
        color: theme.palette.text.primary,
      },
    },
    labels: {
      style: {
        color: theme.palette.text.primary,
      },
    },
  },
  legend: {
    itemStyle: {
      color: theme.palette.text.secondary,
    },
    itemHoverStyle: {
      color: theme.palette.primary.main,
    },
    itemHiddenStyle: {
      color: theme.palette.mode === 'dark' ? '#7a7a7a' : '#cccccc',
    },
  },
  plotOptions: {
    bar: {
      dataLabels: {
        style: {
          color: theme.palette.text.secondary,
          textOutline: 'none',
        },
      },
    },
  },
  colors: COLOR_ARRAY,
  time: {
    useUTC: false,
  },
  tooltip: {
    backgroundColor: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 60 },
      stops: [
        [0, '#FFFFFF'],
        [1, '#E0E0E0'],
      ],
    } as Highcharts.GradientColorObject,
  },
});

export default function BaseChartStyle() {
  const theme = useTheme();
  Highcharts.setOptions(defaultOption(theme));
  return null;
}
