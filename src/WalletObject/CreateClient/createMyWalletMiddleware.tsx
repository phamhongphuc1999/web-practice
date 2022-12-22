import { createWalletMiddleware } from 'eth-json-rpc-middleware';
import { createScaffoldMiddleware, JsonRpcMiddleware, mergeMiddleware } from 'json-rpc-engine';
import { MiddlewareParam } from '../wallet';
import { createPendingNonceMiddleware, createPendingTxMiddleware } from './pending';

export default function createMyWalletMiddleware(params: MiddlewareParam) {
  const scaffoldMiddleware = createScaffoldMiddleware({
    eth_syncing: false,
    web3_clientVersion: `MetaMask/v${params.version}`,
  });
  const walletMiddleware = createWalletMiddleware({
    getAccounts: params.getAccounts,
    processTransaction: params.processTransaction,
    processEthSignMessage: params.processEthSignMessage,
    processTypedMessage: params.processTypedMessage,
    processTypedMessageV3: params.processTypedMessageV3,
    processTypedMessageV4: params.processTypedMessageV4,
    processPersonalMessage: params.processPersonalMessage,
    processDecryptMessage: params.processDecryptMessage,
    processEncryptionPublicKey: params.processEncryptionPublicKey,
  }) as JsonRpcMiddleware<unknown, unknown>;
  const myWalletMiddleware = mergeMiddleware([
    scaffoldMiddleware,
    walletMiddleware,
    createPendingNonceMiddleware(params.getPendingNonce),
    createPendingTxMiddleware(params.getPendingTransactionByHash),
  ]);
  return myWalletMiddleware;
}
