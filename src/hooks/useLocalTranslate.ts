import { LocaleType, useTranslate } from '@peter-present/react-hook-utils';
import en from 'src/locale/en.json';
import vi from 'src/locale/vi.json';
import { useAppSelector } from 'src/redux/store';

const _locale = { en, vi } as LocaleType;

export default function useLocalTranslate() {
  const { language } = useAppSelector((state) => state.config);
  const { t } = useTranslate(_locale, language);

  return { t };
}
