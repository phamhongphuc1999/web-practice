/* eslint-disable @typescript-eslint/no-explicit-any */
import { Json } from '../type';
import { hasProperty, isPlainObject } from '../utils';
import { EthereumRpcError, SerializedEthereumRpcError } from './classes';
import { errorCodes, errorValues } from './error-constants';

const FALLBACK_ERROR_CODE = errorCodes.rpc.internal;
const FALLBACK_MESSAGE = 'Unspecified error message. This is a bug, please report it.';
const FALLBACK_ERROR: SerializedEthereumRpcError = {
  code: FALLBACK_ERROR_CODE,
  message: getMessageFromCode(FALLBACK_ERROR_CODE),
};

export const JSON_RPC_SERVER_ERROR_MESSAGE = 'Unspecified server error.';

type ErrorValueKey = keyof typeof errorValues;

export function getMessageFromCode(code: number, fallbackMessage: string = FALLBACK_MESSAGE): string {
  if (Number.isInteger(code)) {
    const codeString = code.toString();
    if (hasProperty(errorValues, codeString)) return errorValues[codeString as ErrorValueKey].message;
    if (isJsonRpcServerError(code)) return JSON_RPC_SERVER_ERROR_MESSAGE;
  }
  return fallbackMessage;
}

export function isValidCode(code: number): boolean {
  if (!Number.isInteger(code)) return false;
  const codeString = code.toString();
  if (errorValues[codeString as ErrorValueKey]) return true;
  if (isJsonRpcServerError(code)) return true;
  return false;
}

export function serializeError(
  error: unknown,
  { fallbackError = FALLBACK_ERROR, shouldIncludeStack = false } = {}
): SerializedEthereumRpcError {
  if (!fallbackError || !Number.isInteger(fallbackError.code) || typeof fallbackError.message !== 'string') {
    throw new Error('Must provide fallback error with integer number code and string message.');
  }

  if (error instanceof EthereumRpcError) return error.serialize();
  const serialized: Partial<SerializedEthereumRpcError> = {};

  if (
    error &&
    isPlainObject(error) &&
    hasProperty(error, 'code') &&
    isValidCode((error as SerializedEthereumRpcError).code)
  ) {
    const _error = error as Partial<SerializedEthereumRpcError>;
    serialized.code = _error.code as number;

    if (_error.message && typeof _error.message === 'string') {
      serialized.message = _error.message;
      if (hasProperty(_error, 'data')) serialized.data = _error.data ?? null;
    } else {
      serialized.message = getMessageFromCode((serialized as SerializedEthereumRpcError).code);
      serialized.data = { originalError: assignOriginalError(error) } as Json;
    }
  } else {
    serialized.code = fallbackError.code;
    const message = (error as any)?.message;
    serialized.message = message && typeof message === 'string' ? message : fallbackError.message;
    serialized.data = { originalError: assignOriginalError(error) } as Json;
  }

  const stack = (error as any)?.stack;
  if (shouldIncludeStack && error && stack && typeof stack === 'string') {
    serialized.stack = stack;
  }
  return serialized as SerializedEthereumRpcError;
}

function isJsonRpcServerError(code: number): boolean {
  return code >= -32099 && code <= -32000;
}

function assignOriginalError(error: unknown): unknown {
  if (error && typeof error === 'object' && !Array.isArray(error)) return Object.assign({}, error);
  return error;
}
