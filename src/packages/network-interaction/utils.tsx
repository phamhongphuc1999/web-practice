import { SimpleItem } from './network-interaction';

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

export function checkForHttpErrors(fetchRes: Response): void {
  switch (fetchRes.status) {
    case 405:
      throw new Error();
    case 418:
      throw new Error();
    case 503:
    case 504:
      throw new Error();
    default:
      break;
  }
}
