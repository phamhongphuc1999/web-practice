import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import EthQuery from 'src/blockchain-interaction/eth-query';
import { MyWalletChain } from 'src/configs/wallet-network-config';
import { EthToken } from 'src/global';

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

async function _updateTokens(state: myWalletStateInitialState, action: PayloadAction<EthToken[]>) {
  const { accounts, selectedAccount } = state.account;
  if (state.currentNetwork && accounts.length > 0) {
    const ethQuery = new EthQuery(state.currentNetwork?.provider.rpcUrl);
    const tokenList = action.payload;
    const result: TokenState[] = [];
    for (const _token of tokenList) {
      if (_token.address.length === 0) {
        const nativeBalance = await ethQuery.getBalance(selectedAccount);
        result.push({ baseData: _token, balance: { raw: nativeBalance ?? '0', usd: '0' } });
      }
    }
    state.tokens = result;
  }
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
    updateTokens: (state: myWalletStateInitialState, action: PayloadAction<EthToken[]>) => {
      _updateTokens(state, action);
    },
  },
});

export default myWalletStateSlice.reducer;
export const { updateCurrentNetwork, updateAccounts, updateTokens } = myWalletStateSlice.actions;
