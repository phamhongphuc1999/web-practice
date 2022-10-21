import { configureStore } from '@reduxjs/toolkit';
import userConfigSlice, { themeInitialState } from './userConfigSlice';

const store = configureStore({
  reducer: {
    userConfigSlice,
  },
});
export type RootState = {
  userConfigSlice: themeInitialState;
};

export default store;
