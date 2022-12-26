import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyWalletChain } from 'src/configs/wallet-network-config';

export interface myWalletStateInitialState {
  currentNetwork: MyWalletChain | undefined;
}

const initialState: myWalletStateInitialState = {
  currentNetwork: undefined,
};

const myWalletStateSlice = createSlice({
  name: 'myWalletStateSlice',
  initialState: initialState,
  reducers: {
    updateCurrentNetwork: (state: myWalletStateInitialState, action: PayloadAction<MyWalletChain>) => {
      state.currentNetwork = action.payload;
    },
  },
});

export default myWalletStateSlice.reducer;
export const { updateCurrentNetwork } = myWalletStateSlice.actions;
