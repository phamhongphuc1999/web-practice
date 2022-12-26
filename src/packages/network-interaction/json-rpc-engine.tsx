/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcRequest, JsonRpcResponse } from './network-interaction';
import { btoa, checkForHttpErrors, normalizeUrlFromParsed } from './utils';

const fetch = global.fetch;

const RETRIABLE_ERRORS: string[] = [
  // ignore server overload errors
  'Gateway timeout',
  'ETIMEDOUT',
  // ignore server sent html error pages
  // or truncated json responses
  'failed to parse response body',
  // ignore errors where http req failed to establish
  'Failed to fetch',
];

interface Request {
  method: string;
  headers: Record<string, string>;
  body: string;
}

export type BlockData = string | string[];
export type Block = Record<string, BlockData>;

export class JsonRpcEngine {
  private rpcUrl: URL;

  constructor(rpcUrl: string) {
    this.rpcUrl = new URL(rpcUrl);
  }

  async handle<Params, Result = unknown>(
    request: JsonRpcRequest<Params>,
    callback?: (error: unknown, response: JsonRpcResponse<Result>) => void
  ) {
    if (callback)
      if (callback && typeof callback !== 'function') throw new Error('"callback" must be a function if provided.');
    const _result = await this._fetch(request);
    return _result;
  }

  private async _fetch<Params>(request: JsonRpcRequest<Params>) {
    const { fetchUrl, fetchParams } = this._createFetchConfig(request);
    try {
      const fetchRes: Response = await fetch(fetchUrl, fetchParams);
      checkForHttpErrors(fetchRes);
      const rawBody: string = await fetchRes.text();
      let fetchBody: Record<string, Block>;
      try {
        fetchBody = JSON.parse(rawBody);
      } catch (_) {
        throw new Error(`FetchMiddleware - failed to parse response body: "${rawBody}"`);
      }
      const result: Block = this._parseResponse(fetchRes, fetchBody);
      return result;
    } catch (err: any) {
      const errMsg: string = err.toString();
      const isRetriable: boolean = RETRIABLE_ERRORS.some((phrase) => errMsg.includes(phrase));
      if (!isRetriable) throw err;
    }
  }

  private _createFetchConfig<Params>(request: JsonRpcRequest<Params>) {
    const fetchUrl: string = normalizeUrlFromParsed(this.rpcUrl);
    const payload: Partial<JsonRpcRequest<Params>> = {
      id: request.id,
      jsonrpc: request.jsonrpc,
      method: request.method,
      params: request.params,
    };
    const serializedPayload: string = JSON.stringify(payload);
    const fetchParams: Request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: serializedPayload,
    };
    if (this.rpcUrl.username && this.rpcUrl.pathname) {
      const authString = `${this.rpcUrl.username}:${this.rpcUrl.password}`;
      const encodedAuth = btoa(authString);
      fetchParams.headers.Authorization = `Basic ${encodedAuth}`;
    }
    return { fetchUrl, fetchParams };
  }

  private _parseResponse(fetchRes: Response, body: Record<string, Block>): Block {
    if (fetchRes.status !== 200) throw new Error();
    if (body.error) throw new Error();
    return body.result;
  }
}
