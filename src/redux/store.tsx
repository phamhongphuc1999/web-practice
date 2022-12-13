import { configureStore } from '@reduxjs/toolkit';
import userConfigSlice from './userConfigSlice';
import walletSlice from './walletSlice';

const store = configureStore({
  reducer: {
    userConfigSlice,
    walletSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
