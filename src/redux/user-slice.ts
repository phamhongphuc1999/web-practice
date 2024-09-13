import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserSliceType {
  accountAddress: string;
}

const initialState: UserSliceType = {
  accountAddress: '',
};

const walletSlice = createSlice({
  name: 'walletSlice',
  initialState: initialState,
  reducers: {
    updateAccountConfig: (state: UserSliceType, actions: PayloadAction<Partial<UserSliceType>>) => {
      const { accountAddress } = actions.payload;
      if (accountAddress != undefined) state.accountAddress = accountAddress.toLowerCase();
    },
    resetUser: (state: UserSliceType) => {
      state.accountAddress = '';
    },
  },
});

export default walletSlice.reducer;
export const { updateAccountConfig, resetUser } = walletSlice.actions;
