import { configureStore } from '@reduxjs/toolkit';
import userConfigSlice from './userConfigSlice';
import walletSlice from './walletSlice';

const store = configureStore({ reducer: { userConfig: userConfigSlice, wallet: walletSlice } });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
