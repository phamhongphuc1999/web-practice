import { CHANGE_SETTING, INIT_SETTING, LANG } from "../../../config/constant"
import { GetItem, SetItem } from "../../../utils"

const settingReducer = (state = { 'language': 'vi' }, action) => {
  switch (action.type) {
    case INIT_SETTING:
      const lang = GetItem(LANG)
      return { ...state, language: lang ? lang : 'vi' }
    case CHANGE_SETTING:
      if (action.language) SetItem(action.language)
      return { ...state, action }
    default:
      return state
  }
}

export default settingReducer
