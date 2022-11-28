import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface walletInitialState {
  chainId: string;
  accountAddress: string;
}

const initialState: walletInitialState = {
  chainId: '',
  accountAddress: '',
};

const walletSlice = createSlice({
  name: 'walletSlice',
  initialState: initialState,
  reducers: {
    updateWallet: (state: walletInitialState, action: PayloadAction<{ chainId?: string; accountAddress?: string }>) => {
      const payload = action.payload;
      if (payload.chainId) state.chainId = payload.chainId;
      if (payload.accountAddress) state.accountAddress = payload.accountAddress;
    },
    resetWallet: (state: walletInitialState) => {
      Object.assign(state, initialState);
    },
  },
});

export default walletSlice.reducer;
export const { updateWallet, resetWallet } = walletSlice.actions;
