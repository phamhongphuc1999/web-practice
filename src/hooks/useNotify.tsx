import { OptionsObject, useSnackbar } from 'notistack';

export const ERR_TOP_CENTER = {
  variant: 'error',
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
} as OptionsObject;
export const WARNING_TOP_CENTER = {
  variant: 'warning',
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
} as OptionsObject;
export const INFO_TOP_CENTER = {
  variant: 'info',
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
} as OptionsObject;
export const SUCCESS_TOP_CENTER = {
  variant: 'success',
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
} as OptionsObject;

export default function useNotify() {
  const { enqueueSnackbar } = useSnackbar();

  function errorNotify(message: string) {
    enqueueSnackbar(message, ERR_TOP_CENTER);
  }

  function successNotify(message: string) {
    enqueueSnackbar(message, SUCCESS_TOP_CENTER);
  }

  function infoNotify(message: string) {
    enqueueSnackbar(message, INFO_TOP_CENTER);
  }

  function warnNotify(message: string) {
    enqueueSnackbar(message, WARNING_TOP_CENTER);
  }

  return { errorNotify, successNotify, infoNotify, warnNotify };
}
