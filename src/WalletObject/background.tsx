import { ActionController } from './wallet-controller/action-controller';

let actionController: ActionController | null = null;

export function setActionController() {
  actionController = new ActionController();
  return actionController;
}

export { actionController };
