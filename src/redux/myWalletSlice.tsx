import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MY_WALLET_STATUS, WALLET_LS } from 'src/configs/constance';

export interface myWalletInitialState {
  status: MY_WALLET_STATUS;
  password?: string;
}

const initialStatus = localStorage.getItem(WALLET_LS.STATUS);
const initialPassword = localStorage.getItem(WALLET_LS.PASSWORD);

const initialState: myWalletInitialState = {
  status: (initialStatus == null ? 'init' : initialStatus) as MY_WALLET_STATUS,
  password: initialPassword ?? undefined,
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
    savePassword: (state: myWalletInitialState, action: PayloadAction<string>) => {
      const _password = action.payload;
      state.password = _password;
      localStorage.setItem(WALLET_LS.PASSWORD, _password);
    },
  },
});

export default myWalletSlice.reducer;
export const { updateStatus, savePassword } = myWalletSlice.actions;
