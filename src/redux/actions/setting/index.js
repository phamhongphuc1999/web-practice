import { CHANGE_SETTING, INIT_SETTING } from "../../../config/constant"

export const initSetting = () => {
  return dispatch => dispatch({ type: INIT_SETTING })
}

export const changeSetting = (action) => {
  return dispatch => dispatch({ type: CHANGE_SETTING, action })
}
