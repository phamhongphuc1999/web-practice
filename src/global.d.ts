import { BoxProps } from '@mui/material';
import { Fragment } from 'ethers/lib/utils';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

export type LanguageType = 'en' | 'vi';
export type ThemeMode = 'dark' | 'light';

export type enqueueSnackbarFunc = (
  message: SnackbarMessage,
  options?: OptionsObject | undefined
) => SnackbarKey;

export interface EtherFragment extends Fragment {
  stateMutability: string;
}

export interface AnimationComponentProps {
  size?: number | string;
  color?: string;
}

export interface AnimationComponentBoxProps<T = AnimationComponentProps> {
  iconProps?: T;
  props?: BoxProps;
}

export interface NativeToken {
  name: string;
  symbol: string;
  decimals: number;
}

export interface BaseChain {
  name: string;
  isMainnet: boolean;
  translate: string;
  image: string;
  nativeCurrency: NativeToken;
}

export interface Chain extends BaseChain {
  blockExplorerUrls: Array<string>;
  urls: Array<string>;
}

export interface ChainType {
  [chain: string]: Chain;
}
