import { configureStore } from '@reduxjs/toolkit';
import userConfigSlice from './userConfigSlice';
import walletSlice from './walletSlice';
import myWalletSlice from './my-wallet/myWalletSlice';
import myWalletStateSlice from './my-wallet/myWalletStateSlice';

const store = configureStore({
  reducer: { userConfigSlice, walletSlice, myWalletSlice, myWalletStateSlice },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
