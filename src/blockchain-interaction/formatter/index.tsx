/* eslint-disable @typescript-eslint/no-explicit-any */
import BN from 'bn.js';
import { RealJson } from '../type';
import numberToBN, { arrayContainsArray, getBinarySize, padToEven, stripHexPrefix } from '../utils';
import schema from './schema.json';

const ten = new BN('10', 10);
const JsonSchema = schema.objects as RealJson;
const JsonMethods = schema.methods as { [key: string]: Array<any> };

export function format(formatter: string | Array<string>, value: any, encode: boolean, lengthRequirement?: number) {
  let output = value;
  if (formatter === 'Q') output = formatQuantity(value, encode);
  else if (formatter === 'QP') output = formatQuantity(value, encode, true);
  else if (formatter === 'Q|T') output = formatQuantityOrTag(value, encode);
  else if (formatter === 'D') output = formatData(value);
  else if (formatter === 'D20') output = formatData(value, 20);
  else if (formatter === 'D32') output = formatData(value, 32);
  else {
    if (typeof value === 'object' && value !== null && Array.isArray(value) === false) {
      output = formatObject(formatter, value, encode);
    } else if (Array.isArray(value)) {
      output = formatArray(formatter, value, encode, lengthRequirement);
    }
  }

  return output;
}

export function formatQuantity(value: any, encode: boolean, pad?: boolean) {
  if (['string', 'number', 'object'].indexOf(typeof value) === -1 || value === null) return value;
  const numberValue = numberToBN(value);
  if (numberValue) {
    const numPadding = numberValue.lt(ten) && pad && !numberValue.isZero() ? '0' : '';
    if (numberValue.isNeg()) {
      throw new Error(
        `[formatter] while formatting quantity '${numberValue.toString(
          10
        )}', invalid negative number. Number must be positive or zero.`
      );
    }
    return encode ? `0x${numPadding}${numberValue.toString(16)}` : numberValue;
  }
}

export function formatQuantityOrTag(value: any, encode: boolean) {
  let output = value;
  if (schema.tags.indexOf(value) === -1) output = formatQuantity(value, encode);
  return output;
}

export function formatData(value: string, byteLength?: number) {
  let output = value;
  let outputByteLength = 0;
  if (typeof value === 'string') {
    output = `0x${padToEven(stripHexPrefix(value))}`;
    outputByteLength = getBinarySize(output);
  }
  if (output === '0x00') output = '0x0';
  if (
    typeof byteLength === 'number' &&
    value !== null &&
    output !== '0x' &&
    output !== '0x0' &&
    (!/^[0-9A-Fa-f]+$/.test(stripHexPrefix(output)) || outputByteLength !== 2 + byteLength * 2)
  ) {
    throw new Error(
      `[format] hex string '${output}' must be an alphanumeric ${
        2 + byteLength * 2
      } utf8 byte hex (chars: a-fA-F) string, is ${outputByteLength} bytes`
    );
  }
  return output;
}

export function formatObject(formatter: string | Array<string>, value: RealJson, encode: boolean) {
  const output: RealJson = Object.assign({}, value);
  let formatObject: any = null;
  if (typeof formatter === 'string') {
    if (formatter === 'Boolean|EthSyncing') formatObject = Object.assign({}, JsonSchema.EthSyncing);
    else if (formatter === 'DATA|Transaction') formatObject = Object.assign({}, JsonSchema.Transaction);
    else formatObject = Object.assign({}, JsonSchema[formatter]);
  }
  if (!arrayContainsArray(Object.keys(value), formatObject.__required)) {
    throw new Error(
      `[format] object ${JSON.stringify(value)} must contain properties: ${formatObject.__required.join(', ')}`
    );
  }
  Object.keys(formatObject).forEach((valueKey) => {
    if (valueKey !== '__required' && typeof value[valueKey] !== 'undefined') {
      output[valueKey] = format(formatObject[valueKey], value[valueKey], encode);
    }
  });
  return output;
}

export function formatArray(
  formatter: string | Array<string>,
  value: Array<RealJson>,
  encode: boolean,
  lengthRequirement?: number
) {
  const output = value.slice();
  let formatObject = formatter;
  if (formatter === 'Array|DATA') formatObject = ['D'];
  if (formatter === 'FilterChange' && typeof value[0] === 'string') formatObject = ['D32'];

  if (encode === true && typeof lengthRequirement === 'number' && value.length < lengthRequirement) {
    throw new Error(
      `array ${JSON.stringify(value)} must contain at least ${lengthRequirement} params, but only contains ${
        value.length
      }.`
    );
  }
  formatObject = formatObject.slice();
  value.forEach((valueKey, valueIndex) => {
    let formatObjectKey = 0;
    if (formatObject.length > 1) formatObjectKey = valueIndex;
    output[valueIndex] = format(formatObject[formatObjectKey], valueKey, encode);
  });
  return output;
}

export function formatInputs(method: string, inputs: any) {
  return format(JsonMethods[method][0], inputs, true, JsonMethods[method][2]);
}

export function formatOutputs(method: string, outputs: any) {
  return format(JsonMethods[method][1], outputs, false);
}
