import { LanguageType } from 'src/global';
import en from 'src/locale/en.json';
import vi from 'src/locale/vi.json';
import { useAppSelector } from 'src/redux/hook';

interface Params {
  [param: string]: string;
}

interface Item {
  [item: string]: string;
}

interface LocaleType {
  [local: string]: {
    [key: string]: string | Item;
  };
}

const _locale = { en, vi } as LocaleType;

function replace(text: string, params?: Params) {
  if (params) {
    const paramArray = Object.entries(params);
    let result = text;
    for (const _param of paramArray) {
      result = result.replace(`%{${_param[0]}}`, _param[1]);
    }
    return result;
  }
  return text;
}

export function translate(language: LanguageType, key: string, params?: Params) {
  let keys = key.split('.');
  let result = _locale[language][keys[0]];
  keys = keys.slice(1);
  for (const _key of keys) {
    const _check = result instanceof String || typeof result === 'string';
    if (!_check) result = (result as Item)[_key];
    else return key;
  }
  if (result instanceof String || typeof result === 'string')
    return replace(result.toString(), params);
  else return key;
}

export default function useTranslate() {
  const { language } = useAppSelector((state) => state.userConfig);
  function _translate(key: string, params?: Params) {
    return translate(language, key, params);
  }
  return { t: _translate };
}
