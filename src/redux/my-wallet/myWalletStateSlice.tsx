import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TokenBalance from 'src/blockchain-interaction/token-information/TokenBalance';
import { MyWalletChain } from 'src/configs/wallet-network-config';
import { EthToken } from 'src/global';
import { AppDispatch, RootState } from '../store';

export type WalletStateStatus = 'init' | 'fetching' | 'done';

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
  status: WalletStateStatus;
}

const initialState: myWalletStateInitialState = {
  currentNetwork: undefined,
  account: {
    accounts: [],
    selectedAccount: '',
  },
  tokens: [],
  status: 'init',
};

export function updateTokens(tokenList: EthToken[]) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { account, currentNetwork } = getState().myWalletStateSlice;
    const { accounts, selectedAccount } = account;
    if (currentNetwork && accounts.length > 0) {
      const result: TokenState[] = [];
      for (const _token of tokenList) {
        const data = await TokenBalance.getBalanceAndPrice(
          selectedAccount,
          _token.address,
          _token.symbol,
          currentNetwork.provider.rpcUrl
        );
        if (data) result.push({ baseData: _token, balance: { raw: data.balance.bigNumber.toString(), usd: data.usd } });
        else result.push({ baseData: _token, balance: { raw: '0', usd: '0' } });
      }
      dispatch(myWalletStateSlice.actions.updateTokensSuccess(result));
    }
  };
}

const myWalletStateSlice = createSlice({
  name: 'myWalletStateSlice',
  initialState: initialState,
  reducers: {
    updateWalletStatus: (state: myWalletStateInitialState, action: PayloadAction<WalletStateStatus>) => {
      state.status = action.payload;
    },
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
export const { updateWalletStatus, updateCurrentNetwork, updateAccounts } = myWalletStateSlice.actions;
