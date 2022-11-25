import { BoxProps } from '@mui/material';
import { Fragment } from 'ethers/lib/utils';

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
