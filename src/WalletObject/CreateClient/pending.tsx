/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncMiddleware } from 'json-rpc-engine';
import { formatTxMetaForRpcResult } from '../utils';
import { TransactionMetadata } from '../wallet';

export function createPendingNonceMiddleware(getPendingNonce: (param: any) => void) {
  return createAsyncMiddleware(async (req, res, next) => {
    const { method, params } = req;
    if (method !== 'eth_getTransactionCount') {
      next();
      return;
    }
    const [param, blockRef] = params as [any, any];
    if (blockRef !== 'pending') {
      next();
      return;
    }
    res.result = await getPendingNonce(param);
  });
}

export function createPendingTxMiddleware(getPendingTransactionByHash: (hash: string) => TransactionMetadata) {
  return createAsyncMiddleware(async (req, res, next) => {
    const { method, params } = req;
    if (method !== 'eth_getTransactionByHash') {
      next();
      return;
    }
    const [hash] = params as [string];
    const txMeta = getPendingTransactionByHash(hash);
    if (!txMeta) {
      next();
      return;
    }
    res.result = formatTxMetaForRpcResult(txMeta);
  });
}
