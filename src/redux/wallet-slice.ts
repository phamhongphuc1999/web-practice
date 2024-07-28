import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hexlify } from 'ethers/lib/utils';
import { CHAINS } from 'src/configs/networkConfig';
import { Chain } from 'src/global';

export interface WalletSliceType {
  chainId: string;
  hexChainId: string;
  accountAddress: string;
  chainData?: Chain;
}

const initialState: WalletSliceType = {
  chainId: '',
  hexChainId: '',
  accountAddress: '',
};

const walletSlice = createSlice({
  name: 'walletSlice',
  initialState: initialState,
  reducers: {
    updateWallet: (
      state: WalletSliceType,
      action: PayloadAction<{ chainId?: string; accountAddress?: string }>
    ) => {
      const payload = action.payload;
      if (payload.chainId) {
        const _chainId = payload.chainId;
        state.chainId = _chainId;
        state.hexChainId = hexlify(Number(_chainId));
        const _chain = CHAINS[Number(_chainId)];
        if (_chain) state.chainData = _chain;
      }
      if (payload.accountAddress) state.accountAddress = payload.accountAddress;
    },
    resetWallet: (state: WalletSliceType) => {
      Object.assign(state, initialState);
    },
  },
});

export default walletSlice.reducer;
export const { updateWallet, resetWallet } = walletSlice.actions;
