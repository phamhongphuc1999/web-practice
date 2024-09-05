/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactECharts from 'echarts-for-react';
import { useMemo, useState } from 'react';
import { COLOR_ARRAY } from 'src/configs/constance';
import useData, { getAreaColor, KeyChartType, yAxis } from './use-data';

const DEFAULT_OFFSET = 50;

export default function LineChart() {
  const [show, setShow] = useState<{
    [key in KeyChartType]: boolean;
  }>({
    stakers: true,
    newStakers: false,
    aptStaked: false,
    averageStakedAmt: false,
    medianStakedAmt: false,
    top1Percent: false,
    top10Percent: false,
  });

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
        left += DEFAULT_OFFSET;
        offsetNewStaked += DEFAULT_OFFSET;
      }
      if (show.newStakers) left += DEFAULT_OFFSET;
      if (show['top10Percent']) {
        right += DEFAULT_OFFSET;
        offsetTop1 += DEFAULT_OFFSET;
        offsetMedian += DEFAULT_OFFSET;
        offsetAverage += DEFAULT_OFFSET;
        offsetApt += DEFAULT_OFFSET;
      }
      if (show['top1Percent']) {
        right += DEFAULT_OFFSET;
        offsetMedian += DEFAULT_OFFSET;
        offsetAverage += DEFAULT_OFFSET;
        offsetApt += DEFAULT_OFFSET;
      }
      if (show.medianStakedAmt) {
        right += DEFAULT_OFFSET;
        offsetAverage += DEFAULT_OFFSET;
        offsetApt += DEFAULT_OFFSET;
      }
      if (show.averageStakedAmt) {
        right += DEFAULT_OFFSET;
        offsetApt += DEFAULT_OFFSET;
      }
      if (show.aptStaked) right += DEFAULT_OFFSET;
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

  const { min, max, chartData } = useData(1000);
  const {
    stakers,
    newStakers,
    aptStaked,
    averageStakedAmt,
    medianStakedAmt,
    top1Percent,
    top10Percent,
  } = chartData;

  return (
    <div>
      <ReactECharts
        option={{
          useUTC: true,
          grid: { left, right },
          tooltip: {
            trigger: 'axis',
            zIndex: 0,
            position: ['10px', '600px'],
            backgroundColor: 'none',
            borderWidth: '0',
            padding: 0,
            textStyle: {
              color: 'white',
            },
            extraCssText: 'box-shadow: none;',
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
            type: 'time',
            boundaryGap: false,
            min,
            max,
            nameTextStyle: {
              fontFamily: 'sans-serif',
              fontSize: 14,
              fontWeight: 400,
            },
            scale: true,
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 1)',
                opacity: 0.2,
              },
            },
            splitLine: {
              lineStyle: {
                color: '#a1a1aa',
                opacity: 0.1,
              },
            },
          },
          yAxis: [
            {
              ...yAxis,
              type: 'value',
              scale: true,
              name: '',
              position: 'left',
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[0] },
              },
              show: show.stakers,
            },
            {
              ...yAxis,
              type: 'value',
              scale: true,
              name: '',
              position: 'left',
              offset: offsetNewStaked,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[1] },
              },
              show: show.newStakers,
            },
            {
              ...yAxis,
              type: 'value',
              scale: true,
              name: '',
              position: 'right',
              offset: offsetApt,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[2] },
              },
              show: show.aptStaked,
            },
            {
              ...yAxis,
              type: 'value',
              scale: true,
              name: '',
              position: 'right',
              offset: offsetAverage,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[3] },
              },
              show: show.averageStakedAmt,
            },
            {
              ...yAxis,
              type: 'value',
              scale: true,
              name: '',
              position: 'right',
              offset: offsetMedian,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[4] },
              },
              show: show.medianStakedAmt,
            },
            {
              ...yAxis,
              type: 'value',
              scale: true,
              name: '',
              position: 'right',
              offset: offsetTop1,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[5] },
              },
              show: show['top1Percent'],
            },
            {
              ...yAxis,
              type: 'value',
              scale: true,
              name: '',
              position: 'right',
              offset: 0,
              axisLine: {
                lineStyle: { color: COLOR_ARRAY[6] },
              },
              show: show['top10Percent'],
            },
          ],
          series: [
            {
              name: 'stakers',
              data: show.stakers ? stakers : [],
              type: 'line',
              yAxisIndex: 0,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[0] },
              showSymbol: false,
              label: { show: false },
              emphasis: {
                focus: 'series',
                shadowBlur: 10,
              },
              areaStyle: getAreaColor(COLOR_ARRAY[0], true),
            },
            {
              name: 'newStakers',
              data: show.newStakers ? newStakers : [],
              type: 'line',
              yAxisIndex: 1,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[1] },
              showSymbol: false,
              emphasis: {
                focus: 'series',
                shadowBlur: 10,
              },
              areaStyle: getAreaColor(COLOR_ARRAY[1], true),
            },
            {
              name: 'aptStaked',
              type: 'bar',
              data: show.aptStaked ? aptStaked : [],
              yAxisIndex: 2,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[2] },
              showSymbol: false,
              emphasis: {
                focus: 'series',
                shadowBlur: 10,
              },
              areaStyle: getAreaColor(COLOR_ARRAY[2], true),
            },
            {
              name: 'averageStakedAmt',
              type: 'bar',
              data: show.averageStakedAmt ? averageStakedAmt : [],
              yAxisIndex: 3,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[3] },
              showSymbol: false,
              emphasis: {
                focus: 'series',
                shadowBlur: 10,
              },
              areaStyle: getAreaColor(COLOR_ARRAY[3], true),
            },
            {
              name: 'medianStakedAmt',
              type: 'bar',
              data: show.medianStakedAmt ? medianStakedAmt : [],
              yAxisIndex: 4,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[4] },
              showSymbol: false,
              emphasis: {
                focus: 'series',
                shadowBlur: 10,
              },
              areaStyle: getAreaColor(COLOR_ARRAY[4], true),
            },
            {
              name: 'top1%',
              type: 'bar',
              data: show['top1Percent'] ? top1Percent : [],
              yAxisIndex: 5,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[5] },
              showSymbol: false,
              emphasis: {
                focus: 'series',
                shadowBlur: 10,
              },
              areaStyle: getAreaColor(COLOR_ARRAY[5], true),
            },
            {
              name: 'top10%',
              type: 'bar',
              data: show['top10Percent'] ? top10Percent : [],
              yAxisIndex: 6,
              smooth: true,
              itemStyle: { color: COLOR_ARRAY[6] },
              showSymbol: false,
              emphasis: {
                focus: 'series',
                shadowBlur: 10,
              },
              areaStyle: getAreaColor(COLOR_ARRAY[6], true),
            },
          ],
          dataZoom: [
            { type: 'inside', start: 0, end: 100 },
            {
              type: 'slider',
              start: 0,
              end: 100,
              left: 20,
              right: 20,
              textStyle: {
                color: 'rgba(255, 255, 255, 1)',
              },
              borderColor: 'rgba(255, 255, 255, 0.4)',
              handleStyle: {
                borderColor: 'rgba(255, 255, 255, 0.9)',
                color: 'rgba(0, 0, 0, 0.4)',
              },
              moveHandleStyle: {
                color: 'rgba(255, 255, 255, 0.4)',
              },
              selectedDataBackground: {
                lineStyle: {
                  color: '#2172E5',
                },
                areaStyle: {
                  color: '#2172E5',
                },
              },
              emphasis: {
                handleStyle: {
                  borderColor: 'rgba(255, 255, 255, 1)',
                  color: 'rgba(255, 255, 255, 0.9)',
                },
                moveHandleStyle: {
                  borderColor: 'rgba(255, 255, 255, 1)',
                  color: 'rgba(255, 255, 255, 0.2)',
                },
              },
              fillerColor: 'rgba(0, 0, 0, 0.1)',
              labelFormatter: (val: any) => {
                const date = new Date(val);
                return date.toLocaleDateString();
              },
            },
          ],
        }}
        style={{ width: '100%', height: '500px' }}
      />
      <div className="flex gap-x-3">
        {Object.keys(chartData).map((item) => {
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
    </div>
  );
}
