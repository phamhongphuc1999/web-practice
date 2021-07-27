import { createSlice } from "@reduxjs/toolkit"
import { GetItem, SetItem } from "../../utils"
import { LANG } from '../../config/constant'

const initialState = { 'language': 'vi' }

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    initSetting(state, action) {
      const lang = GetItem(LANG)
      state.language = lang ? lang : 'vi'
    },
    changeSetting(state, action) {
      if (action.language) SetItem(action.language)
      state.language = action.language
    }
  }
})

export const { initSetting, changeSetting } = settingSlice.actions

export default settingSlice.reducer