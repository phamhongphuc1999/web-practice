import { configureStore } from '@reduxjs/toolkit';
import userConfigSlice from './userConfigSlice';
import walletSlice from './walletSlice';
import myWalletSlice from './myWalletSlice';

const store = configureStore({
  reducer: {
    userConfigSlice,
    walletSlice,
    myWalletSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
