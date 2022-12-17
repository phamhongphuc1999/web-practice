import { useAppSelector } from 'src/redux/hook';
import en from 'src/locale/en.json';
import vi from 'src/locale/vi.json';

interface LocaleType {
  [local: string]: {
    [key: string]: string | LocaleType;
  };
}

const _locale = { en, vi } as LocaleType;

export default function useTranslate() {
  const { language } = useAppSelector((state) => state.userConfigSlice);

  function translate(key: string) {
    const result = _locale[language][key] as string;
    return result;
  }
  return { t: translate };
}
