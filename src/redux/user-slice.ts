import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LS } from 'src/configs/constance';
import { LanguageType, ThemeMode } from 'src/global';

export interface UserConfigType {
  theme: {
    mode: ThemeMode;
    label: string;
  };
  language: LanguageType;
}

const initialThemeMode = localStorage.getItem(LS.THEME);
const initialLanguage = localStorage.getItem(LS.LANGUAGE);

const initialState: UserConfigType = {
  theme: {
    mode: (initialThemeMode == null ? 'dark' : initialThemeMode) as ThemeMode,
    label:
      initialThemeMode == null || initialThemeMode == 'dark' ? 'themeMode.dark' : 'themeMode.light',
  },
  language: (initialLanguage == null ? 'en' : initialLanguage) as LanguageType,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {
    toggleMode: (state: UserConfigType) => {
      const themeMode = state.theme.mode === 'dark' ? 'light' : 'dark';
      const themeLabel = themeMode === 'dark' ? 'themeMode.dark' : 'themeMode.light';
      state.theme = { mode: themeMode, label: themeLabel };
      localStorage.setItem(LS.THEME, themeMode);
    },
    setLanguage: (state: UserConfigType, actions: PayloadAction<LanguageType>) => {
      state.language = actions.payload;
      localStorage.setItem(LS.LANGUAGE, actions.payload);
    },
  },
});

export default userSlice.reducer;
export const { toggleMode, setLanguage } = userSlice.actions;
