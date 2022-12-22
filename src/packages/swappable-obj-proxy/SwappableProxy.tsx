import { SafeEventEmitterProvider } from 'eth-json-rpc-middleware';

export class SwappableProxy {
  target: SafeEventEmitterProvider;
  // proxy: typeof Proxy;

  constructor(initialTarget: SafeEventEmitterProvider) {
    this.target = initialTarget;
    // this.proxy = new Proxy({}, {});
  }
}
