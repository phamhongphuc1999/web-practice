import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WALLET_LS } from 'src/configs/constance';
import { MyWalletStatus } from 'src/global';

export interface myWalletInitialState {
  status: MyWalletStatus;
  password?: string;
}

const initialStatus = localStorage.getItem(WALLET_LS.STATUS);
const initialPassword = localStorage.getItem(WALLET_LS.PASSWORD);

const initialState: myWalletInitialState = {
  status: (initialStatus == null ? 'init' : initialStatus) as MyWalletStatus,
  password: initialPassword ?? undefined,
};

const myWalletSlice = createSlice({
  name: 'myWalletSlice',
  initialState: initialState,
  reducers: {
    updateStatus: (state: myWalletInitialState, action: PayloadAction<MyWalletStatus>) => {
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
