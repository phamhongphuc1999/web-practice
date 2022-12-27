import { EthereumRpcError } from '../eth-rpc-errors/classes';
import { ethErrors } from '../eth-rpc-errors/errors';
import { Json, SimpleItem } from '../type';

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
