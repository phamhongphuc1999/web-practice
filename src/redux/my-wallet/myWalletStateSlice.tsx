import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import EthQuery from 'src/blockchain-interaction/eth-query';
import { MyWalletChain } from 'src/configs/wallet-network-config';
import { EthToken } from 'src/global';
import { AppDispatch, RootState } from '../store';

export interface TokenState {
  baseData: EthToken;
  balance: {
    raw: string;
    usd: string;
  };
}

export interface AccountState {
  accounts: string[];
  selectedAccount: string;
}

export interface myWalletStateInitialState {
  currentNetwork: MyWalletChain | undefined;
  account: AccountState;
  tokens: TokenState[];
}

const initialState: myWalletStateInitialState = {
  currentNetwork: undefined,
  account: {
    accounts: [],
    selectedAccount: '',
  },
  tokens: [],
};

export function updateTokens(tokenList: EthToken[]) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { account, currentNetwork } = getState().myWalletStateSlice;
    const { accounts, selectedAccount } = account;
    if (currentNetwork && accounts.length > 0) {
      const ethQuery = new EthQuery(currentNetwork.provider.rpcUrl);
      const result: TokenState[] = [];
      for (const _token of tokenList) {
        if (_token.address.length === 0) {
          const nativeBalance = await ethQuery.getBalance(selectedAccount);
          result.push({ baseData: _token, balance: { raw: nativeBalance ?? '0', usd: '0' } });
        }
      }
      dispatch(myWalletStateSlice.actions.updateTokensSuccess(result));
    }
  };
}

const myWalletStateSlice = createSlice({
  name: 'myWalletStateSlice',
  initialState: initialState,
  reducers: {
    updateCurrentNetwork: (state: myWalletStateInitialState, action: PayloadAction<MyWalletChain>) => {
      state.currentNetwork = action.payload;
    },
    updateAccounts: (state: myWalletStateInitialState, action: PayloadAction<Partial<AccountState>>) => {
      const { accounts, selectedAccount } = action.payload;
      if (accounts && accounts.length > 0) {
        state.account.accounts = accounts;
        if (selectedAccount) {
          if (accounts.includes(selectedAccount)) state.account.selectedAccount = selectedAccount;
          else state.account.selectedAccount = accounts[0];
        } else state.account.selectedAccount = accounts[0];
      } else {
        state.account = { accounts: [], selectedAccount: '' };
      }
    },
    updateTokensSuccess: (state: myWalletStateInitialState, action: PayloadAction<TokenState[]>) => {
      state.tokens = action.payload;
    },
  },
});

export default myWalletStateSlice.reducer;
export const { updateCurrentNetwork, updateAccounts } = myWalletStateSlice.actions;
