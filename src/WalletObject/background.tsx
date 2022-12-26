import { useMemo } from 'react';
import { ActionController } from './wallet-controller/action-controller';

let actionController: ActionController | null = null;

export function setActionController() {
  actionController = new ActionController();
  return actionController;
}

export function useActionController() {
  return useMemo(() => {
    return actionController;
  }, [actionController]);
}

export { actionController };
