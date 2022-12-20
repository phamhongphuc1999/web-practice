import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MY_WALLET_STATUS, WALLET_LS } from 'src/configs/constance';

export interface myWalletInitialState {
  status: MY_WALLET_STATUS;
}

const initialStatus = localStorage.getItem(WALLET_LS.STATUS);

const initialState: myWalletInitialState = {
  status: (initialStatus == null ? 'init' : initialStatus) as MY_WALLET_STATUS,
};

const myWalletSlice = createSlice({
  name: 'myWalletSlice',
  initialState: initialState,
  reducers: {
    updateStatus: (state: myWalletInitialState, action: PayloadAction<MY_WALLET_STATUS>) => {
      const _status = action.payload;
      state.status = _status;
      localStorage.setItem(WALLET_LS.STATUS, _status);
    },
  },
});

export default myWalletSlice.reducer;
export const { updateStatus } = myWalletSlice.actions;
