/* eslint-disable @typescript-eslint/no-explicit-any */
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
