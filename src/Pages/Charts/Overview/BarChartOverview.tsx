import { Box, BoxProps, Divider, Grid, Typography } from '@mui/material';
import BarChart from 'src/components/Charts/BarChart';
import { CHART_ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import { Item } from '../components';
import { BarChartCategories, BarChartData } from '../config';

interface Props {
  props?: BoxProps;
}

export default function BarChartOverview({ props }: Props) {
  const { t } = useTranslate();

  return (
    <Box {...props}>
      <Typography variant="h4">{t('barCharts')}</Typography>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={2}>
        <Item
          props={{ sm: 12, xs: 12 }}
          label={t('basicBarChart')}
          detailLink={CHART_ROUTE.BASIC_BAR_CHART}
          Chart={
            <BarChart
              categories={BarChartCategories}
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
              }}
              series={BarChartData}
            />
          }
        />
      </Grid>
    </Box>
  );
}
