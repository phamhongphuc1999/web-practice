/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { KeyEChartType, TooltipParamType } from 'src/global';
import { numberWithCommas } from 'src/services';

export const DashboardKeys: Array<KeyEChartType> = [
  'aptStaked',
  'averageStakedAmt',
  'medianStakedAmt',
  'newStakers',
  'stakers',
  'top10Percent',
  'top1Percent',
];

export const DataZoomConfig = [
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
];

export const XAxisConfig = {
  type: 'time',
  boundaryGap: false,
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
};

export const YAxisConfig = {
  type: 'value',
  scale: true,
  name: '',
  axisLabel: {
    formatter: function (value: number) {
      if (value >= 1000000) return `${value / 1000000}M`;
      else if (value >= 1000) return `${value / 1000}K`;
      else return value;
    },
  },
  axisLine: {
    lineStyle: {
      color: 'rgba(255, 255, 255, 1)',
      opacity: 0.1,
    },
  },
  boundaryGap: [0, 0.02],
  nameTextStyle: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 1)',
  },
  splitLine: {
    lineStyle: {
      color: '#a1a1aa',
      opacity: 0.05,
    },
  },
};

export const SeriesConfig = {
  type: 'bar',
  smooth: true,
  showSymbol: false,
  label: { show: false },
  emphasis: {
    focus: 'series',
    shadowBlur: 10,
  },
};

export const TooltipConfig = {
  trigger: 'axis',
  // zIndex: 0,
  backgroundColor: '#28282c',
  borderWidth: '0',
  // padding: 0,
  textStyle: {
    color: 'white',
  },
  // extraCssText: 'box-shadow: none;',
  valueFormatter: function (value: number | string) {
    const _value = parseFloat(value.toString()).toFixed(3);
    if (value != _value) return numberWithCommas(_value);
    else return numberWithCommas(value.toString());
  },
  formatter: (params: Array<TooltipParamType>) => {
    const date = moment(params[0].data[0]).format('MMM DD, YYYY');
    let tooltipText = `<p>${date}</p><div>`;
    params.forEach((item) => {
      const seriesName = item.seriesName;
      const rawValue = item.data[1];
      let _value = rawValue.toFixed(3);
      if (rawValue != parseFloat(_value)) _value = numberWithCommas(_value);
      else _value = numberWithCommas(rawValue.toString());
      const color = item.color;

      tooltipText += `<div style="heigh:30px;display:flex;align-items:center;">
        <div style="background-color: ${color};width:10px;height:10px;border-radius:50%;margin-right:5px;"></div>
        <div style="width:200px;">
          <span>${seriesName}</span>
        </div>
        <span>${_value}</span>
      </div>`;
    });
    tooltipText = `${tooltipText}</div>`;
    return tooltipText;
  },
};
