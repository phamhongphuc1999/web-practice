export const isNumeric = (num: number) => {
  return !isNaN(num) && !isNaN(parseFloat(num.toString()));
};

export function toFixed(num: number, fractionDigits = 0): number {
  num = Number(num);
  if (num == 0) return Number(num.toFixed(fractionDigits));
  const fixedNum = Number(num.toFixed(fractionDigits));
  if (fixedNum == 0) return toFixed(num, fractionDigits + 1);
  return fixedNum;
}

export function numberWithCommas(x: string, fractionDigits: number) {
  const [naturalPart, decimalPart] = x.split('.');
  let out = naturalPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (decimalPart) {
    if (!isNumeric(fractionDigits)) {
      out += '.' + decimalPart;
    } else if (decimalPart.length >= fractionDigits) {
      out += '.' + decimalPart.substr(0, fractionDigits);
    } else {
      out += '.' + decimalPart + '0'.repeat(fractionDigits - decimalPart.length);
    }
  }
  return out;
}
