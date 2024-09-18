import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LS } from 'src/configs/constance';
import { AllowedNetwork } from 'src/configs/network-config';
import { ConnectorType, LanguageType, ThemeMode } from 'src/global';
import LocalStorage from 'src/services';

export interface ConfigSliceType {
  themeMode: ThemeMode;
  themeLabel: string;
  chainId: number;
  connector: ConnectorType | null;
  language: LanguageType;
}

const initialState: ConfigSliceType = {
  themeMode: 'dark',
  themeLabel: 'themeMode.dark',
  chainId: -1,
  connector: null,
  language: 'en',
};

const userSlice = createSlice({
  name: 'configSlice',
  initialState: initialState,
  reducers: {
    initLocalStorage: (
      state: ConfigSliceType,
      actions: PayloadAction<Partial<{ themeMode: ThemeMode; language: LanguageType }>>
    ) => {
      const { themeMode, language } = actions.payload;
      if (themeMode) state.themeMode = themeMode;
      state.themeLabel = `themeMode.${themeMode}`;
      if (language) state.language = language;
      document.documentElement.setAttribute('data-theme', state.themeMode);
    },
    switchTheme: (
      state: ConfigSliceType,
      actions: PayloadAction<{ themeMode: ThemeMode } | undefined>
    ) => {
      if (actions.payload) {
        const { themeMode } = actions.payload;
        state.themeMode = themeMode;
        LocalStorage.set(LS.THEME, themeMode);
      } else {
        const newTheme = state.themeMode == 'light' ? 'dark' : 'light';
        state.themeMode = newTheme;
        LocalStorage.set(LS.THEME, newTheme);
      }
      state.themeLabel = `themeMode.${state.themeMode}`;
      document.documentElement.setAttribute('data-theme', state.themeMode);
    },
    setLanguage: (state: ConfigSliceType, actions: PayloadAction<LanguageType>) => {
      state.language = actions.payload;
      localStorage.setItem(LS.LANGUAGE, actions.payload);
    },
    setNetworkConfig: (
      state: ConfigSliceType,
      actions: PayloadAction<{ chainId: number; connector?: ConnectorType }>
    ) => {
      const { chainId, connector } = actions.payload;
      if (AllowedNetwork.includes(chainId)) state.chainId = chainId;
      if (connector) state.connector = connector;
    },
    resetConfig: (state: ConfigSliceType) => {
      state.chainId = -1;
      state.connector = null;
    },
  },
});

export default userSlice.reducer;
export const { initLocalStorage, switchTheme, setLanguage, setNetworkConfig, resetConfig } =
  userSlice.actions;
