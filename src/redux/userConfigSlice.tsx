import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageType, LS, THEME_MODE } from 'src/configs/constance';

export interface themeInitialState {
  theme: {
    mode: THEME_MODE;
    label: string;
  };
  language: LanguageType;
}

const initialThemeMode = localStorage.getItem(LS.THEME);
const initialLanguage = localStorage.getItem(LS.LANGUAGE);

const initialState: themeInitialState = {
  theme: {
    mode: (initialThemeMode == null ? 'dark' : initialThemeMode) as THEME_MODE,
    label: initialThemeMode == null || initialThemeMode == 'dark' ? 'themeMode.dark' : 'themeMode.light',
  },
  language: (initialLanguage == null ? 'en' : initialLanguage) as LanguageType,
};

const userConfigSlice = createSlice({
  name: 'userConfigSlice',
  initialState: initialState,
  reducers: {
    toggleMode: (state: themeInitialState) => {
      const themeMode = state.theme.mode === 'dark' ? 'light' : 'dark';
      const themeLabel = themeMode === 'dark' ? 'themeMode.dark' : 'themeMode.light';
      state.theme = { mode: themeMode, label: themeLabel };
      localStorage.setItem(LS.THEME, themeMode);
    },
    setLanguage: (state: themeInitialState, actions: PayloadAction<LanguageType>) => {
      state.language = actions.payload;
      localStorage.setItem(LS.LANGUAGE, actions.payload);
    },
  },
});

export default userConfigSlice.reducer;
export const { toggleMode, setLanguage } = userConfigSlice.actions;
