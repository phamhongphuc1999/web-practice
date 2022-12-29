### Blockchain interaction

This package base on some libraries: [eth-json-rpc-middleware](https://github.com/MetaMask/eth-json-rpc-middleware), [json-rpc-engine](https://github.com/MetaMask/json-rpc-engine)

### Structure

| File                                             | Description                                    |
| :----------------------------------------------- | :--------------------------------------------- |
| [eth-query](./eth-query.tsx)                     | Send RPC requests                              |
| [json-rpc-engine](./json-rpc-engine.tsx)         | Manage middleware and connection to RPC server |
| [json-rpc-middleware](./json-rpc-middleware.tsx) | Static class used for handle middleware        |
| [contract-handler](./contract-handler/)          | Handle contract flow                           |
| [eth-rpc-errors](./eth-rpc-errors/)              | Defined ether error                            |
