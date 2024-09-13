/* eslint-disable @typescript-eslint/no-explicit-any */
import { SxProps, Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';

type SBase = {
  toString: () => string;
};

export default class LocalStorage {
  static set<T extends SBase>(key: string, value: T, formatter?: (value: T) => string) {
    if (formatter) localStorage.setItem(key, formatter(value));
    else localStorage.setItem(key, value.toString());
  }

  static get(key: string): string | null {
    return localStorage.getItem(key);
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static expireSet<T extends SBase>(
    key: string,
    value: T,
    interval: number,
    formatter?: (value: T) => string
  ) {
    const currentTimestamp = Date.now();
    const expiredTimestamp = interval + currentTimestamp;
    const data = {
      value: formatter ? formatter(value) : value.toString(),
      timestamp: expiredTimestamp,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  static expireGet(key: string): { data: string | null; error?: string } {
    const rawData = localStorage.getItem(key);
    if (rawData) {
      const data: { value: string; timestamp: string } = JSON.parse(rawData);
      const currentTimestamp = Date.now();
      if (Number(data.timestamp) < currentTimestamp) return { data: null, error: 'key is expired' };
      return { data: data.value };
    } else return { data: null, error: 'Invalid key' };
  }
}

export const isNumeric = (num: number) => {
  return !isNaN(num) && !isNaN(parseFloat(num.toString()));
};

export function toFixed(num: number | string, fractionDigits = 0): number {
  num = Number(num);
  if (num == 0) return Number(num.toFixed(fractionDigits));
  const fixedNum = Number(num.toFixed(fractionDigits));
  if (fixedNum == 0) return toFixed(num, fractionDigits + 1);
  return fixedNum;
}

export function numberWithCommas(x: string, fractionDigits = 3) {
  const [naturalPart, decimalPart] = x.split('.');
  let out = naturalPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (decimalPart) {
    if (!isNumeric(fractionDigits)) out += '.' + decimalPart;
    else if (decimalPart.length >= fractionDigits)
      out += '.' + decimalPart.slice(0, fractionDigits);
    else out += '.' + decimalPart + '0'.repeat(fractionDigits - decimalPart.length);
  }
  return out;
}

export function decimalAdjust(type: 'ceil' | 'round' | 'floor', value: any, exp?: any): any {
  if (typeof exp === 'undefined' || +exp === 0) return Math[type](value);
  value = +value;
  exp = +exp;
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) return NaN;
  if (value < 0) return -decimalAdjust(type, -value, exp);
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}

export function formatAddress(address: string, fractionDigits?: number) {
  try {
    return address.slice(0, fractionDigits ?? 3) + '...' + address.slice(-(fractionDigits ?? 3));
  } catch (error) {
    return undefined;
  }
}

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function random(min: number, max: number) {
  if (max < 0) max = 1;
  if (min < 0) min = 0;
  if (min >= max) {
    min = 0;
    max = 1;
  }
  const seed = Math.random();
  const range = max - min;
  return seed * range + min;
}

export function randomSubGroup(range: number, numberOfSelected: number) {
  if (numberOfSelected < 0 || range < numberOfSelected) {
    range = 10;
    numberOfSelected = 1;
  }
  const _array = Array.from(Array(range).keys(), (key) => key + 1);
  for (let i = range - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [_array[i], _array[j]] = [_array[j], _array[i]];
  }
  return _array.slice(0, numberOfSelected);
}

export function mergeSx(sxs: Array<boolean | SxProps<Theme> | undefined>): SxProps<Theme> {
  let result: Array<
    boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
  > = [];
  for (const sx of sxs) {
    if (sx) {
      if (Array.isArray(sx))
        result = result.concat(
          sx as ReadonlyArray<
            boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
          >
        );
      else
        result.push(sx as SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>));
    }
  }
  return result;
}
