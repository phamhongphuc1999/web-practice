/* eslint-disable @typescript-eslint/no-explicit-any */
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';
import { signSync } from '@noble/secp256k1';
import { EthereumRpcError } from '../eth-rpc-errors/classes';
import { ethErrors } from '../eth-rpc-errors/errors';
import { Json, PlainObject, RuntimeObject, SimpleItem } from '../type';

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

export const hasProperty = (object: RuntimeObject, name: string | number | symbol): boolean =>
  Object.hasOwnProperty.call(object, name);

export function isPlainObject(value: unknown): value is PlainObject {
  if (typeof value !== 'object' || value === null) return false;
  try {
    let proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
  } catch (_) {
    return false;
  }
}

export interface ECDSASignature {
  v: bigint;
  r: Buffer;
  s: Buffer;
}
export function ecsign(msgHash: Buffer, privateKey: Buffer, chainId?: bigint): ECDSASignature {
  const [signature, recovery] = signSync(msgHash, privateKey, { recovered: true, der: false });
  const r = Buffer.from(signature.slice(0, 32));
  const s = Buffer.from(signature.slice(32, 64));
  const v =
    chainId === undefined
      ? BigInt(recovery + 27)
      : BigInt(recovery + 35) + BigInt(chainId) * BigInt(2);
  return { r, s, v };
}
