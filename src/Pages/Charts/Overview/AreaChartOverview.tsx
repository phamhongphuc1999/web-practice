import { Box, BoxProps, Divider, Grid, Typography } from '@mui/material';
import { useCallback } from 'react';
import AreaChart from 'src/components/Charts/AreaChart';
import { beautifulTooltip } from 'src/components/Charts/tool-utils/BeautifulTooltip';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useAppSelector } from 'src/redux/store';
import { hexToRgb, numberWithCommas, toFixed } from 'src/services';
import { Item } from '../components';
import { getBasicLineChart, getThresholdLineChart } from '../config';

export default function AreaChartOverview(props: BoxProps) {
  const { t } = useLocalTranslate();
  const themeMode = useAppSelector((state) => state.user.theme.mode);

  const zoneFn = useCallback(
    (color: string) => {
      const rgb = hexToRgb(color);
      const beginOpacity = themeMode === 'dark' ? 1 : 0.7;
      let shadowColor = color;
      let beginColor = color;
      if (rgb) {
        shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
        beginColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${beginOpacity})`;
      }
      return {
        color: beginColor,
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, shadowColor],
            [1, shadowColor],
          ],
        },
      };
    },
    [themeMode]
  );

  return (
    <Box {...props}>
      <Typography variant="h4">{t('areaCharts')}</Typography>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={2}>
        <Item
          label={t('basicAreaChart')}
          Chart={
            <AreaChart
              option={{
                chart: {
                  height: 225,
                },
                xAxis: {
                  type: 'datetime',
                },
                yAxis: {
                  gridLineWidth: 0,
                },
                ...beautifulTooltip((value) =>
                  value ? numberWithCommas(toFixed(value, 2).toString()) : ''
                ),
              }}
              series={getBasicLineChart()}
            />
          }
        />
        <Item
          label={t('thresholdAreaChart')}
          Chart={
            <AreaChart
              option={{
                chart: {
                  height: 225,
                },
                plotOptions: {
                  area: {
                    threshold: 500000,
                  },
                },
                xAxis: {
                  type: 'datetime',
                },
                yAxis: {
                  gridLineWidth: 0,
                  labels: {
                    enabled: true,
                  },
                },
                ...beautifulTooltip((value) =>
                  value ? numberWithCommas(toFixed(value, 2).toString()) : ''
                ),
              }}
              series={getThresholdLineChart({
                zones: [
                  { value: 400000, ...zoneFn('#764C79') },
                  { value: 500000, ...zoneFn('#009FDB') },
                  { ...zoneFn('#eb8881') },
                ],
              })}
              metadata={{ makeSeries: false }}
            />
          }
        />
      </Grid>
    </Box>
  );
}
