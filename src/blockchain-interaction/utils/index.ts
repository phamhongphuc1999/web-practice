/* eslint-disable @typescript-eslint/no-explicit-any */
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';
import { signSync } from '@noble/secp256k1';
import { SimpleItem } from '../type';

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

export function btoa(data: string | Buffer) {
  let _buffer;
  if (data instanceof Buffer) _buffer = data;
  else _buffer = Buffer.from(data, 'binary');
  return _buffer.toString('base64');
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
