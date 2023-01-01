/* eslint-disable @typescript-eslint/no-explicit-any */
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';
import BN from 'bn.js';
import { EthereumRpcError } from '../eth-rpc-errors/classes';
import { ethErrors } from '../eth-rpc-errors/errors';
import { Json, SimpleItem } from '../type';

export function getId(text: string) {
  return keccak256(toUtf8Bytes(text));
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
export function extend<T>(target: SimpleItem<T>, source: SimpleItem<T>) {
  for (const key in source) {
    if (hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
  return target;
}

export function normalizeUrlFromParsed(parsedUrl: URL): string {
  let result = '';
  result += parsedUrl.protocol;
  result += `//${parsedUrl.hostname}`;
  if (parsedUrl.port) {
    result += `:${parsedUrl.port}`;
  }
  result += `${parsedUrl.pathname}`;
  result += `${parsedUrl.search}`;
  return result;
}

export function btoa(data: string | Buffer) {
  let _buffer;
  if (data instanceof Buffer) _buffer = data;
  else _buffer = Buffer.from(data, 'binary');
  return _buffer.toString('base64');
}

function createRateLimitError(): EthereumRpcError<Json> {
  return ethErrors.rpc.internal({ message: 'Request is being rate limited.' });
}

function createTimeoutError(): EthereumRpcError<Json> {
  let msg = 'Gateway timeout. The request took too long to process. ';
  msg += 'This can happen when querying logs over too wide a block range.';
  return ethErrors.rpc.internal({ message: msg });
}

export function checkForHttpErrors(fetchRes: Response): void {
  switch (fetchRes.status) {
    case 405:
      throw ethErrors.rpc.methodNotFound();
    case 418:
      throw createRateLimitError();
    case 503:
    case 504:
      throw createTimeoutError();
    default:
      break;
  }
}

export function isAddress(address: string) {
  if (address.substring(0, 2) !== '0x') address = '0x' + address;
  return address.match(/^0x[0-9,a-f,A-F]{40}$/);
}

export function getAddress(address: string) {
  if (isAddress(address)) {
    if (address.substring(0, 2) !== '0x') return '0x' + address;
    return address;
  }
  return null;
}

export function isHexPrefixed(data: string) {
  const positive = data.slice(0, 2) === '0x';
  const negative = data.slice(0, 3) === '-0x';
  return positive || negative;
}

export function stripHexPrefix(address: string, mode: 'add' | 'remove' = 'add') {
  const _isHexPrefixed = isHexPrefixed(address);
  if (_isHexPrefixed && mode === 'remove') return address.slice(2);
  else if (!_isHexPrefixed && mode === 'add') return `0x${address}`;
  else return address;
}

export function padToEven(value: string) {
  let a = value;
  if (a.length % 2) a = `0${a}`;
  return a;
}

export function arrayContainsArray(superset: Array<any>, subset: Array<any>, some?: boolean) {
  return subset[(Boolean(some) && 'some') || 'every']((value) => superset.indexOf(value) >= 0);
}

export function getBinarySize(str: string) {
  return Buffer.byteLength(str, 'utf8');
}

export default function numberToBN(data: string | number) {
  if (typeof data === 'string' || typeof data === 'number') {
    let multiplier = new BN(1);
    const formattedString = String(data).toLowerCase().trim();
    const isHexPrefixed = formattedString.slice(0, 2) === '0x' || formattedString.slice(0, 3) === '-0x';
    let stringArg = stripHexPrefix(formattedString, 'remove');
    if (stringArg.slice(0, 1) === '-') {
      stringArg = stripHexPrefix(stringArg.slice(1));
      multiplier = new BN(-1, 10);
    }
    stringArg = stringArg === '' ? '0' : stringArg;
    if (
      (!stringArg.match(/^-?[0-9]+$/) && stringArg.match(/^[0-9A-Fa-f]+$/)) ||
      stringArg.match(/^[a-fA-F]+$/) ||
      (isHexPrefixed === true && stringArg.match(/^[0-9A-Fa-f]+$/))
    ) {
      return new BN(stringArg, 16).mul(multiplier);
    }
    if ((stringArg.match(/^-?[0-9]+$/) || stringArg === '') && isHexPrefixed === false) {
      return new BN(stringArg, 10).mul(multiplier);
    }
  }
  return null;
}
