import { Box, BoxProps, Divider, Grid2, Typography } from '@mui/material';
import LineChart from 'src/components/Charts/LineChart';
import { beautifulTooltip } from 'src/components/Charts/tool-utils/BeautifulTooltip';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { numberWithCommas, toFixed } from 'src/services';
import { Item } from '../components';
import { getBasicLineChart } from '../config';

export default function LineChartOverview(props: BoxProps) {
  const { t } = useLocalTranslate();

  return (
    <Box {...props}>
      <Typography variant="h4">{t('lineChart')}</Typography>
      <Divider sx={{ marginY: 1 }} />
      <Grid2 container spacing={2}>
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
      </Grid2>
    </Box>
  );
}
