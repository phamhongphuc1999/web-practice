import { Box, BoxProps, Divider, Grid, Typography } from '@mui/material';
import LineChart from 'src/components/Charts/LineChart';
import { beautifulTooltip } from 'src/components/Charts/tool-utils/BeautifulTooltip';
import useTranslate from 'src/hooks/useTranslate';
import { numberWithCommas, toFixed } from 'src/services';
import { Item } from '../components';
import { getBasicLineChart } from '../config';

export default function LineChartOverview(props: BoxProps) {
  const { t } = useTranslate();

  return (
    <Box {...props}>
      <Typography variant="h4">{t('lineChart')}</Typography>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={2}>
        <Item
          label={t('basicLineChart')}
          Chart={
            <LineChart
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
      </Grid>
    </Box>
  );
}
