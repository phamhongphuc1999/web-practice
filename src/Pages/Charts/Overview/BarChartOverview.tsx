import { Box, BoxProps, Divider, Grid, Typography } from '@mui/material';
import BarChart from 'src/components/Charts/BarChart';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { Item } from '../components';
import { BarChartCategories, BarChartData } from '../config';

export default function BarChartOverview(props: BoxProps) {
  const { t } = useLocalTranslate();

  return (
    <Box {...props}>
      <Typography variant="h4">{t('barCharts')}</Typography>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={2}>
        <Item
          sm={12}
          xs={12}
          label={t('basicBarChart')}
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
