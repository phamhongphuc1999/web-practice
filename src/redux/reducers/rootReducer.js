import { combineReducers } from "redux"
import setting from './setting/index'

const rootReducer = combineReducers({
  setting: setting,
})

export default rootReducer
