import { useMemo } from 'react';
import { ActionOptionType } from './wallet';
import ActionController from './wallet-controller/action-controller';
import StorageController from './wallet-controller/storage-controller';

let actionController: ActionController | null = null;

function getActionInitialData() {
  const chainId = StorageController.getChainId();
  return {
    initState: { networkController: { currentNetwork: chainId } },
  } as ActionOptionType;
}

export function setActionController() {
  const initialState = getActionInitialData();
  actionController = new ActionController(initialState);
  return actionController;
}

export function useActionController() {
  return useMemo(() => {
    return actionController;
  }, [actionController]);
}

export { actionController };
