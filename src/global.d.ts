import { BoxProps } from '@mui/material';
import { Fragment } from 'ethers/lib/utils';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

export type enqueueSnackbarFunc = (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey;

export interface EtherFragment extends Fragment {
  stateMutability: string;
}

export interface AnimationComponentProps {
  size: number | string;
  color: string;
}

export interface AnimationComponentBoxProps {
  iconProps?: AnimationComponentProps;
  props?: BoxProps;
}

export interface NativeToken {
  name: string;
  symbol: string;
  decimals: number;
}

export interface Chain {
  name: string;
  image: string;
  blockExplorerUrls: Array<string>;
  nativeCurrency: NativeToken;
  urls: Array<string>;
}

export interface ChainType {
  [chain: number]: Chain;
}
