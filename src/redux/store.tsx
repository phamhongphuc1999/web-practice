import { configureStore } from '@reduxjs/toolkit';
import userConfigSlice, { themeInitialState } from './userConfigSlice';
import walletSlice, { walletInitialState } from './walletSlice';

const store = configureStore({
  reducer: {
    userConfigSlice,
    walletSlice,
  },
});
export type RootState = {
  userConfigSlice: themeInitialState;
  walletSlice: walletInitialState;
};

export default store;
