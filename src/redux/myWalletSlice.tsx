import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MY_WALLET_STATUS } from 'src/configs/constance';

export interface myWalletInitialState {
  status: MY_WALLET_STATUS;
}

const initialState: myWalletInitialState = {
  status: 'init',
};

const myWalletSlice = createSlice({
  name: 'myWalletSlice',
  initialState: initialState,
  reducers: {
    updateStatus: (state: myWalletInitialState, action: PayloadAction<MY_WALLET_STATUS>) => {
      const _status = action.payload;
      state.status = _status;
    },
  },
});

export default myWalletSlice.reducer;
export const { updateStatus } = myWalletSlice.actions;
