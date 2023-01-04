import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TokenBalance from 'src/blockchain-interaction/token-balance';
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
      const result: TokenState[] = [];
      for (const _token of tokenList) {
        const _balance = await TokenBalance.getBalance(selectedAccount, _token.address, currentNetwork.provider.rpcUrl);
        if (_balance) result.push({ baseData: _token, balance: { raw: _balance.bigNumber.toString(), usd: '0' } });
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
