import { combineReducers } from "redux"
import setting from './slices/SettingSlice'

const rootReducer = combineReducers({
  setting: setting
})

export default rootReducer
