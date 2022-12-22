import { isValidPrivate } from '@ethereumjs/util';
import { randomBytes } from 'crypto';
import { TRANSACTION_ENVELOPE_TYPES } from 'src/configs/wallet-network-config';
import { FormattedTransactionMetadata, TransactionMetadata } from './wallet';

export function generateKey() {
  const privateKey = randomBytes(32);
  if (!isValidPrivate(privateKey))
    throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid)');
  return privateKey;
}

export function formatTxMetaForRpcResult(txMeta: TransactionMetadata) {
  const { r, s, v, hash, txReceipt, txParams } = txMeta;
  const { to, data, nonce, gas, from, value, gasPrice, accessList, maxFeePerGas, maxPriorityFeePerGas } = txParams;

  const formattedTxMeta = {
    v,
    r,
    s,
    to,
    gas,
    from,
    hash,
    nonce,
    input: data || '0x',
    value: value || '0x0',
    accessList: accessList || null,
    blockHash: txReceipt?.blockHash || null,
    blockNumber: txReceipt?.blockNumber || null,
    transactionIndex: txReceipt?.transactionIndex || null,
  } as FormattedTransactionMetadata;

  if (maxFeePerGas && maxPriorityFeePerGas) {
    formattedTxMeta.gasPrice = maxFeePerGas;
    formattedTxMeta.maxFeePerGas = maxFeePerGas;
    formattedTxMeta.maxPriorityFeePerGas = maxPriorityFeePerGas;
    formattedTxMeta.type = TRANSACTION_ENVELOPE_TYPES.FEE_MARKET;
  } else {
    formattedTxMeta.gasPrice = gasPrice;
    formattedTxMeta.type = TRANSACTION_ENVELOPE_TYPES.LEGACY;
  }

  return formattedTxMeta;
}
