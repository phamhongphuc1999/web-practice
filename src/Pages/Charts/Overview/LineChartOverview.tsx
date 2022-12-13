import { Box, Divider, Typography } from '@mui/material';
import LineChart from 'src/components/Charts/LineChart';
import { beautifulTooltip } from 'src/components/Charts/tool-utils/BeautifulTooltip';
import { Item } from '../components';
import { getBasicLineChart } from '../config';

export default function LineChartOverview() {
  return (
    <Box>
      <Typography variant="h4">Line charts</Typography>
      <Divider sx={{ marginY: 1 }} />
      <Box display="flex" flexWrap="wrap">
        <Item
          label="Basic line chart"
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
                ...beautifulTooltip((value) => (value ? value.toString() : '')),
              }}
              series={getBasicLineChart()}
            />
          }
        />
      </Box>
    </Box>
  );
}
