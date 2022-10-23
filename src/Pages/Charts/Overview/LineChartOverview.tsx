import { Box, Divider, Grid, Typography } from '@mui/material';
import LineChart from 'src/components/Charts/LineChart';
import { getBasicLineChart } from '../config';

export default function LineChartOverview() {
  return (
    <Box>
      <Typography variant="h4">Line charts</Typography>
      <Divider sx={{ marginY: 1 }} />
      <Grid container>
        <Grid item md={4} sm={6} xs={12}>
          <Box>
            <Box>
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
                }}
                series={getBasicLineChart()}
              />
            </Box>
            <Typography>Basic line</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
