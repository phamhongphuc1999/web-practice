import { createSlice } from '@reduxjs/toolkit';
import { LS, THEME_MODE } from 'src/configs/constances';

export interface themeInitialState {
  theme: {
    mode: THEME_MODE;
    label: string;
  };
}

const initialThemeMode = localStorage.getItem(LS.THEME);

const initialState: themeInitialState = {
  theme: {
    mode: (initialThemeMode == null ? 'dark' : initialThemeMode) as THEME_MODE,
    label: initialThemeMode == null ? 'Dark mode' : 'Light mode',
  },
};

const userConfigSlice = createSlice({
  name: 'userConfigSlice',
  initialState: initialState,
  reducers: {
    toggleMode: (state: themeInitialState) => {
      const themeMode = state.theme.mode === 'dark' ? 'light' : 'dark';
      const themeLabel = themeMode === 'dark' ? 'Dark mode' : 'Light mode';
      state.theme = { mode: themeMode, label: themeLabel };
      localStorage.setItem(LS.THEME, themeMode);
    },
  },
});

export default userConfigSlice.reducer;
export const { toggleMode } = userConfigSlice.actions;
