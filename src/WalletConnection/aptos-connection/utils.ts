/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AccountAddressInput,
  Aptos,
  InputEntryFunctionData,
  InputViewFunctionData,
  MoveValue,
} from '@aptos-labs/ts-sdk';
import { InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { AptosMoveIdType, AptosRunDataType, AptosViewDataType } from 'src/global';

async function _build(aptos: Aptos, sender: AccountAddressInput, data: InputEntryFunctionData) {
  const transaction = await aptos.transaction.build.simple({ sender, data });
  return transaction;
}

// async function _simulate(
//   aptos: Aptos,
//   publicKey: Ed25519PublicKey,
//   transaction: SimpleTransaction
// ) {
//   const response = await aptos.transaction.simulate.simple({
//     signerPublicKey: publicKey,
//     transaction,
//   });
//   return response;
// }

export async function accountResource<T = unknown>(
  aptos: Aptos,
  accountAddress: string,
  data: AptosMoveIdType
) {
  try {
    const { packageName, module, functionName } = data;
    const result = (await aptos.getAccountResource({
      accountAddress,
      resourceType: `${packageName}::${module}::${functionName}`,
    })) as T;
    return result;
  } catch (error) {
    console.error('accountResource', error);
    return undefined;
  }
}

export async function contractView<T = Array<MoveValue>>(aptos: Aptos, payload: AptosViewDataType) {
  try {
    const { packageName, module, functionName } = payload;
    const realPayload: InputViewFunctionData = {
      ...payload,
      function: `${packageName}::${module}::${functionName}`,
    };
    return (await aptos.view({ payload: realPayload })) as T;
  } catch {
    return undefined;
  }
}

export async function contractRun(
  aptos: Aptos,
  payload: AptosRunDataType,
  sender: string,
  signAndSubmitTransaction: (transaction: InputTransactionData) => Promise<any>
) {
  try {
    const { packageName, module, functionName } = payload;
    const realPayload: InputEntryFunctionData = {
      ...payload,
      function: `${packageName}::${module}::${functionName}`,
    };
    _build(aptos, sender, realPayload);
    const pendingTransaction = await signAndSubmitTransaction({ data: realPayload });
    const response = await aptos.waitForTransaction({
      transactionHash: pendingTransaction.hash,
    });
    return response;
  } catch {
    return undefined;
  }
}
