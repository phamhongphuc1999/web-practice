import { Box, BoxProps, Divider, Grid, Typography } from '@mui/material';
import AreaChart from 'src/components/Charts/AreaChart';
import { beautifulTooltip } from 'src/components/Charts/tool-utils/BeautifulTooltip';
import { CHART_ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import { numberWithCommas, toFixed } from 'src/services';
import { Item } from '../components';
import { getBasicLineChart } from '../config';

interface Props {
  props?: BoxProps;
}

export default function AreaChartOverview({ props }: Props) {
  const { t } = useTranslate();

  return (
    <Box {...props}>
      <Typography variant="h4">{t('areaCharts')}</Typography>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={2}>
        <Item
          label={t('basicAreaChart')}
          detailLink={CHART_ROUTE.BASIC_AREA_CHART}
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
      </Grid>
    </Box>
  );
}
