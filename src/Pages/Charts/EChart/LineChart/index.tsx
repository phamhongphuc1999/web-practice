import ReactECharts from 'echarts-for-react';
import { useMemo, useState } from 'react';
import { COLOR_ARRAY } from 'src/configs/constance';
import { TooltipEventType } from 'src/global';
import { fillMissingValues } from 'src/services';
import moment from 'moment';
import { ChartData, KeyChartType, xAxis } from './utils';

export default function LineChart() {
  const [data, setData] = useState<{
    [key in KeyChartType]: number | null;
  }>({
    stakers: null,
    newStakers: null,
    aptStaked: null,
    averageStakedAmt: null,
    medianStakedAmt: null,
    'top1%': null,
    'top10%': null,
  });
  const [show, setShow] = useState<{
    [key in KeyChartType]: boolean;
  }>({
    stakers: true,
    newStakers: false,
    aptStaked: false,
    averageStakedAmt: false,
    medianStakedAmt: false,
    'top1%': false,
    'top10%': false,
  });
  const [date, setDate] = useState(0);

  function _setShow(key: KeyChartType) {
    setShow((preValue) => {
      const _newValue = { ...preValue };
      _newValue[key] = !_newValue[key];
      return { ..._newValue };
    });
  }

  const { left, right, offsetNewStaked, offsetTop1, offsetMedian, offsetAverage, offsetApt } =
    useMemo(() => {
      let left = 0;
      let right = 0;
      let offsetNewStaked = 0;
      let offsetTop1 = 0;
      let offsetMedian = 0;
      let offsetAverage = 0;
      let offsetApt = 0;
      if (show.stakers) {
        left += 60;
        offsetNewStaked += 60;
      }
      if (show.newStakers) left += 60;
      if (show['top10%']) {
        right += 60;
        offsetTop1 += 60;
        offsetMedian += 60;
        offsetAverage += 60;
        offsetApt += 60;
      }
      if (show['top1%']) {
        right += 60;
        offsetMedian += 60;
        offsetAverage += 60;
        offsetApt += 60;
      }
      if (show.medianStakedAmt) {
        right += 60;
        offsetAverage += 60;
        offsetApt += 60;
      }
      if (show.averageStakedAmt) {
        right += 60;
        offsetApt += 60;
      }
      if (show.aptStaked) right += 60;
      return {
        left: `${left}px`,
        right: `${right}px`,
        offsetNewStaked,
        offsetTop1,
        offsetMedian,
        offsetAverage,
        offsetApt,
      };
    }, [show]);

  return (
    <div>
      <ReactECharts
        option={{
          grid: { left, right },
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
                'top1%': ChartData['top1%'][dataIndex],
                'top10%': ChartData['top10%'][dataIndex],
              });
              setDate(xAxis[dataIndex]);
            },
          },
          legend: {
            data: [
              'stakers',
              'newStakers',
              'aptStaked',
              'averageStakedAmt',
              'medianStakedAmt',
              'top1%',
              'top10%',
            ],
            show: false,
          },
          xAxis: {
            type: 'category',
            data: xAxis.map((item) => moment(item * 1000).format('MMM-DD')),
          },
          yAxis: [
            {
              type: 'value',
              name: '',
              position: 'left',
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[0] },
              },
              splitLine: {
                show: true,
                lineStyle: {
                  width: 0.25,
                  color: ['rgba(243, 247, 242, 0.7)'],
                },
              },
              show: show.stakers,
            },
            {
              type: 'value',
              name: '',
              position: 'left',
              offset: offsetNewStaked,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[1] },
              },
              splitLine: {
                show: false,
              },
              show: show.newStakers,
            },
            {
              type: 'value',
              name: '',
              position: 'right',
              offset: offsetApt,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[2] },
              },
              splitLine: {
                show: false,
              },
              show: show.aptStaked,
            },
            {
              type: 'value',
              name: '',
              position: 'right',
              offset: offsetAverage,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[3] },
              },
              splitLine: {
                show: false,
              },
              show: show.averageStakedAmt,
            },
            {
              type: 'value',
              name: '',
              position: 'right',
              offset: offsetMedian,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[4] },
              },
              splitLine: {
                show: false,
              },
              show: show.medianStakedAmt,
            },
            {
              type: 'value',
              name: '',
              position: 'right',
              offset: offsetTop1,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[5] },
              },
              splitLine: {
                show: false,
              },
              show: show['top1%'],
            },
            {
              type: 'value',
              name: '',
              position: 'right',
              offset: 0,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[6] },
              },
              splitLine: {
                show: false,
              },
              show: show['top10%'],
            },
          ],
          series: [
            {
              name: 'stakers',
              type: 'line',
              data: show.stakers ? fillMissingValues(ChartData['stakers']) : [],
              yAxisIndex: 0,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[0] },
              showSymbol: false,
              label: {
                show: false,
              },
            },
            {
              name: 'newStakers',
              type: 'line',
              data: show.newStakers ? fillMissingValues(ChartData['newStakers']) : [],
              yAxisIndex: 1,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[1] },
              showSymbol: false,
            },
            {
              name: 'aptStaked',
              type: 'line',
              data: show.aptStaked ? fillMissingValues(ChartData['aptStaked']) : [],
              yAxisIndex: 2,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[2] },
              showSymbol: false,
            },
            {
              name: 'averageStakedAmt',
              type: 'line',
              data: show.averageStakedAmt ? fillMissingValues(ChartData['averageStakedAmt']) : [],
              yAxisIndex: 3,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[3] },
              showSymbol: false,
            },
            {
              name: 'medianStakedAmt',
              type: 'line',
              data: show.medianStakedAmt ? fillMissingValues(ChartData['medianStakedAmt']) : [],
              yAxisIndex: 4,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[4] },
              showSymbol: false,
            },
            {
              name: 'top1%',
              type: 'line',
              data: show['top1%'] ? fillMissingValues(ChartData['top1%']) : [],
              yAxisIndex: 5,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[5] },
              showSymbol: false,
            },
            {
              name: 'top10%',
              type: 'line',
              data: show['top10%'] ? fillMissingValues(ChartData['top10%']) : [],
              yAxisIndex: 6,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[6] },
              showSymbol: false,
            },
          ],
          dataZoom: [
            { type: 'inside', xAxisIndex: [0] },
            { type: 'slider', xAxisIndex: [0], start: 0, end: 100 },
          ],
        }}
        style={{ width: '100%', height: '500px' }}
      />
      <div className="flex gap-x-3">
        {Object.keys(ChartData).map((item) => {
          const _key = item as KeyChartType;

          return (
            <div
              key={item}
              onClick={() => _setShow(_key)}
              style={{ backgroundColor: `rgba(28, 139, 243, ${show[_key] ? 1 : 0.1})` }}
              className="h-[40px] flex items-center px-2 rounded-[8px] cursor-pointer"
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <p>{moment(date * 1000).format('YYYY-MMM-DD')}</p>
        {data.stakers != null && show.stakers && (
          <p style={{ color: COLOR_ARRAY[0] }}>{`stakers: ${data.stakers}`}</p>
        )}
        {data.newStakers != null && show.newStakers && (
          <p style={{ color: COLOR_ARRAY[1] }}>{`newStakers: ${data.newStakers}`}</p>
        )}
        {data.aptStaked != null && show.aptStaked && (
          <p style={{ color: COLOR_ARRAY[2] }}>{`aptStaked: ${data.aptStaked}`}</p>
        )}
        {data.averageStakedAmt != null && show.averageStakedAmt && (
          <p style={{ color: COLOR_ARRAY[3] }}>{`averageStakedAmt: ${data.averageStakedAmt}`}</p>
        )}
        {data.medianStakedAmt != null && show.medianStakedAmt && (
          <p style={{ color: COLOR_ARRAY[4] }}>{`medianStakedAmt: ${data.medianStakedAmt}`}</p>
        )}
        {data['top1%'] != null && show['top1%'] && (
          <p style={{ color: COLOR_ARRAY[5] }}>{`top1%: ${data['top1%']}`}</p>
        )}
        {data['top10%'] != null && show['top10%'] && (
          <p style={{ color: COLOR_ARRAY[6] }}>{`top10%: ${data['top10%']}`}</p>
        )}
      </div>
    </div>
  );
}
