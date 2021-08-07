import { createSlice } from "@reduxjs/toolkit";
import { LANG } from "../../assets/config/constant";
import { GetItem, SetItem } from "../../utils";
import i18next from "i18next";

const initialState = { language: "vi" };

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    initSetting(state, action) {
      const lang = GetItem(LANG);
      state.language = lang ? lang : "vi";
    },
    changeSetting(state, action) {
      if (action.payload.language) {
        SetItem(action.payload.language);
        i18next.changeLanguage(action.payload.language);
      }
      state.language = action.payload;
    },
  },
});

export const { initSetting, changeSetting } = settingSlice.actions;

export default settingSlice.reducer;
