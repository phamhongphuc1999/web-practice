import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import configSlice from './config-slice';
import userSlice from './user-slice';

const store = configureStore({ reducer: { config: configSlice, user: userSlice } });

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
