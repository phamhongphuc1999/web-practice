/* eslint-disable @typescript-eslint/no-explicit-any */
import { PollingBlockTracker, Provider } from 'eth-block-tracker';
import {
  createBlockCacheMiddleware,
  createBlockRefRewriteMiddleware,
  createBlockTrackerInspectorMiddleware,
  createFetchMiddleware,
  createInflightCacheMiddleware,
  providerFromMiddleware,
} from 'eth-json-rpc-middleware';
import { createAsyncMiddleware, mergeMiddleware, JsonRpcMiddleware } from 'json-rpc-engine';
import { SECOND } from 'src/configs/constance';

function createChainIdMiddleware(chainId: number) {
  return ((req, res, next, end) => {
    if (req.method === 'eth_chainId') {
      res.result = chainId;
      return end();
    }
    return next();
  }) as JsonRpcMiddleware<any, any>;
}

function createEstimateGasDelayTestMiddleware() {
  return createAsyncMiddleware<any, any>(async (req, _, next) => {
    if (req.method === 'eth_estimateGas') {
      await new Promise((resolve) => setTimeout(resolve, SECOND * 2));
    }
    return next();
  });
}

const inTest = process.env.IN_TEST;
const blockTrackerOpts = inTest ? { pollingInterval: SECOND } : {};
const getTestMiddleware = () => {
  return (inTest ? [createEstimateGasDelayTestMiddleware()] : []) as JsonRpcMiddleware<unknown, unknown>[];
};

export default function createJsonRpcClient(rpcUrl: string, chainId: number) {
  const fetchMiddleware = createFetchMiddleware({ rpcUrl }) as JsonRpcMiddleware<unknown, unknown>;
  const blockProvider = providerFromMiddleware(fetchMiddleware);
  const blockTracker = new PollingBlockTracker({ ...blockTrackerOpts, provider: blockProvider as Provider });

  createBlockRefRewriteMiddleware({ blockTracker });
  const networkMiddleware = mergeMiddleware([
    ...getTestMiddleware(),
    createChainIdMiddleware(chainId),
    createBlockRefRewriteMiddleware({ blockTracker }) as JsonRpcMiddleware<unknown, unknown>,
    createBlockCacheMiddleware({ blockTracker }) as JsonRpcMiddleware<unknown, unknown>,
    createInflightCacheMiddleware() as JsonRpcMiddleware<unknown, unknown>,
    createBlockTrackerInspectorMiddleware({ blockTracker }) as JsonRpcMiddleware<unknown, unknown>,
    fetchMiddleware,
  ]);
  return { networkMiddleware, blockTracker };
}
