import { Fragment } from 'ethers/lib/utils';

export interface EtherFragment extends Fragment {
  stateMutability: string;
}

export interface AnimationComponentProps {
  size: number | string;
  color: string;
}
