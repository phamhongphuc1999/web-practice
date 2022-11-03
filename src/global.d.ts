import { Fragment } from 'ethers/lib/utils';

export interface EtherFragment extends Fragment {
  stateMutability: string;
}
