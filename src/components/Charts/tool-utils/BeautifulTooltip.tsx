import Highcharts, { Tooltip, TooltipFormatterContextObject } from 'highcharts';
import { toFixed } from 'src/services';

export function baseTooltip(
  valueFormatter: (value: number | null | undefined) => string,
  isPercent = false,
  xFormat: (xValue: string | number | null | undefined) => string = (x) => (x ? x.toString() : '')
) {
  function formatter(this: TooltipFormatterContextObject, _: Tooltip) {
    const points = this.points;
    if (points) {
      let data = '';
      let x = null;
      for (const config of points) {
        if (!x) x = config.x;
        const color = config.color;
        let yValue = '';
        if (isPercent) {
          if (config.percentage < 0.0001) yValue = `${valueFormatter(0)} (0%)`;
          else yValue = `${valueFormatter(config.y)} (${toFixed(config.percentage, 2)}%)`;
        } else yValue = valueFormatter(config.y);
        data += `<br /><div class="scoring-chart-tooltip-container">\
            <div class="scoring-chart-tooltip-circle" style="background:${color}"></div>\
            <span>${config.series.name}</span>:&nbsp;<b>${yValue}</b></div>`;
      }
      data = `<div class="scoring-chart-tooltip-x">${xFormat(x)}</div>` + data;
      return data;
    }
    return false;
  }

  return {
    tooltip: {
      useHTML: true,
      style: {
        display: 'block',
      },
      formatter: formatter,
    },
  };
}

export function powerfulTooltip(
  titleFormatter: (point: TooltipFormatterContextObject) => string,
  valueFormatter: (point: TooltipFormatterContextObject) => string,
  headerFormatter: (xValue: string | number | null | undefined) => string = (x) =>
    x ? x.toString() : ''
) {
  function formatter(this: TooltipFormatterContextObject, _: Tooltip) {
    const points = this.points;
    if (points) {
      let data = '';
      let x = null;
      for (const point of points) {
        if (!x) x = point.x;
        const color = point.color;
        const title = titleFormatter(point);
        const value = valueFormatter(point);
        data += `<br /><div class="scoring-chart-tooltip-container">\
        <div class="scoring-chart-tooltip-circle" style="background:${color}"></div>\
        <span>${title}</span>:<b>&nbsp;${value}</b></div>`;
      }
      data = `<div class="scoring-chart-tooltip-x">${headerFormatter(x)}</div>` + data;
      return data;
    }
    return false;
  }

  return {
    tooltip: {
      useHTML: true,
      style: {
        display: 'block',
      },
      formatter: formatter,
    },
  };
}

export function beautifulTooltip(
  valueFormatter: (value: number | null | undefined) => string,
  isPercent = false,
  dateFormat = '%b %e, %Y, %k:%M'
) {
  return baseTooltip(
    valueFormatter,
    isPercent,
    (date) => `${Highcharts.dateFormat(dateFormat, Number(date))}`
  );
}

export function powerfulDateTooltip(
  titleFormatter: (point: TooltipFormatterContextObject) => string,
  valueFormatter: (point: TooltipFormatterContextObject) => string,
  dateFormat = '%b %e, %Y, %k:%M'
) {
  return powerfulTooltip(
    titleFormatter,
    valueFormatter,
    (date) => `${Highcharts.dateFormat(dateFormat, Number(date))}`
  );
}
