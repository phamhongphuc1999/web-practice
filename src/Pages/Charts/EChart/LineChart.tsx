import ReactECharts from 'echarts-for-react';
import { useState } from 'react';
import { COLOR_ARRAY } from 'src/configs/constance';
import { TooltipEventType } from 'src/global';
import { interpolateMissingValues } from 'src/services';

const ChartData = {
  stakers: [null, null, 7, 10, 13, 17, 20, 25, 27, 30],
  newStakers: [20, 40, null, 80, 100, null, 140, 200, 250, 310],
  aptStaked: [15, 25, 30, 35, 40, 45, 50, 5, 100, 500],
  averageStakedAmt: [null, 10, 20, 30, 50, 60, 4, 6, 15, null],
  medianStakedAmt: [556, 765, 879, 134, 1011, 909, 890, 123, 560, 1000],
};

export default function LineChart() {
  const [data, setData] = useState<{
    stakers: number | null;
    newStakers: number | null;
    aptStaked: number | null;
    averageStakedAmt: number | null;
    medianStakedAmt: number | null;
  }>({
    stakers: null,
    newStakers: null,
    aptStaked: null,
    averageStakedAmt: null,
    medianStakedAmt: null,
  });

  return (
    <div>
      <ReactECharts
        option={{
          title: {
            text: 'Line Chart',
          },
          tooltip: {
            trigger: 'axis',
            formatter: (params: Array<TooltipEventType>) => {
              const firstItem = params[0];
              const dataIndex = firstItem.dataIndex;
              setData({
                stakers: ChartData.stakers[dataIndex],
                newStakers: ChartData.newStakers[dataIndex],
                aptStaked: ChartData.aptStaked[dataIndex],
                averageStakedAmt: ChartData.averageStakedAmt[dataIndex],
                medianStakedAmt: ChartData.medianStakedAmt[dataIndex],
              });
            },
          },
          legend: {
            data: ['stakers', 'newStakers', 'aptStaked', 'averageStakedAmt', 'medianStakedAmt'],
          },
          xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          },
          yAxis: [
            {
              type: 'value',
              name: 'stakers',
              position: 'left',
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[0] },
              },
              splitLine: {
                show: false,
              },
            },
            {
              type: 'value',
              name: 'newStakers',
              position: 'right',
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[1] },
              },
              splitLine: {
                show: false,
              },
            },
            {
              type: 'value',
              name: 'aptStaked',
              position: 'right',
              offset: 120,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[2] },
              },
              splitLine: {
                show: false,
              },
            },
            {
              type: 'value',
              name: 'averageStakedAmt',
              position: 'right',
              offset: 120,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[3] },
              },
              splitLine: {
                show: false,
              },
            },
            {
              type: 'value',
              name: 'medianStakedAmt',
              position: 'right',
              offset: 120,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[4] },
              },
              splitLine: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: 'stakers',
              type: 'line',
              data: interpolateMissingValues(ChartData['stakers']),
              yAxisIndex: 0,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[0] },
              showSymbol: false,
            },
            {
              name: 'newStakers',
              type: 'line',
              data: interpolateMissingValues(ChartData['newStakers']),
              yAxisIndex: 1,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[1] },
              showSymbol: false,
            },
            {
              name: 'aptStaked',
              type: 'line',
              data: interpolateMissingValues(ChartData['aptStaked']),
              yAxisIndex: 2,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[2] },
              showSymbol: false,
            },
            {
              name: 'averageStakedAmt',
              type: 'line',
              data: interpolateMissingValues(ChartData['averageStakedAmt']),
              yAxisIndex: 3,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[3] },
              showSymbol: false,
            },
            {
              name: 'medianStakedAmt',
              type: 'line',
              data: interpolateMissingValues(ChartData['medianStakedAmt']),
              yAxisIndex: 4,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[4] },
              showSymbol: false,
            },
          ],
        }}
      />
      {data.stakers != null && (
        <p style={{ color: COLOR_ARRAY[0] }}>{`stakers: ${data.stakers}`}</p>
      )}
      {data.newStakers != null && (
        <p style={{ color: COLOR_ARRAY[1] }}>{`newStakers: ${data.newStakers}`}</p>
      )}
      {data.aptStaked != null && (
        <p style={{ color: COLOR_ARRAY[2] }}>{`aptStaked: ${data.aptStaked}`}</p>
      )}
      {data.averageStakedAmt != null && (
        <p style={{ color: COLOR_ARRAY[3] }}>{`averageStakedAmt: ${data.averageStakedAmt}`}</p>
      )}
      {data.medianStakedAmt != null && (
        <p style={{ color: COLOR_ARRAY[4] }}>{`medianStakedAmt: ${data.medianStakedAmt}`}</p>
      )}
    </div>
  );
}
